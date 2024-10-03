import React, { useState } from "react";
import Comments from "./Comments";
import PieChartComponent from "./PieChartComponent";
import Papa from "papaparse";

function PDFComponent({
  file,
  batchMonth,
  batchYear,
  faculty,
  // faculty1,
  moduleco,
  moduleName,
}) {
  const [chartData, setChartData] = useState([]);
  const [chartHeaders, setChartHeaders] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentHeaders, setCommentHeaders] = useState([]);
  const [showData, setShowData] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState("");

  const generateChart = () => {
    setShowData(true);
    Papa.parse(file, {
      complete: ({ data }) => {
        const { chartHeaders, chartData, commentHeaders, commentData } =
          processCsvData(data);
        setChartHeaders(chartHeaders);
        setChartData(chartData);
        setCommentHeaders(commentHeaders);
        setCommentData(commentData);
      },
    });
  };

  const processCsvData = (csvData) => {
    const headers = csvData[0];
    const chartHeaders = [];
    const chartData = [];
    const commentHeaders = [];
    const commentData = [];

    for (let i = 0; i < headers.length; i++) {
      if (
        headers[i].includes("Explanation") ||
        headers[i].includes("Pace") ||
        headers[i].includes("Interaction") ||
        headers[i].includes("Practical") ||
        headers[i].includes("Overall")
      ) {
        chartHeaders.push(headers[i]);
        chartData.push(createChartData(csvData, i));
      }
      if (
        headers[i].includes("Theory") ||
        headers[i].includes("Lab") ||
        headers[i].includes("Comments") ||
        headers[i].includes("comments")
      ) {
        commentHeaders.push(headers[i]);
        commentData.push(extractComments(csvData, i));
      }
    }

    return { chartHeaders, chartData, commentHeaders, commentData };
  };

  const createChartData = (csvData, columnIndex) => {
    const feedbackCounts = {
      Good: 0,
      "Very Good": 0,
      Excellent: 0,
      Average: 0,
      Poor: 0,
      Slow: 0,
      "Very Slow": 0,
      Normal: 0,
      Fast: 0,
      "Very Fast": 0,
    };

    setTotalFeedback(csvData.length);

    for (let i = 0; i < csvData.length; i++) {
      const feedback = csvData[i][columnIndex];
      if (feedbackCounts.hasOwnProperty(feedback)) {
        feedbackCounts[feedback]++;
      }
    }

    const generatedChartData = Object.entries(feedbackCounts)
      .filter(([feedback, count]) => count > 0)
      .map(([feedback, count]) => ({ feedback, count }));

    return generatedChartData;
  };

  const extractComments = (csvData, columnIndex) => {
    const extractedComments = csvData
      .map((row) => row[columnIndex])
      .filter(
        (comment) =>
          comment &&
          comment.trim() &&
          comment.trim().toLowerCase() !== "no comments" &&
          comment.trim().toLowerCase() !== "na" &&
          comment.trim().toLowerCase() !== "nothing" &&
          comment.trim().toLowerCase() !== "no" &&
          comment.trim().toLowerCase() !== "ok" &&
          comment !== "." &&
          comment !== "-" &&
          comment !== "--" &&
          comment !== ".." &&
          comment !== undefined
      );

    return extractedComments;
  };

  const printPage = () => {
    const printContents = document.getElementById("pdf").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

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
        <div className="col-md-4 justify-content-end">
          <button className="btn btn-success text-right" onClick={printPage}>
            Download
          </button>
        </div>
      </div>
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
              <h5 className="col-md-6">
                Faculty Name : {faculty}
                {/* {faculty1 === undefined || faculty1 === ""
                  ? ``
                  : `, ${faculty1}`} */}
              </h5>
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
            chartData.map((data, index) => {
              return (
                <div key={index}>
                  <PieChartComponent
                    data={chartData[index]}
                    name={chartHeaders[index]}
                  />
                </div>
              );
            })}
        </div>
        <div id="comment" className="row">
          {showData &&
            commentData.map((data, index) => {
              return (
                <div key={index} className="container col-md-10">
                  <Comments
                    comdata={commentData[index]}
                    comname={commentHeaders[index]}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PDFComponent;
