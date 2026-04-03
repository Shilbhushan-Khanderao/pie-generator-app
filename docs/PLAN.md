# Pie Generator App — Modularization & Customization Plan

> **Reference document for ongoing development.**
> Read this before making structural changes to the project.
> Update relevant sections as decisions are made or designs change.

---

## 1. Goals

| # | Goal |
|---|---|
| G1 | Master data (faculty, coordinators, modules) must be editable without touching source code |
| G2 | CSV structure must not be assumed — the app must detect what it sees and let the user confirm |
| G3 | User must be able to preview parsed data before generating the PDF |
| G4 | User must control which columns become pie charts, which become comment lists, and which to skip |
| G5 | PDF generation must be reliable, layout-correct, and not depend on the browser print dialog |
| G6 | The report layout (title, section order, colors, page size) must be configurable |

---

## 2. Current State — What Is Broken / Inflexible

### 2.1 Hardcoded master data (blocks G1)
All three lists live inline inside **`InputComponent.js`** and cannot be changed at runtime:
- `moduleCoordinatorName` — 10 entries
- `moduleNameList` — 20 entries with abbreviations
- `facultyNameList` — 18 entries

Faculty input uses `CreatableSelect` (allows typing a new name) but that name is never persisted.

### 2.2 Hardcoded CSV column routing (blocks G2, G3, G4)
`processCsvData()` inside **`PDFComponent.js`** classifies columns by fixed keyword matching:

```
Chart columns  → header contains: Explanation | Pace | Interaction | Practical | Overall
Comment columns→ header contains: Theory | Lab | Comments | comments | Remarks
All other columns are silently ignored
```

If a CSV uses different headers (e.g. `"Rating"`, `"Suggestion"`, `"Score"`) the app produces empty output with no error.

### 2.3 Hardcoded feedback vocabulary (blocks G2, G4)
`createChartData()` counts only these exact string values:
```
Good, Very Good, Excellent, Average, Poor,
Slow, Very Slow, Normal, Fast, Very Fast
```
A CSV with numeric ratings (1–5) or different labels (e.g. `Satisfied`) produces zero data.

### 2.4 Destructive PDF mechanism (blocks G5, G6)
```js
document.body.innerHTML = printContents;  // destroys React
window.print();                           // opens OS print dialog
document.body.innerHTML = originalContents; // React is now detached
```
React's virtual DOM is detached after `window.print()`. The app is **non-functional** after one download without a page reload. There is zero control over page size, margins, fonts, or layout.

### 2.5 Known bugs to fix during the refactor

| Bug | Location | Fix |
|---|---|---|
| First comment of every column is silently dropped | `Comments.js` — `index !== 0` guard | Remove the `index !== 0` condition |
| Total feedback count includes the header row | `PDFComponent.js` — `setTotalFeedback(csvData.length)` | Change to `csvData.length - 1` |
| `setTotalFeedback` is called inside a loop (once per chart column) | `createChartData()` | Move it out; call once after parsing |
| `App.test.js` always fails | Tests for text `"learn react"` | Update to match actual rendered content |

---

## 3. Proposed Architecture

### 3.1 New folder structure

```
src/
  config/
    masterData.js         ← faculty, coordinator, module lists (editable JSON-like)
    csvConfig.js          ← default keyword hints, feedback vocabulary, noise filters
    reportConfig.js       ← title template, page size, chartsPerRow, color palette
    themeConfig.js        ← navbar/footer colors, logo path

  utils/
    csvParser.js          ← processCsvData, createChartData, extractComments (pure functions)
    csvDetector.js        ← NEW: auto-detection logic (see §4)
    reportHelpers.js      ← title token substitution, totalCount fix
    persistConfig.js      ← NEW: read/write user config to localStorage (see §6)

  component/
    InputComponent.js     ← slimmed down; reads from masterData.js
    CSVPreviewComponent.js← NEW: preview table + column mapping UI (see §5)
    PDFComponent.js       ← orchestrator only; no parsing logic
    ReportDocument.js     ← NEW: @react-pdf/renderer document tree (see §7)
    PieChartComponent.js  ← unchanged except reads colors from reportConfig
    Comments.js           ← bug fix only
    NavbarComponent.js    ← reads from themeConfig
    FooterComponent.js    ← reads from themeConfig
    SettingsPanel.js      ← NEW: UI for editing masterData at runtime (see §6)
```

### 3.2 Application flow (new)

```
Step 1 — Upload CSV
  User selects CSV file
        │
        ▼
Step 2 — Auto-detect (csvDetector.js)
  Analyse headers + first 10 data rows
  → Propose { column, detectedType, detectedVocabulary }[] for each column
        │
        ▼
Step 3 — Preview & Mapping (CSVPreviewComponent)
  Show raw CSV table (first 10 rows)
  Show per-column type assignment (Pie Chart / Comment List / Ignore)
  Allow user to override any assignment
  Allow user to confirm or edit the feedback vocabulary per chart column
  Allow user to add/remove noise filter strings per comment column
        │
        ▼
Step 4 — Fill form (InputComponent — unchanged UX)
  Module name, batch, faculty, coordinator (now read from masterData.js)
        │
        ▼
Step 5 — Generate PDF (ReportDocument.js via @react-pdf/renderer)
  Build report from confirmed column mapping + form values
  Offer <PDFDownloadLink> — no DOM mutation, no print dialog
```

---

## 4. CSV Auto-Detection Logic (`src/utils/csvDetector.js`)

The detector runs after the file is parsed by PapaParse and produces a **column descriptor** for every column in the CSV.

### 4.1 Detection algorithm per column

```
For each column i in headers:
  1. Collect all non-empty cell values from rows 1..N (skip header row)
  2. Compute uniqueValues = Set(cellValues)
  3. Compute uniqueRatio = uniqueValues.size / totalRows

  4. TYPE DETECTION:
     a. If uniqueValues.size ≤ 10 AND uniqueRatio < 0.4
        → candidate: PIE_CHART
        → detectedVocabulary = [...uniqueValues]

     b. If average string length of cells > 15 OR uniqueRatio > 0.6
        → candidate: COMMENT

     c. If header keyword matches default hint list (csvConfig.js)
        → boost confidence of the keyword-matched type

     d. Everything else → candidate: UNKNOWN (user must decide)

  5. Return ColumnDescriptor:
     {
       index: i,
       header: headers[i],
       detectedType: "PIE_CHART" | "COMMENT" | "UNKNOWN",
       confidence: 0.0–1.0,
       detectedVocabulary: string[],   // only for PIE_CHART
       sampleValues: string[],         // first 5 non-empty values
     }
```

### 4.2 Confidence scoring

| Signal | Score adjustment |
|---|---|
| Header keyword matches `csvConfig.chartKeywords` | +0.4 |
| Header keyword matches `csvConfig.commentKeywords` | +0.4 |
| `uniqueValues.size` ≤ 6 | +0.3 |
| `uniqueValues.size` between 7–10 | +0.1 |
| All cell values are numeric strings only | +0.2 for PIE_CHART |
| `uniqueRatio` > 0.7 | +0.3 for COMMENT |
| Column header contains `"Name"`, `"ID"`, `"Date"`, `"Email"` | → force IGNORE |

Columns with `confidence < 0.5` are marked `UNKNOWN` and shown with a warning in the preview UI.

### 4.3 Default keyword hints (`src/config/csvConfig.js`)

```js
export const csvConfig = {
  chartKeywords: ["Explanation", "Pace", "Interaction", "Practical", "Overall", "Rating", "Score", "Quality"],
  commentKeywords: ["Theory", "Lab", "Comments", "Remarks", "Feedback", "Suggestion", "Review"],
  ignoreKeywords: ["Name", "ID", "Email", "Date", "Roll", "Timestamp"],
  defaultFeedbackVocabulary: [
    "Good", "Very Good", "Excellent", "Average", "Poor",
    "Slow", "Very Slow", "Normal", "Fast", "Very Fast",
  ],
  commentNoiseFilters: [
    "na", "n/a", "no", "ok", "nothing", "no comments",
    ".", "-", "--", "..", "none",
  ],
};
```

These are defaults. User overrides per session (see §6).

---

## 5. CSV Preview & Column Mapping UI (`CSVPreviewComponent.js`)

This component replaces the current "Upload → Generate Chart" blind workflow.

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────┐
│  CSV Preview — feedback_jan2024.csv   (120 rows found)  │
├─────────────────────────────────────────────────────────┤
│  Raw data preview (first 10 rows) — scrollable table    │
├─────────────────────────────────────────────────────────┤
│  Column Mapping                                         │
│  ┌──────────────────────┬──────────────┬──────────────┐ │
│  │ Column Header        │ Detected As  │ Assign As    │ │
│  ├──────────────────────┼──────────────┼──────────────┤ │
│  │ Explanation (Theory) │ ✓ Pie Chart  │ [Pie Chart▼] │ │
│  │ Pace of Teaching     │ ✓ Pie Chart  │ [Pie Chart▼] │ │
│  │ Overall Satisfaction │ ✓ Pie Chart  │ [Pie Chart▼] │ │
│  │ Theory Suggestions   │ ✓ Comment    │ [Comment  ▼] │ │
│  │ Lab Suggestions      │ ✓ Comment    │ [Comment  ▼] │ │
│  │ Student Name         │ ⚠ Unknown    │ [Ignore   ▼] | │
│  └──────────────────────┴──────────────┴──────────────┘ │
│                                                         │
│  [Expand: Edit feedback vocabulary for Pie Chart cols]  │
│  [Expand: Edit noise filters for Comment cols]          │
│                                                         │
│             [ Cancel ]  [ Confirm & Continue → ]        │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Assign As dropdown options

- **Pie Chart** — count unique values, render as pie chart in PDF
- **Comment List** — filter noise, render as bullet list in PDF
- **Ignore** — exclude from output entirely

### 5.3 Feedback vocabulary editor (expandable, per Pie Chart column)

Shows detected unique values for that column. User can:
- Check/uncheck which values to include
- Add a new value (for typos or aliases)
- Map aliases to a canonical label (e.g. `"5"` → `"Excellent"`)

### 5.4 Noise filter editor (expandable, per Comment column)

A tag-input field pre-populated from `csvConfig.commentNoiseFilters`. User can add or remove strings to exclude from the comment list.

### 5.5 State produced by this component

```js
// Passed downstream to PDF generation:
const columnMapping = [
  {
    index: 2,
    header: "Explanation (Theory)",
    type: "PIE_CHART",
    vocabulary: ["Good", "Very Good", "Excellent", "Average", "Poor"],
    aliases: {},
  },
  {
    index: 5,
    header: "Theory Suggestions",
    type: "COMMENT",
    noiseFilters: ["na", "no", "ok", "nothing", "no comments", "."],
  },
  // ...
];
```

---

## 6. Runtime-Editable Master Data & Settings (`SettingsPanel.js`, `persistConfig.js`)

### 6.1 Problem
Faculty names, module names, and coordinator names change semester to semester. Currently requires editing source and rebuilding.

### 6.2 Proposed solution — localStorage persistence

`persistConfig.js` provides:
```js
loadMasterData()   // returns merged: defaults from masterData.js + user overrides from localStorage
saveMasterData(data) // writes user overrides to localStorage key "pie_generator_master"
resetMasterData()  // clears localStorage overrides, falls back to masterData.js defaults
```

### 6.3 Settings Panel

Accessible via a gear icon in the navbar. Allows:

- **Faculty list** — add / remove / rename entries (CreatableSelect already supports ad-hoc entry; this persists it)
- **Module coordinator list** — add / remove entries
- **Module list** — add / remove / edit name + abbreviation pairs
- **Report config** — title template, chartsPerRow (1 or 2), page size (A4 / Letter), color palette picker per chart
- **Reset to defaults** button

Changes are saved to `localStorage` immediately. No rebuild needed.

### 6.4 Export / Import config

`SettingsPanel` shows two buttons:
- **Export config** — downloads a `pie_generator_config.json` file containing all overrides
- **Import config** — uploads a previously exported JSON to restore settings (useful when moving to a new machine or sharing config with colleagues)

---

## 7. PDF Generation Replacement (`ReportDocument.js`)

### 7.1 Library choice — `@react-pdf/renderer`

Replace `window.print()` with [`@react-pdf/renderer`](https://react-pdf.org/).

**Reason for choice over `jsPDF + html2canvas`:**
- Produces vector PDF (text is selectable, not a raster image)
- Full layout control (page size, margins, multi-column, fonts)
- Pure React — no DOM mutation, no React detachment bug
- `<PDFDownloadLink>` renders as a normal anchor tag — no UX quirks

**Trade-off to manage:**
`recharts` renders via SVG in the DOM; `@react-pdf/renderer` cannot embed live React SVG.
Pie chart images must be captured as PNG data URLs before the PDF is built.
Use the `html-to-image` library (`toPng()`) on a hidden off-screen render of each `<PieChartComponent>` to produce base64 PNG images, then embed those via `<Image>` in the PDF document.

### 7.2 Report document structure (`ReportDocument.js`)

```jsx
<Document>
  <Page size={reportConfig.pageSize} orientation={reportConfig.orientation} style={styles.page}>

    {/* Title block */}
    <TitleBlock moduleName faculty batchMonth batchYear moduleco totalCount />

    {/* Sections in user-defined order from reportConfig.sectionOrder */}
    {sectionOrder.includes("charts") && (
      <ChartsSection charts={chartImages} headers={chartHeaders} chartsPerRow={reportConfig.chartsPerRow} />
    )}

    {sectionOrder.includes("comments") && (
      <CommentsSection comments={commentData} headers={commentHeaders} />
    )}

  </Page>
</Document>
```

### 7.3 Configurable options (from `src/config/reportConfig.js`)

```js
export const reportConfig = {
  pageSize: "A4",                          // "A4" | "LETTER" | "A3"
  orientation: "portrait",                 // "portrait" | "landscape"
  titleTemplate: "PG-DAC Module Feedback for {moduleName}",
  sectionOrder: ["charts", "comments"],    // swap to put comments first
  chartsPerRow: 2,                         // 1 or 2
  chartColors: ["#0088FE","#00C49F","#FFBB28","#FF8042","#D733FF"],
  showTotalCount: true,
  footerText: "© C-DAC Mumbai (Education & Training Team)",
  logoPath: "/logo.png",
};
```

Token substitution in `titleTemplate`: `{moduleName}`, `{batchMonth}`, `{batchYear}`, `{faculty}`, `{moduleco}` are all replaced at render time by `reportHelpers.interpolateTitle()`.

---

## 8. Phase Plan

### Phase 1 — Config extraction & bug fixes (low risk, high immediate value)
> No new dependencies required.

- [ ] Create `src/config/masterData.js` — move all 3 lists out of `InputComponent.js`
- [ ] Create `src/config/csvConfig.js` — move keyword arrays and feedback vocabulary
- [ ] Create `src/config/reportConfig.js` — move title string, color palette, page break logic
- [ ] Create `src/config/themeConfig.js` — move gradient colors and logo path
- [ ] Create `src/utils/csvParser.js` — move `processCsvData`, `createChartData`, `extractComments` out of `PDFComponent.js`; fix the `totalFeedback` bugs
- [ ] Fix `Comments.js` — remove the `index !== 0` guard that drops first comment
- [ ] Update `InputComponent.js` to import from `masterData.js` instead of inline arrays
- [ ] Update `PDFComponent.js` to import from `csvParser.js` and `csvConfig.js`

**Acceptance:** App behaves identically, lists can now be edited in one config file.

---

### Phase 2 — CSV auto-detection & preview UI (new feature — no breaking changes)
> No new dependencies required (detection logic is pure JS; preview table is plain JSX + Bootstrap).

- [ ] Create `src/utils/csvDetector.js` — implement detection algorithm (§4)
- [ ] Create `src/component/CSVPreviewComponent.js` — raw table + column mapping UI (§5)
- [ ] Wire: after CSV is uploaded in `InputComponent`, run detector and show `CSVPreviewComponent`
- [ ] `CSVPreviewComponent` emits confirmed `columnMapping[]` state back upward
- [ ] `PDFComponent` (or future `ReportDocument`) consumes `columnMapping[]` instead of running `processCsvData()` directly

**Acceptance:** User can upload any CSV, see the first 10 rows, reassign any column type, edit vocabulary per column, and confirm before generating.

---

### Phase 3 — Runtime settings persistence (new feature)
> No new dependencies required (uses `localStorage`).

- [ ] Create `src/utils/persistConfig.js` — `loadMasterData`, `saveMasterData`, `resetMasterData`
- [ ] Create `src/component/SettingsPanel.js` — faculty/module/coordinator editors + export/import
- [ ] Add gear icon to `NavbarComponent.js` that opens `SettingsPanel`
- [ ] Update `InputComponent.js` to call `loadMasterData()` instead of importing static arrays

**Acceptance:** Additions to faculty/module lists survive page refresh. Export produces valid importable JSON.

---

### Phase 4 — Real PDF generation (breaking change to print flow)
> Requires new dependencies: `@react-pdf/renderer`, `html-to-image`.

- [ ] `npm install @react-pdf/renderer html-to-image`
- [ ] Create `src/component/ReportDocument.js` — full `@react-pdf/renderer` document tree (§7)
- [ ] Create a hidden off-screen chart render area in `PDFComponent.js`; use `html-to-image` `toPng()` to capture each chart as a base64 PNG
- [ ] Replace `printPage()` with `<PDFDownloadLink document={<ReportDocument .../>} fileName="...">Download</PDFDownloadLink>`
- [ ] Remove the `document.body.innerHTML` DOM mutation entirely
- [ ] Wire `reportConfig.js` options through to `ReportDocument.js`

**Acceptance:** Clicking Download generates a PDF file directly with no print dialog, no page reload required, charts render correctly in PDF.

---

### Phase 5 — Report layout customization UI (optional polish)
> Depends on Phase 4.

- [ ] Add report config editor to `SettingsPanel.js` (title template, chartsPerRow, page size, color palette)
- [ ] Persist report config to `localStorage` via `persistConfig.js`
- [ ] Show a live PDF preview pane using `@react-pdf/renderer`'s `<PDFViewer>` component inside the app (optional, heavier bundle)

---

## 9. Dependency Summary

| Package | Phase | Purpose |
|---|---|---|
| *(none new)* | 1, 2, 3 | Config/utils extraction and preview UI are pure React |
| `@react-pdf/renderer` | 4 | Build and download a real PDF document |
| `html-to-image` | 4 | Capture recharts SVG → PNG for embedding in PDF |

Existing dependencies (`recharts`, `papaparse`, `react-select`, `react-bootstrap`, `bootstrap`) remain unchanged.

---

## 10. Decisions & Open Questions

| # | Question | Decision | Date |
|---|---|---|---|
| D1 | Use `@react-pdf/renderer` or `jsPDF`? | `@react-pdf/renderer` — vector output, no DOM hacks | — |
| D2 | Store master data in `localStorage` or in a JSON file editable on the server? | `localStorage` (client-only app, no backend) | — |
| D3 | How many charts per row in PDF? | Configurable via `reportConfig.chartsPerRow` (default: 2) | — |
| D4 | Should numeric CSV ratings (1–5) map to labels automatically? | Add to Phase 2 vocabulary alias mapping in `CSVPreviewComponent` | — |
| D5 | Support multiple faculties (the commented-out `faculty1` code)? | Clean up dead code in Phase 1; re-add proper multi-faculty support in Phase 2 or 3 | — |
| D6 | Should the preview table be paginated for large CSVs? | Show first 10 rows with row count; full data is parsed in memory | — |

---

## 11. Files to NOT change (stable, no refactor needed)

| File | Reason |
|---|---|
| `src/index.js` | Bootstrap import + root render — fine as-is |
| `src/index.css` | Minimal global styles |
| `public/` | Static assets — unchanged |
| `package.json` scripts | CRA build pipeline — unchanged |
| `scripts/` (start/stop/status) | Deployment scripts — unchanged |
