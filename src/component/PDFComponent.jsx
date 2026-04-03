import React, { useState, useRef, useCallback } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toPng } from "html-to-image";
import Comments from "./Comments";
import PieChartComponent from "./PieChartComponent";
import ReportDocument from "./ReportDocument";
import Papa from "papaparse";
import { processCsvData, processCsvDataWithMapping } from "../utils/csvParser";
import { interpolateTitle } from "../utils/reportHelpers";
import { reportConfig } from "../config/reportConfig";

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

  const generateChart = () => {
    setShowData(true);
    setCaptureReady(false);
    setChartImages([]);
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
      },
    });
  };

  // Capture each off-screen chart element as a PNG data URL
  const captureCharts = useCallback(async () => {
    const images = [];
    for (const ref of chartRefs.current) {
      if (ref) {
        const dataUrl = await toPng(ref, { pixelRatio: 2 });
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

        {/* "Prepare PDF" captures chart images before the download link appears */}
        {showData && !captureReady && (
          <div className="col-md-4 justify-content-end">
            <button className="btn btn-info" onClick={captureCharts}>
              Prepare PDF
            </button>
          </div>
        )}

        {/* PDFDownloadLink — no DOM mutation, no print dialog */}
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
                  courseName={courseName}
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
                {interpolateTitle(reportConfig.titleTemplate, {
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PDFComponent;
