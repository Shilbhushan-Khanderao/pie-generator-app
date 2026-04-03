# Pie Generator App — All Fixes & Changes (Reference Code)

> **This document is read-only reference material.**
> Copy the code blocks below into the correct files. Do not apply changes until each phase is accepted and tested.
> Phases must be applied in order: 1 → 2 → 3 → 4. Each phase builds on the previous.

---

## Phase 1 — Config Extraction & Bug Fixes

### New File: `src/config/masterData.js`

```js
// Extracted from InputComponent.js — all master lists live here now.
// Edit this file to add/remove modules, faculty, or coordinators without touching UI code.

export const moduleCoordinatorName = [
  { value: "Dr. Kiran Waghmare",        label: "Dr. Kiran Waghmare" },
  { value: "Mr. Vipul Tembulwar",       label: "Mr. Vipul Tembulwar" },
  { value: "Ms. Shweta Bhere",          label: "Ms. Shweta Bhere" },
  { value: "Mr. Malkeet Singh",         label: "Mr. Malkeet Singh" },
  { value: "Mr. Aniket Takmare",        label: "Mr. Aniket Takmare" },
  { value: "Mr. Aditya Kansana",        label: "Mr. Aditya Kansana" },
  { value: "Mr. Shilbhushan Khanderao", label: "Mr. Shilbhushan Khanderao" },
  { value: "Mr. Prashant Bhosale",      label: "Mr. Prashant Bhosale" },
  { value: "Mr. Manoj More",            label: "Mr. Manoj More" },
  { value: "Mr. Shivraj Singh",         label: "Mr. Shivraj Singh" },
];

export const moduleNameList = [
  { value: "Logic Building Session",                                    label: "LBS" },
  { value: "Operating Systems",                                          label: "OS" },
  { value: "C++ Programming",                                            label: "CPPP" },
  { value: "Object Oriented Programming with Java",                      label: "OOPJ" },
  { value: "Algorithm & Data Structures",                                label: "ADS" },
  { value: "Database Technologies",                                      label: "DBT" },
  { value: "Web Programming Technologies",                               label: "WPT" },
  { value: "Web Java Programming",                                       label: "WJP" },
  { value: "Microsoft DotNet",                                           label: "DotNet" },
  { value: "Software Development Methodologies",                         label: "SDM" },
  { value: "Aptitude",                                                   label: "Aptitude" },
  { value: "Effective Communication",                                    label: "Communication" },
  { value: "Fundamentals of AI & Mathematics for AI",                    label: "FAI & MAI" },
  { value: "Advanced Programming for AI(Java Programming)",              label: "APAI(Java)" },
  { value: "Advanced Programming for AI(Advanced Programming using Python)", label: "APAI(Python)" },
  { value: "Practical Machine Learning",                                 label: "PML" },
  { value: "Data Analytics",                                             label: "Data Analytics" },
  { value: "Deep Neural Networks",                                       label: "DNN" },
  { value: "Natural Language Processing & Computer Vision",              label: "NLP & CV" },
  { value: "AI Compute Platforms, Applications & Trends",                label: "AI & Trends" },
];

export const facultyNameList = [
  { value: "",                           label: "None" },
  { value: "Dr. Kiran Waghmare",         label: "Dr. Kiran Waghmare" },
  { value: "Mr. Shrinivas Kalewad",      label: "Mr. Shrinivas Kalewad" },
  { value: "Mr. Shivnath Kumar",         label: "Mr. Shivnath Kumar" },
  { value: "Mr. Sandeep Kulange",        label: "Mr. Sandeep Kulange" },
  { value: "Mr. Sameer Dehadrai",        label: "Mr. Sameer Dehadrai" },
  { value: "Mr. Abhishek Purohit",       label: "Mr. Abhishek Purohit" },
  { value: "Mr. Santosh Mondal",         label: "Mr. Santosh Mondal" },
  { value: "Mr. Vikram Sulakhe",         label: "Mr. Vikram Sulakhe" },
  { value: "Mr. Vipul Tembulwar",        label: "Mr. Vipul Tembulwar" },
  { value: "Mr. Mazrul Ansari",          label: "Mr. Mazrul Ansari" },
  { value: "Mr. Malkeet Singh",          label: "Mr. Malkeet Singh" },
  { value: "Mr. Koustav Nandi",          label: "Mr. Koustav Nandi" },
  { value: "Dr. C P Johnson",            label: "Dr. C P Johnson" },
  { value: "Mr. Aditya Kansana",         label: "Mr. Aditya Kansana" },
  { value: "Mr. Shilbhushan Khanderao", label: "Mr. Shilbhushan Khanderao" },
  { value: "Mr. Prakash Pimpale",        label: "Mr. Prakash Pimpale" },
  { value: "Mr. Chetan Ahirrao",         label: "Mr. Chetan Ahirrao" },
];
```

---

### New File: `src/config/csvConfig.js`

```js
// Default keyword hints and feedback vocabulary used by csvParser.js and csvDetector.js.
// Phase 2 allows the user to override vocabulary per column at runtime.

export const csvConfig = {
  chartKeywords: [
    "Explanation", "Pace", "Interaction", "Practical", "Overall",
    "Rating", "Score", "Quality",
  ],
  commentKeywords: [
    "Theory", "Lab", "Comments", "Remarks", "Feedback", "Suggestion", "Review",
  ],
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

---

### New File: `src/config/reportConfig.js`

```js
// Report layout configuration used by PDFComponent and (Phase 4) ReportDocument.
// All values are defaults; Phase 5 adds a settings UI to edit these at runtime.

export const reportConfig = {
  pageSize: "A4",                       // "A4" | "LETTER" | "A3"
  orientation: "portrait",              // "portrait" | "landscape"
  titleTemplate: "PG-DAC Module Feedback for {moduleName}",
  sectionOrder: ["charts", "comments"], // swap to put comments first
  chartsPerRow: 2,                      // 1 or 2 per row in the PDF
  chartColors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D733FF"],
  showTotalCount: true,
  footerText: "© C-DAC Mumbai (Education & Training Team)",
  logoPath: "/logo.png",
};
```

---

### New File: `src/config/themeConfig.js`

```js
// Visual theme values consumed by NavbarComponent and FooterComponent.
// Centralising these here means changing the gradient is a one-line edit.

export const themeConfig = {
  navbarGradient:
    "linear-gradient(180deg, rgba(33,133,218,1) 0%, rgba(255,255,255,1) 100%)",
  footerGradient:
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(33,133,218,1) 100%)",
  logoPath: "./image/logo.png",
  logoWidth: 250,
  logoHeight: 250,
  footerText:
    "© Copyright 2023 - C-DAC Mumbai (Education & Training Team). All rights reserved.",
};
```

---

### New File: `src/utils/csvParser.js`

> **Bugs fixed here (Phase 1):**
> - `totalFeedback` now uses `csvData.length - 1` (excludes header row).
> - `setTotalFeedback` is no longer called inside a per-column loop — it is returned as a value.
> - `createChartData` now starts iteration from row index `1` to skip the header row.
> - Comment extraction now uses `noiseFilters` from `csvConfig` instead of hardcoded strings.
>
> **Phase 2 additions:**
> - `processCsvDataWithMapping` — uses user-confirmed column mapping from `CSVPreviewComponent`.
> - `createChartDataWithVocab` — counts only values the user confirmed for that column.
> - `extractCommentsWithFilters` — uses per-column noise filter list from the mapping.

```js
import { csvConfig } from "../config/csvConfig";

// ─── Phase 1: keyword-based parsing ─────────────────────────────────────────

export const processCsvData = (csvData) => {
  const headers = csvData[0];
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = csvData.length - 1; // BUG FIX: exclude header row

  for (let i = 0; i < headers.length; i++) {
    if (csvConfig.chartKeywords.some((k) => headers[i].includes(k))) {
      chartHeaders.push(headers[i]);
      chartData.push(createChartData(csvData, i));
    }
    if (csvConfig.commentKeywords.some((k) => headers[i].includes(k))) {
      commentHeaders.push(headers[i]);
      commentData.push(extractComments(csvData, i));
    }
  }

  // BUG FIX: totalFeedback returned once from here, not set inside the loop
  return { chartHeaders, chartData, commentHeaders, commentData, totalFeedback };
};

export const createChartData = (csvData, columnIndex) => {
  const feedbackCounts = {};
  csvConfig.defaultFeedbackVocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  // BUG FIX: start at i=1 to skip the header row
  for (let i = 1; i < csvData.length; i++) {
    const feedback = csvData[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractComments = (csvData, columnIndex) => {
  const noiseFilters = csvConfig.commentNoiseFilters;
  return csvData
    .slice(1) // skip header row
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase())
    );
};

// ─── Phase 2: mapping-based parsing ─────────────────────────────────────────

export const processCsvDataWithMapping = (csvData, columnMapping) => {
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = csvData.length - 1;

  for (const col of columnMapping) {
    if (col.type === "PIE_CHART") {
      chartHeaders.push(col.header);
      chartData.push(createChartDataWithVocab(csvData, col.index, col.vocabulary));
    } else if (col.type === "COMMENT") {
      commentHeaders.push(col.header);
      commentData.push(
        extractCommentsWithFilters(csvData, col.index, col.noiseFilters)
      );
    }
  }

  return { chartHeaders, chartData, commentHeaders, commentData, totalFeedback };
};

export const createChartDataWithVocab = (csvData, columnIndex, vocabulary) => {
  const feedbackCounts = {};
  vocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  for (let i = 1; i < csvData.length; i++) {
    const feedback = csvData[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractCommentsWithFilters = (csvData, columnIndex, noiseFilters) => {
  return csvData
    .slice(1)
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase())
    );
};
```

---

### New File: `src/utils/reportHelpers.js`

> Used by `ReportDocument.js` (Phase 4) to substitute tokens in the title template.

```js
export const interpolateTitle = (
  template,
  { moduleName, faculty, batchMonth, batchYear, moduleco }
) => {
  return template
    .replace("{moduleName}", moduleName || "")
    .replace("{faculty}", faculty || "")
    .replace("{batchMonth}", batchMonth || "")
    .replace("{batchYear}", batchYear || "")
    .replace("{moduleco}", moduleco || "");
};
```

---

### Modified File: `src/component/Comments.js`

> **Bug fixed:** The `index !== 0` guard was silently dropping the first comment in every column. Removed.

```jsx
import React from "react";

function Comments({ comdata, comname }) {
  const shouldPageBreak = comname.toLowerCase().includes("comments");

  return (
    <div style={{ pageBreakBefore: shouldPageBreak ? "always" : "auto" }}>
      <br />
      <h4 className="text-center" style={{ textAlign: "center" }}>
        {comname}
      </h4>
      <hr />
      <ul style={{ margin: 5 }}>
        {comdata.map((entry, index) => (
          // BUG FIX: removed `index !== 0 &&` — the first comment is no longer dropped
          <li key={index} className="text-left">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
```

---

### Modified File: `src/App.test.js`

> **Bug fixed:** The test was looking for the text "learn react" which never appears in this app.
> Updated to match actual rendered content.

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Feedback Generator heading", () => {
  render(<App />);
  const heading = screen.getByText(/feedback generator/i);
  expect(heading).toBeInTheDocument();
});
```

---

### Modified File: `src/component/InputComponent.js`

> **Phase 1 changes:**
> - Removed all three inline arrays (`moduleCoordinatorName`, `moduleNameList`, `facultyNameList`).
> - Now imports them from `src/config/masterData.js`.
>
> **Phase 2 additions:**
> - Added Papa import to auto-parse the CSV on "Upload" click.
> - Added `step` state (`"input"` → `"preview"` → `"generate"`).
> - "Upload" now parses the CSV and shows `CSVPreviewComponent` first.
> - After the user confirms the column mapping, `PDFComponent` is shown with the confirmed mapping.
>
> **Phase 3 additions:**
> - Replaced direct `masterData.js` import with `loadMasterData()` from `persistConfig.js`.
>   This means runtime edits saved in the Settings Panel are used immediately.

```jsx
import React, { useState } from "react";
import PDFComponent from "./PDFComponent";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Instructions from "./Instructions";
import Papa from "papaparse";                          // Phase 2
import CSVPreviewComponent from "./CSVPreviewComponent"; // Phase 2
import { loadMasterData } from "../utils/persistConfig"; // Phase 3

export const InputComponent = () => {
  // Phase 3: load lists from localStorage (falls back to masterData.js defaults)
  const {
    moduleCoordinatorName,
    moduleNameList,
    facultyNameList,
  } = loadMasterData();

  const [File, setFile] = useState();
  const [moduleName, setModuleName] = useState();
  const [batchMonth, setBatchMonth] = useState([]);
  const [batchYear, setBatchYear] = useState([]);
  const [faculty, setFaculty] = useState();
  const [moduleco, setModuleco] = useState();

  // Phase 2: step-based flow
  const [step, setStep] = useState("input"); // "input" | "preview" | "generate"
  const [parsedCsvData, setParsedCsvData] = useState(null);
  const [columnMapping, setColumnMapping] = useState(null);

  const batchYears = generateYears();

  const batchMonths = [
    { value: "January",   label: "January" },
    { value: "February",  label: "February" },
    { value: "March",     label: "March" },
    { value: "April",     label: "April" },
    { value: "May",       label: "May" },
    { value: "June",      label: "June" },
    { value: "July",      label: "July" },
    { value: "August",    label: "August" },
    { value: "September", label: "September" },
    { value: "October",   label: "October" },
    { value: "November",  label: "November" },
    { value: "December",  label: "December" },
  ];

  function generateYears() {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, index) => {
      const year = currentYear - index;
      return { value: year.toString(), label: year.toString() };
    });
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
    // Reset flow when a new file is chosen
    setStep("input");
    setParsedCsvData(null);
    setColumnMapping(null);
  }

  // Phase 2: parse CSV first, then go to preview step
  const showDiv = () => {
    if (!File) return;
    Papa.parse(File, {
      complete: ({ data }) => {
        setParsedCsvData(data);
        setStep("preview");
      },
    });
  };

  const hideDiv = () => {
    setStep("input");
    setParsedCsvData(null);
    setColumnMapping(null);
  };

  // Phase 2: called by CSVPreviewComponent when user confirms mapping
  const handlePreviewConfirm = (mapping) => {
    setColumnMapping(mapping);
    setStep("generate");
  };

  // Phase 2: called by CSVPreviewComponent when user cancels
  const handlePreviewCancel = () => {
    setStep("input");
    setParsedCsvData(null);
  };

  return (
    <div>
      <div style={{ textAlign: "end" }}>
        <Instructions />
      </div>
      <div className="container">
        <div className="text-center">
          <h1>Feedback Generator</h1>
        </div>
        <br />
        <div className="col-md-10 mx-auto">
          <form>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Module Name</label>
              <div className="dropdown col-sm-10">
                <Select
                  options={moduleNameList}
                  onChange={(event) => setModuleName(event.value)}
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Batch</label>
              <div className="col-sm-5">
                <Select
                  placeholder="Month"
                  options={batchMonths}
                  onChange={(event) => setBatchMonth(event.value)}
                />
              </div>
              <div className="col-sm-5">
                <Select
                  placeholder="Year"
                  options={batchYears}
                  onChange={(event) => setBatchYear(event.value)}
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Faculty Name</label>
              <div className="col-sm-10">
                <CreatableSelect
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={facultyNameList}
                  onChange={(event) => setFaculty(event.value)}
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Module Coordinater</label>
              <div className="col-sm-10">
                <Select
                  options={moduleCoordinatorName}
                  onChange={(event) => setModuleco(event.value)}
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Upload CSV File</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  id="file"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={showDiv}
              onDoubleClick={hideDiv}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Phase 2: CSV preview & column mapping */}
        {step === "preview" && parsedCsvData && (
          <CSVPreviewComponent
            csvData={parsedCsvData}
            onConfirm={handlePreviewConfirm}
            onCancel={handlePreviewCancel}
          />
        )}

        {/* Phase 2: show PDF component only after mapping is confirmed */}
        {step === "generate" && (
          <div className="row">
            <div>
              <PDFComponent
                file={File}
                moduleName={moduleName}
                batchMonth={batchMonth}
                batchYear={batchYear}
                faculty={faculty}
                moduleco={moduleco}
                columnMapping={columnMapping} // Phase 2
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
```

---

### Modified File: `src/component/PDFComponent.js`

> **Phase 1 changes:**
> - Removed the three inline functions (`processCsvData`, `createChartData`, `extractComments`).
> - Imported `processCsvData` from `src/utils/csvParser.js`.
> - `totalFeedback` is now set from the return value of `processCsvData` (called once after parsing, not inside a per-column loop).
>
> **Phase 2 additions:**
> - Accepts optional `columnMapping` prop.
> - If `columnMapping` is provided by `InputComponent`, uses `processCsvDataWithMapping` instead of `processCsvData`.
>
> **Phase 4 changes:**
> - `printPage` / `window.print()` / `document.body.innerHTML` DOM mutation is removed entirely.
> - Added `captureCharts()` — uses `html-to-image`'s `toPng()` to capture each off-screen chart as a PNG data URL.
> - Added `<PDFDownloadLink>` from `@react-pdf/renderer` wrapping `<ReportDocument>` for direct PDF download.
> - An off-screen hidden `div` renders `PieChartComponent` instances solely for image capture.

```jsx
import React, { useState, useRef, useCallback } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";        // Phase 4
import { toPng } from "html-to-image";                        // Phase 4
import Comments from "./Comments";
import PieChartComponent from "./PieChartComponent";
import ReportDocument from "./ReportDocument";                 // Phase 4
import Papa from "papaparse";
import {
  processCsvData,
  processCsvDataWithMapping,                                  // Phase 2
} from "../utils/csvParser";

function PDFComponent({
  file,
  batchMonth,
  batchYear,
  faculty,
  moduleco,
  moduleName,
  columnMapping, // Phase 2 — provided by InputComponent after CSVPreviewComponent confirms
}) {
  const [chartData, setChartData] = useState([]);
  const [chartHeaders, setChartHeaders] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentHeaders, setCommentHeaders] = useState([]);
  const [showData, setShowData] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState("");

  // Phase 4: chart image capture state
  const [chartImages, setChartImages] = useState([]);
  const [captureReady, setCaptureReady] = useState(false);
  const chartRefs = useRef([]);

  const generateChart = () => {
    setShowData(true);
    setCaptureReady(false);
    setChartImages([]);
    Papa.parse(file, {
      complete: ({ data }) => {
        // Phase 2: use mapping-based parser if column mapping was confirmed
        const parsed = columnMapping
          ? processCsvDataWithMapping(data, columnMapping)
          : processCsvData(data);

        const {
          chartHeaders,
          chartData,
          commentHeaders,
          commentData,
          totalFeedback, // Phase 1 bug fix: returned as value, not set in loop
        } = parsed;

        setChartHeaders(chartHeaders);
        setChartData(chartData);
        setCommentHeaders(commentHeaders);
        setCommentData(commentData);
        setTotalFeedback(totalFeedback);
      },
    });
  };

  // Phase 4: capture each off-screen chart element as a PNG data URL
  const captureCharts = useCallback(async () => {
    const images = [];
    for (const ref of chartRefs.current) {
      if (ref) {
        const dataUrl = await toPng(ref);
        images.push(dataUrl);
      }
    }
    setChartImages(images);
    setCaptureReady(true);
  }, []);

  return (
    <div>
      <br />
      <div className="container row d-flex justify-content-center">
        <div className="col-md-4 offset-md-4 justify-content-center">
          <button
            className="btn btn-warning text-center"
            onClick={generateChart}
          >
            Generate Chart
          </button>
        </div>

        {/* Phase 4: "Prepare PDF" button — captures chart images before download link is shown */}
        {showData && !captureReady && (
          <div className="col-md-4 justify-content-end">
            <button className="btn btn-info" onClick={captureCharts}>
              Prepare PDF
            </button>
          </div>
        )}

        {/* Phase 4: PDFDownloadLink — no DOM mutation, no print dialog */}
        {captureReady && (
          <div className="col-md-4 justify-content-end">
            <PDFDownloadLink
              document={
                <ReportDocument
                  moduleName={moduleName}
                  faculty={faculty}
                  batchMonth={batchMonth}
                  batchYear={batchYear}
                  moduleco={moduleco}
                  totalCount={totalFeedback}
                  chartImages={chartImages}
                  chartHeaders={chartHeaders}
                  commentData={commentData}
                  commentHeaders={commentHeaders}
                />
              }
              fileName={`feedback_${moduleName}_${batchMonth}_${batchYear}.pdf`}
              className="btn btn-success text-right"
            >
              {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
            </PDFDownloadLink>
          </div>
        )}
      </div>

      {/* Phase 4: off-screen chart render area — positioned off-screen, not hidden,
          so recharts can correctly measure and render SVG dimensions. */}
      <div style={{ position: "absolute", left: -9999, top: 0, width: 600 }}>
        {showData &&
          chartData.map((data, index) => (
            <div
              key={index}
              ref={(el) => {
                chartRefs.current[index] = el;
              }}
              style={{ background: "#ffffff", padding: 8 }}
            >
              <PieChartComponent
                data={data}
                name={chartHeaders[index]}
                count={index}
              />
            </div>
          ))}
      </div>

      {/* On-screen preview (unchanged layout) */}
      <div id="pdf" className="container">
        <div id="titles">
          {showData && (
            <div className="row m-1">
              <h2 className="text-center">
                PG-DAC Module Feedback for {moduleName}
              </h2>
              <br />
              <h5 className="col-md-6">Module Name : {moduleName}</h5>
              <h5 className="col-md-6">
                Batch : {batchMonth} {batchYear}
              </h5>
              <h5 className="col-md-6">Faculty Name : {faculty}</h5>
              <h5 className="col-md-6">Module Coordinator : {moduleco}</h5>
              <h5 className="col-md-6">
                Total Feedback Count : {totalFeedback}
              </h5>
            </div>
          )}
        </div>
        <hr />
        <div id="piechart">
          {showData &&
            chartData.map((data, index) => (
              <div key={index}>
                <PieChartComponent
                  data={chartData[index]}
                  name={chartHeaders[index]}
                  count={index}
                />
              </div>
            ))}
        </div>
        <div id="comment" className="row">
          {showData &&
            commentData.map((data, index) => (
              <div key={index} className="container col-md-10">
                <Comments
                  comdata={commentData[index]}
                  comname={commentHeaders[index]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PDFComponent;
```

---

## Phase 2 — CSV Auto-Detection & Preview UI

### New File: `src/utils/csvDetector.js`

```js
import { csvConfig } from "../config/csvConfig";

export const detectColumns = (csvData) => {
  const headers = csvData[0];
  const dataRows = csvData
    .slice(1)
    .filter((row) => row.some((cell) => cell && cell.trim()));
  const totalRows = dataRows.length;

  return headers.map((header, index) => {
    const headerLower = header.toLowerCase();

    // Force IGNORE for columns that match known non-data keywords
    if (
      csvConfig.ignoreKeywords.some((k) =>
        headerLower.includes(k.toLowerCase())
      )
    ) {
      return {
        index,
        header,
        detectedType: "UNKNOWN",
        confidence: 0,
        detectedVocabulary: [],
        sampleValues: [],
      };
    }

    const cellValues = dataRows
      .map((row) => row[index])
      .filter((v) => v && v.trim());

    const uniqueValues = [...new Set(cellValues)];
    const uniqueRatio = totalRows > 0 ? uniqueValues.length / totalRows : 0;
    const avgLength =
      cellValues.length > 0
        ? cellValues.reduce((sum, v) => sum + v.length, 0) / cellValues.length
        : 0;
    const allNumeric =
      cellValues.length > 0 && cellValues.every((v) => !isNaN(Number(v)));

    let detectedType = "UNKNOWN";
    let confidence = 0;

    // Base type detection by value diversity
    if (uniqueValues.length <= 10 && uniqueRatio < 0.4) {
      detectedType = "PIE_CHART";
      confidence += uniqueValues.length <= 6 ? 0.3 : 0.1;
    } else if (avgLength > 15 || uniqueRatio > 0.6) {
      detectedType = "COMMENT";
    }

    // Keyword boosting (overrides base detection if keyword matches)
    if (csvConfig.chartKeywords.some((k) => header.includes(k))) {
      detectedType = "PIE_CHART";
      confidence += 0.4;
    } else if (csvConfig.commentKeywords.some((k) => header.includes(k))) {
      detectedType = "COMMENT";
      confidence += 0.4;
    }

    // Additional confidence signals
    if (allNumeric && detectedType === "PIE_CHART") confidence += 0.2;
    if (uniqueRatio > 0.7 && detectedType === "COMMENT") confidence += 0.3;

    confidence = Math.min(1, confidence);

    // If evidence is weak, surface as UNKNOWN for the user to decide
    if (confidence < 0.5) detectedType = "UNKNOWN";

    return {
      index,
      header,
      detectedType,
      confidence,
      detectedVocabulary: detectedType === "PIE_CHART" ? uniqueValues : [],
      sampleValues: cellValues.slice(0, 5),
    };
  });
};
```

---

### New File: `src/component/CSVPreviewComponent.js`

```jsx
import React, { useState, useEffect } from "react";
import { detectColumns } from "../utils/csvDetector";
import { csvConfig } from "../config/csvConfig";

function CSVPreviewComponent({ csvData, onConfirm, onCancel }) {
  const [columnDescriptors, setColumnDescriptors] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [expandedVocab, setExpandedVocab] = useState(null);
  const [expandedNoise, setExpandedNoise] = useState(null);

  const headers = csvData[0];
  const previewRows = csvData.slice(1, 11); // first 10 data rows

  useEffect(() => {
    const descriptors = detectColumns(csvData);
    setColumnDescriptors(descriptors);
    setMapping(
      descriptors.map((d) => ({
        index: d.index,
        header: d.header,
        // Default UNKNOWN columns to Ignore; user can reassign
        type: d.detectedType === "UNKNOWN" ? "IGNORE" : d.detectedType,
        vocabulary:
          d.detectedVocabulary && d.detectedVocabulary.length > 0
            ? d.detectedVocabulary
            : [...csvConfig.defaultFeedbackVocabulary],
        noiseFilters: [...csvConfig.commentNoiseFilters],
      }))
    );
  }, [csvData]);

  const updateType = (colIndex, newType) => {
    setMapping((prev) =>
      prev.map((m) => (m.index === colIndex ? { ...m, type: newType } : m))
    );
  };

  const updateVocabulary = (colIndex, vocab) => {
    setMapping((prev) =>
      prev.map((m) =>
        m.index === colIndex ? { ...m, vocabulary: vocab } : m
      )
    );
  };

  const updateNoiseFilters = (colIndex, filters) => {
    setMapping((prev) =>
      prev.map((m) =>
        m.index === colIndex ? { ...m, noiseFilters: filters } : m
      )
    );
  };

  const handleConfirm = () => {
    // Only pass non-ignored columns downstream
    onConfirm(mapping.filter((m) => m.type !== "IGNORE"));
  };

  const typeLabel = (type) => {
    if (type === "PIE_CHART") return "Pie Chart";
    if (type === "COMMENT") return "Comment";
    return "Unknown";
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>
            CSV Preview &mdash; {csvData.length - 1} rows found
          </strong>
        </div>
        <div className="card-body">
          {/* Raw data preview */}
          <h6>Raw Data Preview (first 10 rows)</h6>
          <div
            className="table-responsive"
            style={{ maxHeight: 200, overflowY: "auto" }}
          >
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, ri) => (
                  <tr key={ri}>
                    {headers.map((_, ci) => (
                      <td key={ci}>{row[ci]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Column mapping */}
          <h6 className="mt-3">Column Mapping</h6>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Column Header</th>
                <th>Detected As</th>
                <th>Assign As</th>
              </tr>
            </thead>
            <tbody>
              {columnDescriptors.map((desc) => {
                const m = mapping.find((x) => x.index === desc.index);
                if (!m) return null;
                return (
                  <tr key={desc.index}>
                    <td>{desc.header}</td>
                    <td>
                      {desc.confidence >= 0.5 ? "✓" : "⚠"}{" "}
                      {typeLabel(desc.detectedType)}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={m.type}
                        onChange={(e) =>
                          updateType(desc.index, e.target.value)
                        }
                      >
                        <option value="PIE_CHART">Pie Chart</option>
                        <option value="COMMENT">Comment List</option>
                        <option value="IGNORE">Ignore</option>
                      </select>

                      {/* Vocabulary editor for Pie Chart columns */}
                      {m.type === "PIE_CHART" && (
                        <div className="mt-1">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              setExpandedVocab(
                                expandedVocab === desc.index
                                  ? null
                                  : desc.index
                              )
                            }
                          >
                            {expandedVocab === desc.index ? "Hide" : "Edit"}{" "}
                            Vocabulary
                          </button>
                          {expandedVocab === desc.index && (
                            <div className="mt-1">
                              {m.vocabulary.map((v, vi) => (
                                <span
                                  key={vi}
                                  className="badge bg-secondary me-1 mb-1"
                                >
                                  {v}
                                  <button
                                    className="btn-close btn-close-white btn-sm ms-1"
                                    style={{ fontSize: "0.5rem" }}
                                    onClick={() =>
                                      updateVocabulary(
                                        desc.index,
                                        m.vocabulary.filter(
                                          (_, i) => i !== vi
                                        )
                                      )
                                    }
                                  />
                                </span>
                              ))}
                              <input
                                className="form-control form-control-sm mt-1"
                                placeholder="Add value and press Enter..."
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Enter" &&
                                    e.target.value.trim()
                                  ) {
                                    updateVocabulary(desc.index, [
                                      ...m.vocabulary,
                                      e.target.value.trim(),
                                    ]);
                                    e.target.value = "";
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Noise filter editor for Comment columns */}
                      {m.type === "COMMENT" && (
                        <div className="mt-1">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              setExpandedNoise(
                                expandedNoise === desc.index
                                  ? null
                                  : desc.index
                              )
                            }
                          >
                            {expandedNoise === desc.index ? "Hide" : "Edit"}{" "}
                            Noise Filters
                          </button>
                          {expandedNoise === desc.index && (
                            <div className="mt-1">
                              {m.noiseFilters.map((f, fi) => (
                                <span
                                  key={fi}
                                  className="badge bg-warning text-dark me-1 mb-1"
                                >
                                  {f}
                                  <button
                                    className="btn-close btn-sm ms-1"
                                    style={{ fontSize: "0.5rem" }}
                                    onClick={() =>
                                      updateNoiseFilters(
                                        desc.index,
                                        m.noiseFilters.filter(
                                          (_, i) => i !== fi
                                        )
                                      )
                                    }
                                  />
                                </span>
                              ))}
                              <input
                                className="form-control form-control-sm mt-1"
                                placeholder="Add filter and press Enter..."
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Enter" &&
                                    e.target.value.trim()
                                  ) {
                                    updateNoiseFilters(desc.index, [
                                      ...m.noiseFilters,
                                      e.target.value.trim().toLowerCase(),
                                    ]);
                                    e.target.value = "";
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm &amp; Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CSVPreviewComponent;
```

---

## Phase 3 — Runtime Settings Persistence

### New File: `src/utils/persistConfig.js`

```js
import {
  moduleCoordinatorName as defaultCoordinators,
  moduleNameList as defaultModules,
  facultyNameList as defaultFaculty,
} from "../config/masterData";

const STORAGE_KEY = "pie_generator_master";

export const loadMasterData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        moduleCoordinatorName: defaultCoordinators,
        moduleNameList: defaultModules,
        facultyNameList: defaultFaculty,
      };
    }
    const overrides = JSON.parse(stored);
    return {
      moduleCoordinatorName:
        overrides.moduleCoordinatorName ?? defaultCoordinators,
      moduleNameList: overrides.moduleNameList ?? defaultModules,
      facultyNameList: overrides.facultyNameList ?? defaultFaculty,
    };
  } catch {
    return {
      moduleCoordinatorName: defaultCoordinators,
      moduleNameList: defaultModules,
      facultyNameList: defaultFaculty,
    };
  }
};

export const saveMasterData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetMasterData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportConfig = () => {
  const stored = localStorage.getItem(STORAGE_KEY) || "{}";
  const blob = new Blob([stored], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pie_generator_config.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importConfig = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        resolve(data);
      } catch {
        reject(new Error("Invalid config file"));
      }
    };
    reader.readAsText(file);
  });
};
```

---

### New File: `src/component/SettingsPanel.js`

```jsx
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  loadMasterData,
  saveMasterData,
  resetMasterData,
  exportConfig,
  importConfig,
} from "../utils/persistConfig";

function SettingsPanel({ onClose }) {
  const initial = loadMasterData();
  const [coordinators, setCoordinators] = useState(
    initial.moduleCoordinatorName
  );
  const [modules, setModules] = useState(initial.moduleNameList);
  const [faculty, setFaculty] = useState(initial.facultyNameList);

  const handleSave = () => {
    saveMasterData({
      moduleCoordinatorName: coordinators,
      moduleNameList: modules,
      facultyNameList: faculty,
    });
    alert("Settings saved.");
    onClose();
  };

  const handleReset = () => {
    if (window.confirm("Reset all lists to defaults? This cannot be undone.")) {
      resetMasterData();
      onClose();
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importConfig(file)
      .then(() => onClose())
      .catch(() => alert("Invalid config file."));
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <h6>Faculty List</h6>
            <CreatableSelect
              isMulti
              value={faculty}
              onChange={setFaculty}
              options={faculty}
            />

            <h6 className="mt-3">Module Coordinator List</h6>
            <CreatableSelect
              isMulti
              value={coordinators}
              onChange={setCoordinators}
              options={coordinators}
            />

            <h6 className="mt-3">Module List</h6>
            <div
              className="table-responsive"
              style={{ maxHeight: 220, overflowY: "auto" }}
            >
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Module Name (full)</th>
                    <th>Abbreviation</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={m.value}
                          onChange={(e) =>
                            setModules((prev) =>
                              prev.map((x, xi) =>
                                xi === i
                                  ? { ...x, value: e.target.value }
                                  : x
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={m.label}
                          onChange={(e) =>
                            setModules((prev) =>
                              prev.map((x, xi) =>
                                xi === i
                                  ? { ...x, label: e.target.value }
                                  : x
                              )
                            )
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            setModules((prev) =>
                              prev.filter((_, xi) => xi !== i)
                            )
                          }
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() =>
                setModules((prev) => [...prev, { value: "", label: "" }])
              }
            >
              + Add Module
            </button>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <div>
              <button
                className="btn btn-outline-danger me-2"
                onClick={handleReset}
              >
                Reset to Defaults
              </button>
              <button
                className="btn btn-outline-secondary me-2"
                onClick={exportConfig}
              >
                Export Config
              </button>
              <label className="btn btn-outline-secondary">
                Import Config
                <input
                  type="file"
                  accept=".json"
                  hidden
                  onChange={handleImport}
                />
              </label>
            </div>
            <div>
              <button
                className="btn btn-secondary me-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
```

---

### Modified File: `src/component/NavbarComponent.js`

> **Phase 3 changes:**
> - Reads gradient and logo values from `themeConfig.js`.
> - Adds a gear (⚙) button that opens `SettingsPanel`.

```jsx
import React, { useState } from "react";
import logo from "./image/logo.png";
import SettingsPanel from "./SettingsPanel";
import { themeConfig } from "../config/themeConfig";

function NavbarComponent() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav
        className="navbar navbar-light justify-content-between px-3"
        style={{
          background: themeConfig.navbarGradient,
          alignItems: "flex-start",
        }}
      >
        <img
          src={logo}
          width={themeConfig.logoWidth}
          height={themeConfig.logoHeight}
          className="d-flex align-top m-1 img-fluid"
          alt="logo"
        />
        <button
          className="btn btn-outline-secondary btn-sm mt-2"
          title="Settings"
          onClick={() => setShowSettings(true)}
        >
          ⚙
        </button>
      </nav>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

export default NavbarComponent;
```

---

### Modified File: `src/component/FooterComponent.js`

> **Phase 3 changes:** Reads gradient and footer text from `themeConfig.js`.

```jsx
import React from "react";
import { themeConfig } from "../config/themeConfig";

function FooterComponent() {
  return (
    <div
      style={{
        background: themeConfig.footerGradient,
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <footer className="d-flex flex-wrap justify-content-center py-3 border-top">
        <div className="ml-5">{themeConfig.footerText}</div>
      </footer>
    </div>
  );
}

export default FooterComponent;
```

---

## Phase 4 — Real PDF Generation

### Install command (run once before starting Phase 4)

```bash
npm install @react-pdf/renderer html-to-image
```

---

### New File: `src/component/ReportDocument.js`

> Replaces `window.print()`. Builds a real vector PDF using `@react-pdf/renderer`.
> Pie chart images are passed in as base64 PNG data URLs captured by `PDFComponent`'s `captureCharts()`.

```jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { reportConfig } from "../config/reportConfig";
import { interpolateTitle } from "../utils/reportHelpers";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 6,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  metaCell: {
    width: "50%",
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginTop: 16,
    marginBottom: 6,
    textAlign: "center",
  },
  chartsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chartBlock: {
    width: reportConfig.chartsPerRow === 2 ? "50%" : "100%",
    padding: 4,
    alignItems: "center",
  },
  chartLabel: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 4,
    fontFamily: "Helvetica-Bold",
  },
  chartImage: {
    width: "100%",
    height: 200,
  },
  commentHeader: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    marginBottom: 4,
  },
  commentItem: {
    marginLeft: 10,
    marginBottom: 2,
    fontSize: 10,
  },
});

function TitleBlock({
  moduleName,
  faculty,
  batchMonth,
  batchYear,
  moduleco,
  totalCount,
}) {
  const title = interpolateTitle(reportConfig.titleTemplate, {
    moduleName,
    faculty,
    batchMonth,
    batchYear,
    moduleco,
  });

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hr} />
      <View style={styles.metaRow}>
        <Text style={styles.metaCell}>Module Name: {moduleName}</Text>
        <Text style={styles.metaCell}>
          Batch: {batchMonth} {batchYear}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaCell}>Faculty Name: {faculty}</Text>
        <Text style={styles.metaCell}>Module Coordinator: {moduleco}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text>Total Feedback Count: {totalCount}</Text>
      </View>
      <View style={styles.hr} />
    </View>
  );
}

function ChartsSection({ chartImages, chartHeaders }) {
  return (
    <View style={styles.chartsRow}>
      {chartImages.map((imgSrc, i) => (
        <View key={i} style={styles.chartBlock}>
          <Text style={styles.chartLabel}>{chartHeaders[i]}</Text>
          <Image style={styles.chartImage} src={imgSrc} />
        </View>
      ))}
    </View>
  );
}

function CommentsSection({ commentData, commentHeaders }) {
  return (
    <View>
      {commentData.map((comments, i) => (
        <View key={i} wrap={false}>
          <Text style={styles.commentHeader}>{commentHeaders[i]}</Text>
          {comments.map((c, ci) => (
            <Text key={ci} style={styles.commentItem}>
              • {c}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function ReportDocument({
  moduleName,
  faculty,
  batchMonth,
  batchYear,
  moduleco,
  totalCount,
  chartImages,
  chartHeaders,
  commentData,
  commentHeaders,
}) {
  return (
    <Document>
      <Page
        size={reportConfig.pageSize}
        orientation={reportConfig.orientation}
        style={styles.page}
      >
        <TitleBlock
          moduleName={moduleName}
          faculty={faculty}
          batchMonth={batchMonth}
          batchYear={batchYear}
          moduleco={moduleco}
          totalCount={totalCount}
        />

        {reportConfig.sectionOrder.map((section) => {
          if (section === "charts") {
            return (
              <ChartsSection
                key="charts"
                chartImages={chartImages}
                chartHeaders={chartHeaders}
              />
            );
          }
          if (section === "comments") {
            return (
              <CommentsSection
                key="comments"
                commentData={commentData}
                commentHeaders={commentHeaders}
              />
            );
          }
          return null;
        })}
      </Page>
    </Document>
  );
}

export default ReportDocument;
```

---

## Summary of All Files

| File | Status | Phase |
|---|---|---|
| `src/config/masterData.js` | **NEW** | 1 |
| `src/config/csvConfig.js` | **NEW** | 1 |
| `src/config/reportConfig.js` | **NEW** | 1 |
| `src/config/themeConfig.js` | **NEW** | 1 |
| `src/utils/csvParser.js` | **NEW** (Phase 1) + extended (Phase 2) | 1, 2 |
| `src/utils/reportHelpers.js` | **NEW** | 4 |
| `src/utils/csvDetector.js` | **NEW** | 2 |
| `src/utils/persistConfig.js` | **NEW** | 3 |
| `src/component/Comments.js` | **MODIFIED** — bug fix | 1 |
| `src/component/InputComponent.js` | **MODIFIED** — config extraction + preview flow + persistConfig | 1, 2, 3 |
| `src/component/PDFComponent.js` | **MODIFIED** — extract functions + mapping + PDF download | 1, 2, 4 |
| `src/component/NavbarComponent.js` | **MODIFIED** — themeConfig + settings gear | 3 |
| `src/component/FooterComponent.js` | **MODIFIED** — themeConfig | 3 |
| `src/component/CSVPreviewComponent.js` | **NEW** | 2 |
| `src/component/SettingsPanel.js` | **NEW** | 3 |
| `src/component/ReportDocument.js` | **NEW** | 4 |
| `src/App.test.js` | **MODIFIED** — fix broken test | 1 |
