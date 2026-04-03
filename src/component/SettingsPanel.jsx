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
    initial.moduleCoordinatorName,
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
