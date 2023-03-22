import React, { useState } from "react";
import Comments from "./Comments";
import PieChartComponent from "./PieChartComponent";
import Papa from "papaparse";

//processing of csv file, creating JSON data, generating JSON data with count
function PDFComponent(props) {
  //state to pass along component as props
  const [jsonData, setJsonData] = useState([]);
  const [hName, setHName] = useState([]);
  const [comdata, setComData] = useState([]);
  const [comname, setComName] = useState([]);
  const [show, setShow] = useState(false);

  //arrays to temporarily store data
  let headers = [];
  let JSONdata = [];
  let headersName = [];
  let comName = [];
  let comData = [];

  //input data from form elements taken from props from inputComponent
  let file = props.file;
  let batch = props.batch;
  let faculty = props.faculty;
  let faculty1 = props.faculty1;
  let moduleco = props.moduleco;
  let moduleName = props.moduleName;
  console.log(faculty1);

  //converting csv data to JSON data by papaparse library and passing that data to createCount function for further operations
  const generateChart = () => {
    setShow(true);
    Papa.parse(file, {
      complete: function (results) {
        // console.log(results.data);
        createCount(results.data);
      },
    });
  };

  //JSON data converted to count from coloumns of data and calling createData and createComments function
  function createCount(d) {
    headers = d[0];
    for (let i = 0; i < headers.length; i++) {
      if (
        headers[i].includes("Explanation") ||
        headers[i].includes("Pace") ||
        headers[i].includes("Interaction") ||
        headers[i].includes("Practical") ||
        headers[i].includes("Overall")
      ) {
        headersName.push(headers[i]);
        JSONdata.push(createData(d, i));
      }
      if (headers[i].includes("Theory") || headers[i].includes("Lab")) {
        comName.push(headers[i]);
        comData.push(createComments(d, i));
      }
      if (headers[i].includes("Comments")) {
        comName.push(headers[i]);
        comData.push(createComments(d, i));
      }
    }
    setHName(headersName);
    setJsonData(JSONdata);
    setComName(comName);
    setComData(comData);
  }

  //count is created for each coloumns with parameters and there occurence
  function createData(d, hi) {
    var gCount,
      vgCount,
      eCount,
      aCount,
      pCount,
      vsCount,
      sCount,
      nCount,
      fCount,
      vfCount;
    gCount =
      vgCount =
      eCount =
      aCount =
      pCount =
      vsCount =
      sCount =
      nCount =
      fCount =
      vfCount =
        0;

    let arr = [];
    let generated = [];

    for (let i = 0; i < d.length; i++) {
      arr.push(d[i][hi]);

      if (arr[i] === "Good") gCount++;
      if (arr[i] === "Very Good") vgCount++;
      if (arr[i] === "Excellent") eCount++;
      if (arr[i] === "Average") aCount++;
      if (arr[i] === "Poor") pCount++;
      if (arr[i] === "Very Slow") vsCount++;
      if (arr[i] === "Slow") sCount++;
      if (arr[i] === "Normal") nCount++;
      if (arr[i] === "Fast") fCount++;
      if (arr[i] === "Very Fast") vfCount++;
      if (i === d.length - 1) {
        if (eCount > 0) {
          generated.push({ fb: "Excellent", count: eCount });
        }
        if (vgCount > 0) {
          generated.push({ fb: "Very Good", count: vgCount });
        }
        if (gCount > 0) {
          generated.push({ fb: "Good", count: gCount });
        }
        if (aCount > 0) {
          generated.push({ fb: "Average", count: aCount });
        }
        if (pCount > 0) {
          generated.push({ fb: "Poor", count: pCount });
        }
        if (vfCount > 0) {
          generated.push({ fb: "Very Fast", count: vfCount });
        }
        if (fCount > 0) {
          generated.push({ fb: "Fast", count: fCount });
        }
        if (nCount > 0) {
          generated.push({ fb: "Normal", count: nCount });
        }
        if (sCount > 0) {
          generated.push({ fb: "Slow", count: sCount });
        }
        if (vsCount > 0) {
          generated.push({ fb: "Very Slow", count: vsCount });
        }
      }
    }
    // console.log(generated);
    return generated;
  }

  //to read all the comments from coloumns and push to array by excluding some values
  function createComments(d, hi) {
    let arr = [];
    let generated = [];
    for (let i = 0; i < d.length; i++) {
      arr.push(d[i][hi]);

      if (
        arr[i] !== "" &&
        arr[i] !== " " &&
        arr[i] !== "No Comments" &&
        arr[i] !== "NO Comments" &&
        arr[i] !== "NO comments" &&
        arr[i] !== "No comments" &&
        arr[i] !== "Nothing" &&
        arr[i] !== "No" &&
        arr[i] !== "NA" &&
        arr[i] !== "Na" &&
        arr[i] !== "na" &&
        arr[i] !== "no" &&
        arr[i] !== "." &&
        arr[i] !== undefined &&
        onlyLettersSpacesDots(arr[i])
      ) {
        generated.push(arr[i]);
      }
    }
    // console.log(generated);
    return generated;
  }

  //to exclude the mentioned elements if present in string
  function onlyLettersSpacesDots(str) {
    return /^[a-zA-Z\s.,]+$/.test(str);
  }

  //To print the entire generated piechart and comments data from html
  const Print = () => {
    let printContents = document.getElementById("pdf").innerHTML;
    let originalContents = document.body.innerHTML;
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
          <button className="btn btn-success text-right" onClick={Print}>
            Download
          </button>
        </div>
      </div>
      <div id="pdf" className="container">
        <div id="titles">
          {show && (
            <div className="row m-1">
              <h2 className="text-center">
                PG-DAC Module Feedback for {moduleName}
              </h2>
              <br />
              <h5 className="col-sm-6">Module Name : {moduleName}</h5>
              <h5 className="col-sm-6">Batch : {batch}</h5>
              <h5 className="col-sm-6">
                Faculty Name : {faculty}
                {faculty1 === undefined ? `` : `, ${faculty1}`}
              </h5>
              <h5 className="col-sm-6">Module Coordinator : {moduleco}</h5>
            </div>
          )}
        </div>
        <hr />
        <div id="piechart">
          {show &&
            jsonData.map(function (element, index) {
              return (
                <div key={index}>
                  <PieChartComponent
                    data={jsonData[index]}
                    name={hName[index]}
                  />
                </div>
              );
            })}
        </div>
        <div id="comment">
          {show &&
            comdata.map(function (element, index) {
              return (
                <div key={index} className="container col-md-10">
                  <Comments comdata={comdata[index]} comname={comname[index]} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default PDFComponent;
