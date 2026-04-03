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
      })),
    );
  }, [csvData]);

  const updateType = (colIndex, newType) => {
    setMapping((prev) =>
      prev.map((m) => (m.index === colIndex ? { ...m, type: newType } : m)),
    );
  };

  const updateVocabulary = (colIndex, vocab) => {
    setMapping((prev) =>
      prev.map((m) => (m.index === colIndex ? { ...m, vocabulary: vocab } : m)),
    );
  };

  const updateNoiseFilters = (colIndex, filters) => {
    setMapping((prev) =>
      prev.map((m) =>
        m.index === colIndex ? { ...m, noiseFilters: filters } : m,
      ),
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
          <strong>CSV Preview &mdash; {csvData.length - 1} rows found</strong>
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
                        onChange={(e) => updateType(desc.index, e.target.value)}
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
                                  : desc.index,
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
                                        m.vocabulary.filter((_, i) => i !== vi),
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
                                  : desc.index,
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
                                          (_, i) => i !== fi,
                                        ),
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
