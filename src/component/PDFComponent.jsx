import React, { useState, useRef, useCallback, useMemo } from "react";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { toPng } from "html-to-image";
import Comments from "./Comments";
import CommentAnalysis from "./CommentAnalysis";
import PieChartComponent from "./PieChartComponent";
import ReportDocument from "./ReportDocument";
import Papa from "papaparse";
import { processCsvData, processCsvDataWithMapping } from "../utils/csvParser";
import { interpolateTitle } from "../utils/reportHelpers";
import { getReportConfig } from "../config/reportConfig";

function PDFComponent({
  file,
  batchMonth,
  batchYear,
  faculty,
  moduleco,
  moduleName,
  courseName,
  columnMapping,
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

  // F6: loading / progress state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState({ done: 0, total: 0 });

  // F3: PDF live preview toggle
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Stable document element — only recreated when the actual data changes,
  // not when UI state like showPdfPreview toggles.
  const reportDoc = useMemo(
    () =>
      captureReady ? (
        <ReportDocument
          moduleName={moduleName}
          faculty={faculty}
          batchMonth={batchMonth}
          batchYear={batchYear}
          moduleco={moduleco}
          courseName={courseName}
          totalCount={totalFeedback}
          chartImages={chartImages}
          commentData={commentData}
          commentHeaders={commentHeaders}
          config={getReportConfig()}
        />
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [captureReady, chartImages, commentData, commentHeaders],
  );

  const generateChart = () => {
    setShowData(false);
    setCaptureReady(false);
    setChartImages([]);
    setShowPdfPreview(false);
    chartRefs.current = [];
    setIsGenerating(true);
    Papa.parse(file, {
      complete: ({ data }) => {
        const parsed = columnMapping
          ? processCsvDataWithMapping(data, columnMapping)
          : processCsvData(data);

        const {
          chartHeaders,
          chartData,
          commentHeaders,
          commentData,
          totalFeedback,
        } = parsed;

        setChartHeaders(chartHeaders);
        setChartData(chartData);
        setCommentHeaders(commentHeaders);
        setCommentData(commentData);
        setTotalFeedback(totalFeedback);
        setIsGenerating(false);
        setShowData(true);
      },
    });
  };

  // Capture each off-screen chart element as a PNG data URL
  const captureCharts = useCallback(async () => {
    setIsCapturing(true);
    setCaptureProgress({ done: 0, total: chartRefs.current.length });
    const images = [];
    try {
      for (let i = 0; i < chartRefs.current.length; i++) {
        const ref = chartRefs.current[i];
        if (ref) {
          try {
            const dataUrl = await toPng(ref, { pixelRatio: 2 });
            images.push(dataUrl);
          } catch (err) {
            console.error(`captureCharts: failed to capture chart ${i}`, err);
          }
        }
        setCaptureProgress({ done: i + 1, total: chartRefs.current.length });
      }
    } finally {
      setChartImages(images);
      setCaptureReady(images.length > 0);
      setIsCapturing(false);
    }
  }, []);

  return (
    <div>
      <br />
      <div className="container row d-flex justify-content-center">
        <div className="col-md-4 offset-md-4 justify-content-center">
          <button
            className="btn btn-warning text-center"
            onClick={generateChart}
            disabled={isGenerating}
            aria-label="Generate charts from CSV data"
          >
            {isGenerating ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Generating…
              </>
            ) : (
              "Generate Chart"
            )}
          </button>
        </div>

        {/* "Prepare PDF" captures chart images before the download link appears */}
        {showData &&
          !captureReady &&
          (chartData.length > 0 || commentData.length > 0) && (
            <div className="col-md-4 justify-content-end">
              <button
                className="btn btn-info"
                onClick={captureCharts}
                disabled={isCapturing}
                aria-label="Capture charts and prepare PDF"
              >
                {isCapturing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    {`Capturing ${captureProgress.done} of ${captureProgress.total}…`}
                  </>
                ) : (
                  "Prepare PDF"
                )}
              </button>
            </div>
          )}
        {showData && chartData.length === 0 && commentData.length === 0 && (
          <div className="col-12 text-center mt-2">
            <p className="text-warning">
              No chart or comment columns were found in this CSV. Check column
              mapping.
            </p>
          </div>
        )}

        {/* PDFDownloadLink + Preview toggle */}
        {captureReady && reportDoc && (
          <>
            <div className="col-md-4 justify-content-end">
              <PDFDownloadLink
                document={reportDoc}
                fileName={`feedback_${moduleName}_${batchMonth}_${batchYear}.pdf`}
                className="btn btn-success text-right"
                aria-label="Download generated PDF report"
              >
                {({ loading }) => (loading ? "Preparing…" : "Download PDF")}
              </PDFDownloadLink>
            </div>
            <div className="col-12 text-center mt-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowPdfPreview((v) => !v)}
                aria-label={
                  showPdfPreview ? "Hide PDF preview" : "Show PDF preview"
                }
              >
                {showPdfPreview ? "Hide Preview" : "Preview PDF"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* F3: live PDF preview — BlobProvider renders once, iframe displays the blob URL.
          Avoids PDFViewer's postMessage mechanism that triggers browser-extension errors. */}
      {captureReady && showPdfPreview && reportDoc && (
        <div className="container mt-3">
          <BlobProvider document={reportDoc}>
            {({ url, loading, error }) => {
              if (loading)
                return (
                  <p className="text-center text-muted">Building preview…</p>
                );
              if (error)
                return (
                  <p className="text-center text-danger">
                    Preview failed: {String(error)}
                  </p>
                );
              return (
                <iframe
                  src={url}
                  title="PDF Preview"
                  width="100%"
                  height="600px"
                  style={{ border: "1px solid #ccc", borderRadius: 4 }}
                />
              );
            }}
          </BlobProvider>
        </div>
      )}

      {/* Off-screen chart render area — positioned off-screen so recharts can
          correctly measure and render SVG dimensions for image capture. */}
      <div style={{ position: "absolute", left: -9999, top: 0, width: 800 }}>
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
                animated={false}
                fullWidth={true}
              />
            </div>
          ))}
      </div>

      {/* On-screen preview */}
      <div id="pdf" className="container">
        <div id="titles">
          {showData && (
            <div className="row m-1">
              <h3
                className="text-center w-100"
                style={{ marginBottom: "12px" }}
              >
                {interpolateTitle(getReportConfig().titleTemplate, {
                  courseName,
                  moduleName,
                  faculty,
                  batchMonth,
                  batchYear,
                  moduleco,
                })}
              </h3>
              <hr style={{ width: "100%", marginBottom: "12px" }} />
              <h5>Module Name : {moduleName}</h5>
              <h5>
                Batch : {batchMonth} {batchYear}
              </h5>
              {faculty && faculty.trim() && <h5>Faculty Name : {faculty}</h5>}
              {moduleco && moduleco.trim() && (
                <h5>Module Coordinator : {moduleco}</h5>
              )}
              <h5>Total Feedback Count : {totalFeedback}</h5>
              <hr style={{ width: "100%", marginTop: "12px" }} />
            </div>
          )}
        </div>
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
                <CommentAnalysis
                  comments={commentData[index]}
                  header={commentHeaders[index]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PDFComponent;
