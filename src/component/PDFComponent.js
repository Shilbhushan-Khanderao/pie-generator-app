import React, { useState } from "react";
import Comments from "./Comments";
import PieChartComponent from "./PieChartComponent";
import Papa from "papaparse";
import pdfMake from "pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function PDFComponent(props) {
  const [jsonData, setJsonData] = useState([]);
  const [hName, setHName] = useState([]);
  const [comdata, setComData] = useState([]);
  const [comname, setComName] = useState([]);
  const [show, setShow] = useState(false);

  let headers = [];
  let JSONdata = [];
  let headersName = [];
  let comName = [];
  let comData = [];
  let file = props.file;

  const generateChart = () => {
    setShow(true);
    Papa.parse(file, {
      complete: function (results) {
        console.log(results.data);
        createCount(results.data);
      },
    });
  };
  function createCount(d) {
    headers = d[0];

    // console.log(d);
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
      if (
        headers[i].includes("Comments") ||
        headers[i].includes("additional")
      ) {
        comName.push(headers[i]);
        comData.push(createComments(d, i));
      }
    }
    setHName(headersName);
    setJsonData(JSONdata);
    setComName(comName);
    setComData(comData);
  }

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
    console.log(generated);
    return generated;
  }

  function createComments(d, hi) {
    let arr = [];
    let generated = [];
    for (let i = 0; i < d.length; i++) {
      arr.push(d[i][hi]);

      if (
        arr[i] !== "" &&
        arr[i] !== "No" &&
        arr[i] !== "NA" &&
        arr[i] !== "Na" &&
        onlyLettersSpacesDots(arr[i])
      ) {
        generated.push(arr[i]);
      }
    }
    console.log(generated);
    return generated;
  }

  function onlyLettersSpacesDots(str) {
    return /^[a-zA-Z\s.,]+$/.test(str);
  }
  var htmlToImage = require("html-to-image");

  const PDF = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const elems = document.querySelectorAll(".pdf");
    elems.forEach(async (elem, idx) => {
      if (idx < elems.length - 1) {
        const data = await html2canvas(elem);
        const img = data.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "JPEG", 10, 10, pdfWidth, pdfHeight);
        pdf.addPage();
      } else {
        const data = await html2canvas(elem);
        const img = data.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "JPEG", 10, 10, pdfWidth, pdfHeight);
        pdf.save("Piechart.pdf");
      }
      const pdfTable = document.getElementById("comment");
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();
    });
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
          <button className="btn btn-success text-right" onClick={PDF}>
            Download
          </button>
        </div>
      </div>
      <div id="pdf" className="container" style={{}}>
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
