import React from "react";
import Papa from "papaparse";
import { useState } from "react";
import PieChartComponent from "./PieChartComponent";
import Comments from "./Comments";
// import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
// import ReactToPrint from "react-to-print";
// import { Document, Page } from "react-pdf";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";
export const InputComponent = () => {
  const [File, setFile] = useState();
  const [show, setShow] = useState();
  const [jsonData, setJsonData] = useState([]);
  const [hName, setHName] = useState([]);
  const [comdata, setComData] = useState([]);
  const [comname, setComName] = useState([]);

  let headers = [];
  let JSONdata = [];
  let headersName = [];
  let comName = [];
  let comData = [];

  var htmlToImage = require("html-to-image");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const csvJSON = () => {
    setShow(true);
    Papa.parse(File, {
      complete: function (results) {
        console.log("Finished:", results.data);
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

  function onlyLettersSpacesDots(str) {
    return /^[a-zA-Z\s.,]+$/.test(str);
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
    // console.log(generated);
    return generated;
  }

  // const generatePDF = () => {
  //   const pdfTable = document.getElementById("pdf");
  //   var html = htmlToPdfmake(pdfTable.innerHTML);

  //   const documentDefinition = { content: html };
  //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //   pdfMake.createPdf(documentDefinition).open();
  // };

  // const generatePDF = () => {
  //   const input = document.getElementById("pdf");
  //   const pdf = new jsPDF({ unit: "px", format: "a4", userUnit: "px" });
  //   pdf.
  //   pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
  //     pdf.save("test.pdf");
  //   });
  // };

  // const generatePDF = () => {
  //   const input = document.getElementById("pdf");
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/JPEG");
  //     var imgWidth = (canvas.width * 40) / 240;
  //     var imgHeight = (canvas.height * 70) / 240;
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     pdf.addImage(imgData, "JPEG", 1, 1, 400,400);
  //     pdf.output("dataurlnewwindow");
  //     // pdf.save("download.pdf");
  //   });
  // };

  // function h2i(){
  //   htmlToImage.toPng(elem, { quality: 0.95 }).then(function (dataUrl) {
  //     var link = document.createElement("a");
  //     link.download = "my-image-name.jpeg";
  //     const imgProps = pdf.getImageProperties(dataUrl);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(dataUrl, "PNG", 1, 25, pdfWidth, pdfHeight);

  //   });
  // }

  function createPDF() {
    let elems = document.querySelectorAll(".pdf");
    const pdf = new jsPDF();
    console.log(elems);
    elems.forEach((elem, idx) => {
      if (idx < elems.length - 1) {
        console.log("if " + idx);
        console.log("elems length " + elems.length);
        htmlToImage.toPng(elem, { quality: 0.95 }).then(function (dataUrl) {
          var link = document.createElement("a");
          console.log("inside addPage");
          link.download = "my-image-name.jpeg";
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          console.log(pdfHeight);
          console.log(pdfWidth);
          pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
          pdf.addPage();
        });
      } else {
        console.log("else " + idx);
        htmlToImage.toPng(elem, { quality: 0.95 }).then(function (dataUrl) {
          var link = document.createElement("a");
          console.log("inside Save");
          link.download = "my-image-name.jpeg";
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          console.log(pdfHeight);
          console.log(pdfWidth);
          pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
          console.log("Reached End");
          pdf.save();
        });
      }
    });
    // pdf.save();
  }
  const generatePDF = () => {
    // console.log("before");
    // createPDF(".piechart");
    // console.log("after");
    createPDF();
  };
  // console.log(document.querySelectorAll(".comment"));
  // console.log(document.querySelectorAll(".piechart"));

  // const generatePDF = () => {
  //   let elems = document.querySelectorAll(".piechart");
  //   let pdf = new jsPDF();
  //   let addPages = new Promise((resolve, reject) => {
  //     elems.forEach((elem, idx) => {
  //       // Scaling fix set scale to 2
  //       console.log(elem);
  //       html2canvas(elem, { scale: "2" }).then((canvas) => {
  //         if (idx < elems.length - 1) {
  //           console.log(idx);
  //           pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
  //           pdf.addPage();
  //         } else {
  //           pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
  //           console.log("Reached last page, completing");
  //         }
  //       });
  //       console.log("Timeout" + idx);
  //       setTimeout(resolve, 1000);
  //     });

  //     addPages.finally(() => {
  //       console.log("Saving PDF");
  //       pdf.save();
  //     });
  //   });
  // };
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
    return generated;
  }

  // console.log(comdata);
  // console.log(comname);

  return (
    <div className="container">
      <div className="text-center">
        <h1>Generate Pie Chart</h1>
        <input type="file" onChange={handleChange} />
        <button className="btn btn-primary" onClick={csvJSON}>
          Generate
        </button>
        {show && (
          <div>
            <button className="btn btn-success" onClick={generatePDF}>
              Print
            </button>
          </div>
        )}
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
};
export default InputComponent;
