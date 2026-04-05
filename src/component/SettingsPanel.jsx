import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import {
  loadMasterData,
  saveMasterData,
  resetMasterData,
  exportConfig,
  importConfig,
  loadReportConfig,
  saveReportConfig,
  resetReportConfig,
} from "../utils/persistConfig";
import { reportConfig as defaultReportConfig } from "../config/reportConfig";

function SettingsPanel({ onClose }) {
  const initial = loadMasterData();
  const [coordinators, setCoordinators] = useState(
    initial.moduleCoordinatorName,
  );
  const [modules, setModules] = useState(initial.moduleNameList);
  const [faculty, setFaculty] = useState(initial.facultyNameList);
  const [courseNames, setCourseNames] = useState(initial.courseNameOptions);

  // F12: report config state (initialize from localStorage or defaults)
  const storedReport = loadReportConfig();
  const [reportCfg, setReportCfg] = useState(
    storedReport
      ? { ...defaultReportConfig, ...storedReport }
      : { ...defaultReportConfig },
  );

  // F13: close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSave = () => {
    saveMasterData({
      courseNameOptions: courseNames,
      moduleCoordinatorName: coordinators,
      moduleNameList: modules,
      facultyNameList: faculty,
    });
    saveReportConfig(reportCfg);
    alert("Settings saved.");
    onClose();
  };

  const handleReset = () => {
    if (window.confirm("Reset all lists to defaults? This cannot be undone.")) {
      resetMasterData();
      resetReportConfig();
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
              aria-label="Close settings"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <h6>Course List</h6>
            <CreatableSelect
              isMulti
              value={courseNames}
              onChange={setCourseNames}
              options={courseNames}
            />

            <h6 className="mt-3">Faculty List</h6>
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
                                xi === i ? { ...x, value: e.target.value } : x,
                              ),
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
                                xi === i ? { ...x, label: e.target.value } : x,
                              ),
                            )
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          aria-label={`Remove module ${m.value || "row"}`}
                          onClick={() =>
                            setModules((prev) =>
                              prev.filter((_, xi) => xi !== i),
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

            {/* F12: Report Settings */}
            <h6 className="mt-4">Report Settings</h6>
            <div className="row g-2">
              <div className="col-sm-6">
                <label className="form-label small mb-1">Page Size</label>
                <select
                  className="form-select form-select-sm"
                  value={reportCfg.pageSize}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      pageSize: e.target.value,
                    }))
                  }
                >
                  <option value="A4">A4</option>
                  <option value="LETTER">Letter</option>
                  <option value="A3">A3</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small mb-1">Orientation</label>
                <select
                  className="form-select form-select-sm"
                  value={reportCfg.pageOrientation}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      pageOrientation: e.target.value,
                    }))
                  }
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small mb-1">Charts Per Row</label>
                <select
                  className="form-select form-select-sm"
                  value={reportCfg.chartsPerRow}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      chartsPerRow: Number(e.target.value),
                    }))
                  }
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small mb-1">Section Order</label>
                <select
                  className="form-select form-select-sm"
                  value={reportCfg.sectionOrder[0]}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      sectionOrder:
                        e.target.value === "charts"
                          ? ["charts", "comments"]
                          : ["comments", "charts"],
                    }))
                  }
                >
                  <option value="charts">Charts first, then Comments</option>
                  <option value="comments">Comments first, then Charts</option>
                </select>
              </div>
              <div className="col-sm-12">
                <label className="form-label small mb-1">Title Template</label>
                <input
                  className="form-control form-control-sm"
                  value={reportCfg.titleTemplate}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      titleTemplate: e.target.value,
                    }))
                  }
                  placeholder="e.g. {courseName} Feedback - {moduleName}"
                />
                <div className="form-text">
                  Tokens:{" "}
                  {`{courseName} {moduleName} {faculty} {faculty2} {batchMonth} {batchYear} {moduleco}`}
                </div>
              </div>
              <div className="col-sm-12">
                <label className="form-label small mb-1">Footer Text</label>
                <input
                  className="form-control form-control-sm"
                  value={reportCfg.footerText}
                  onChange={(e) =>
                    setReportCfg((prev) => ({
                      ...prev,
                      footerText: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
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
              <button className="btn btn-secondary me-2" onClick={onClose}>
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
