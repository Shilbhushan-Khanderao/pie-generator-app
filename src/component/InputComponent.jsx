import React, { useState } from "react";
import PDFComponent from "./PDFComponent";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Instructions from "./Instructions";
import Papa from "papaparse";
import CSVPreviewComponent from "./CSVPreviewComponent";
import { loadMasterData } from "../utils/persistConfig";

export const InputComponent = () => {
  // Load lists from localStorage (falls back to masterData.js defaults)
  const {
    courseNameOptions,
    moduleCoordinatorName,
    moduleNameList,
    facultyNameList,
  } = loadMasterData();

  const [File, setFile] = useState();
  const [courseName, setCourseName] = useState("");
  const [moduleName, setModuleName] = useState();
  const [batchMonth, setBatchMonth] = useState([]);
  const [batchYear, setBatchYear] = useState([]);
  const [faculty, setFaculty] = useState();
  const [moduleco, setModuleco] = useState();

  // Step-based flow: "input" | "preview" | "generate"
  const [step, setStep] = useState("input");
  const [parsedCsvData, setParsedCsvData] = useState(null);
  const [columnMapping, setColumnMapping] = useState(null);

  const batchYears = generateYears();

  const batchMonths = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
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

  // Parse CSV first, then go to preview step
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

  // Called by CSVPreviewComponent when user confirms mapping
  const handlePreviewConfirm = (mapping) => {
    setColumnMapping(mapping);
    setStep("generate");
  };

  // Called by CSVPreviewComponent when user cancels
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
              <label className="col-sm-2 col-form-label">Course Name</label>
              <div className="dropdown col-sm-10">
                <Select
                  options={courseNameOptions}
                  onChange={(event) => setCourseName(event.value)}
                  placeholder="Select Course..."
                />
              </div>
            </div>
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
              <label className="col-sm-2 col-form-label">
                Module Coordinater
              </label>
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

        {/* CSV preview & column mapping */}
        {step === "preview" && parsedCsvData && (
          <CSVPreviewComponent
            csvData={parsedCsvData}
            onConfirm={handlePreviewConfirm}
            onCancel={handlePreviewCancel}
          />
        )}

        {/* Show PDF component only after mapping is confirmed */}
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
                courseName={courseName}
                columnMapping={columnMapping}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
