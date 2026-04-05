# Feedback Report Generator

A React + Vite application that converts raw CSV feedback data into professional, downloadable PDF reports. Fill in the report details, upload a CSV, confirm how each column should be treated, then download a vector PDF â€” no print dialog, no page reload.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Usage Walkthrough](#usage-walkthrough)
- [CSV Format](#csv-format)
- [Settings Panel](#settings-panel)
- [Configuration Files](#configuration-files)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)

---

## Features

| Feature | Details |
|---|---|
| **Step-by-step workflow** | Form â†’ CSV preview & column mapping â†’ chart generation â†’ PDF download |
| **Smart column detection** | Auto-detects pie-chart columns vs. comment columns by keyword and value diversity |
| **Interactive column mapping** | Override any auto-detected assignment; edit feedback vocabulary per column |
| **Multi-faculty support** | Add multiple faculty names to a single report |
| **NLP comment analysis** | Expandable sentiment analysis (AFINN + compromise NLP) per comment column |
| **Semantic chart colours** | Each feedback label (Excellent, Good, Averageâ€¦) always maps to the same colour |
| **Real PDF generation** | `@react-pdf/renderer` â€” vector text, selectable, no browser print dialog |
| **Inline PDF preview** | Preview the PDF in-page before downloading |
| **Runtime settings** | Edit faculty, module, coordinator, and course lists without touching source code |
| **Persistent configuration** | All settings saved to `localStorage`; survive page refresh |
| **Export / Import config** | Back up and restore settings as a JSON file |

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Any modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
git clone <repository-url>
cd pie-generator-app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Usage Walkthrough

### Step 1 â€” Fill the report form

Complete all required fields before uploading a file:

| Field | Required | Notes |
|---|---|---|
| Course Name | No | e.g. `PGCP-AC` |
| Module Name | **Yes** | Select from the dropdown |
| Batch | **Yes** | Month + Year |
| Faculty Name | No | Multiple faculty members supported â€” click **+ Add Faculty** |
| Module Coordinator | No | Select from the dropdown |
| CSV File | **Yes** | `.csv` files only |

Click **Upload** to validate the form and parse the CSV.

### Step 2 â€” Review the CSV preview and map columns

A preview panel opens showing the first 10 rows of data and an auto-detected type for every column.

**Detected types:**
- **Pie Chart** â€” column contains a small set of repeating rating values
- **Comment List** â€” column contains free-text entries
- **Ignore** â€” column matched an ignore keyword (Name, ID, Email, â€¦) or had low confidence

For each column you can:
- Change the type using the **Assign As** dropdown
- Click **Edit Vocabulary** (Pie Chart columns) to check/uncheck which values to count, or add new ones
- Click **Edit Noise Filters** (Comment columns) to add/remove strings that should be stripped from the comment list

Click **Confirm & Continue â†’** when done.

### Step 3 â€” Generate charts

Click **Generate Chart**. The app re-parses the CSV using your confirmed column mapping and renders the on-screen preview (pie charts + comment lists).

Each comment column has an expandable **Analysis** card showing:
- Response count, positive count, average AFINN sentiment score, average comment length
- Tone overview bar chart (Positive / Neutral / Negative)
- Per-comment sentiment scatter plot
- Top key phrases (NLP noun extraction)
- Top descriptive terms (adjectives and verbs)

### Step 4 â€” Prepare and download the PDF

1. Click **Prepare PDF** â€” captures each chart as a high-resolution PNG.
2. A **Download PDF** button appears. Click it to save the file.
3. Optionally click **Preview PDF** to view the document inline before saving.

The PDF file is named `feedback_<module>_<month>_<year>.pdf`.

---

## CSV Format

The CSV must have a header row. Column names drive automatic detection.

### Auto-detected as Pie Chart

Header contains any of: `Explanation`, `Pace`, `Interaction`, `Practical`, `Overall`, `Rating`, `Score`, `Quality`

Expected cell values (default vocabulary):

| Category | Values |
|---|---|
| Quality / satisfaction | `Excellent`, `Very Good`, `Good`, `Average`, `Poor` |
| Pace | `Very Fast`, `Fast`, `Normal`, `Slow`, `Very Slow` |

Any other values the CSV contains can be added through the **Edit Vocabulary** panel in Step 2.

### Auto-detected as Comment

Header contains any of: `Theory`, `Lab`, `Comments`, `Remarks`, `Feedback`, `Suggestion`, `Review`

### Auto-ignored

Header contains any of: `Name`, `ID`, `PRN`, `Email`, `Roll`, `Timestamp`

### Minimal example

```csv
Name,Explanation (Theory),Pace of Teaching,Overall Satisfaction,Theory Suggestions
Student A,Excellent,Normal,Very Good,Very well explained
Student B,Good,Fast,Good,Could slow down a bit
Student C,Very Good,Normal,Excellent,Nothing to add
```

---

## Settings Panel

Click the **âš™** gear icon in the top-right of the navbar to open the Settings Panel.

### What you can edit

| Section | What it controls |
|---|---|
| **Course List** | Dropdown options for Course Name |
| **Faculty List** | Dropdown options for Faculty Name (also supports free-text entry) |
| **Module Coordinator List** | Dropdown options for Module Coordinator |
| **Module List** | Module name (full) and its abbreviation shown in the dropdown |
| **Report Settings** | Page size, orientation, charts per row, section order, title template, footer text |

### Title template tokens

The title template supports these tokens, which are replaced at render time:

`{courseName}` `{moduleName}` `{faculty}` `{batchMonth}` `{batchYear}` `{moduleco}`

**Default template:** `{courseName} Module Feedback Report - {moduleName}`

### Export / Import Config

- **Export Config** â€” downloads `pie_generator_config.json` containing all your overrides.
- **Import Config** â€” restores settings from a previously exported JSON file.
- **Reset to Defaults** â€” clears all overrides and reverts to the compiled-in defaults.

Settings are stored in `localStorage` under the key `pie_generator_master` (master data) and `pie_generator_report_config` (report layout).

---

## Configuration Files

These files contain defaults that apply when no `localStorage` overrides exist. Edit them to change the out-of-the-box values.

### `src/config/masterData.jsx`

Default lists for the form dropdowns.

| Export | Type | Purpose |
|---|---|---|
| `courseNameOptions` | `{value, label}[]` | Course name dropdown |
| `moduleCoordinatorName` | `{value, label}[]` | Coordinator dropdown |
| `moduleNameList` | `{value, label}[]` | Module dropdown (label = abbreviation) |
| `facultyNameList` | `{value, label}[]` | Faculty dropdown |

### `src/config/csvConfig.jsx`

Keywords and vocabulary used by the CSV parser and column detector.

| Key | Purpose |
|---|---|
| `chartKeywords` | Header substrings that suggest a Pie Chart column |
| `commentKeywords` | Header substrings that suggest a Comment column |
| `ignoreKeywords` | Header substrings that force a column to be ignored |
| `defaultFeedbackVocabulary` | Rating labels counted when no custom vocabulary is set |
| `commentNoiseFilters` | Strings stripped from comment lists (case-insensitive) |

### `src/config/reportConfig.jsx`

PDF layout defaults.

| Key | Default | Purpose |
|---|---|---|
| `pageSize` | `"A4"` | `"A4"` \| `"LETTER"` \| `"A3"` |
| `pageOrientation` | `"portrait"` | `"portrait"` \| `"landscape"` |
| `titleTemplate` | `"{courseName} Module Feedback Report - {moduleName}"` | Report title |
| `sectionOrder` | `["charts", "comments"]` | Swap to put comments before charts |
| `chartsPerRow` | `2` | Reserved for future layout use |
| `chartColors` | 5-colour palette | Fallback colours for unrecognised feedback labels |
| `footerText` | `"Â© C-DAC Mumbaiâ€¦"` | Footer line on every PDF page |

`feedbackColors` defines the per-label semantic colour map (e.g. `excellent â†’ #43a047`).

### `src/config/themeConfig.jsx`

UI colour values consumed by the navbar and footer.

| Key | Purpose |
|---|---|
| `navbarGradient` | CSS gradient for the sticky navbar background |
| `footerGradient` | CSS gradient for the fixed footer background |
| `footerText` | Copyright line shown in the UI footer |

---
