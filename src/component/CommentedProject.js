// const cPDF = () => {
//   const pdf = new jsPDF();
//   let elements = document.querySelectorAll(".pdf");
//   elements.forEach((elem, idx) => {
//     if (idx < elements.length - 1) {
//       console.log("if " + idx);
//       pdf.html(elem, { html2canvas: { scale: 0.57 } }).then(() => {
//         pdf.addPage();
//       });
//     } else {
//       console.log("else " + idx);
//       pdf.html(elem, { html2canvas: { scale: 0.57 } }).then(() => {
//         pdf.save();
//       });
//     }
//   });
// };

// const createPDF = () => {
//   let elems = document.querySelectorAll(".pdf");
//   const pdf = new jsPDF();
//   console.log(elems);
//   elems.forEach(async (elem, idx) => {
//     if (idx < elems.length - 1) {
//       console.log("if " + idx);
//       console.log("elems length " + elems.length);
//       await htmlToImage
//         .toPng(elem, { quality: 0.95 })
//         .then(function (dataUrl) {
//           // var link = document.createElement("a");
//           console.log("inside addPage");
//           // link.download = "my-image-name.jpeg";
//           const imgProps = pdf.getImageProperties(dataUrl);
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//           console.log(pdfHeight);
//           console.log(pdfWidth);
//           pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
//           pdf.addPage();
//         });
//     } else {
//       console.log("else " + idx);
//       await htmlToImage
//         .toPng(elem, { quality: 0.95 })
//         .then(function (dataUrl) {
//           // var link = document.createElement("a");
//           console.log("inside Save");
//           // link.download = "my-image-name.jpeg";
//           const imgProps = pdf.getImageProperties(dataUrl);
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//           console.log(pdfHeight);
//           console.log(pdfWidth);
//           pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
//           console.log("Reached End");
//           pdf.save();
//         });
//     }
//   });
//   // pdf.save();
// };

// const generatePDF = () => {
//   let elems = document.querySelectorAll(".piechart");
//   let pdf = new jsPDF();
//   let addPages = new Promise(async (resolve, reject) => {
//     elems.forEach(async (elem, idx) => {
//       // Scaling fix set scale to 2
//       console.log(elem);
//       await html2canvas(elem, { scale: "2" }).then((canvas) => {
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

//     await addPages.finally(() => {
//       console.log("Saving PDF");
//       pdf.save();
//     });
//   });
// };

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

// var htmlToImage = require("html-to-image");

// const Export2Word = (element, filename = "") => {
//   var preHtml =
//     "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
//   var postHtml = "</body></html>";
//   var html = preHtml + document.getElementById("pdf").innerHTML + postHtml;

//   var blob = new Blob(["\ufeff", html], {
//     type: "application/msword",
//   });

//   // Specify link url
//   var url =
//     "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

//   // Specify file name
//   filename = filename ? filename + ".doc" : "document.doc";

//   // Create download link element
//   var downloadLink = document.createElement("a");

//   document.body.appendChild(downloadLink);

//   if (navigator.msSaveOrOpenBlob) {
//     navigator.msSaveOrOpenBlob(blob, filename);
//   } else {
//     // Create a link to the file
//     downloadLink.href = url;

//     // Setting the file name
//     downloadLink.download = filename;

//     //triggering the function
//     downloadLink.click();
//   }

//   document.body.removeChild(downloadLink);
// };
// const PDF = () => {
//   const pdf = new jsPDF("portrait", "pt", "a4");
//   const elems = document.querySelectorAll(".pdf");
//   console.log(elems);
//   elems.forEach((elem, idx) => {
//     if (idx < elems.length - 1) {
//       const data = html2canvas(elem);
//       const img = data.toDataURL("image/png");
//       const imgProperties = pdf.getImageProperties(img);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight =
//         (imgProperties.height * pdfWidth) / imgProperties.width;
//       pdf.addImage(img, "JPEG", 5, 50, pdfWidth, pdfHeight);
//       pdf.addPage();
//       // pdf.save("Piechart.pdf");
//     } else {
//       const data = html2canvas(elem);
//       const img = data.toDataURL("image/png");
//       const imgProperties = pdf.getImageProperties(img);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight =
//         (imgProperties.height * pdfWidth) / imgProperties.width;
//       pdf.addImage(img, "JPEG", 5, 50, pdfWidth, pdfHeight);
//       pdf.save("Piechart.pdf");
//     }
//   });
//   // const pdfTable = document.getElementById("pdf");
//   // var html = htmlToPdfmake(pdfTable.innerHTML);
//   // const documentDefinition = { content: html };
//   // pdfMake.vfs = pdfFonts.pdfMake.vfs;
//   // pdfMake.createPdf(documentDefinition).open();
// };

// const createPDF = () => {
//   let elems = document.querySelectorAll(".pdf");
//   const pdf = new jsPDF();
//   console.log(elems);
//   elems.forEach(async (elem, idx) => {
//     if (idx < elems.length - 1) {
//       // console.log("if " + idx);
//       // console.log("elems length " + elems.length);
//       await htmlToImage
//         .toPng(elem, { quality: 0.95 })
//         .then(function (dataUrl) {
//           // var link = document.createElement("a");
//           // console.log("inside addPage");
//           // link.download = "my-image-name.jpeg";
//           const imgProps = pdf.getImageProperties(dataUrl);
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//           // console.log(pdfHeight);
//           // console.log(pdfWidth);
//           pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
//           pdf.addPage();
//         });
//     } else {
//       console.log("else " + idx);
//       await htmlToImage
//         .toPng(elem, { quality: 0.95 })
//         .then(function (dataUrl) {
//           // var link = document.createElement("a");
//           console.log("inside Save");
//           // link.download = "my-image-name.jpeg";
//           const imgProps = pdf.getImageProperties(dataUrl);
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//           console.log(pdfHeight);
//           console.log(pdfWidth);
//           pdf.addImage(dataUrl, "PNG", 1, 2, pdfWidth, pdfHeight);
//           console.log("Reached End");
//           pdf.save();
//         });
//     }
//   });
//   // pdf.save();
// };

// const generatePDF = () => {
//   // const input = document.getElementById("pdf");
//   const inputarr = document.querySelectorAll("pdf");
//   const pdf = new jsPDF({ unit: "px", format: "a4", userUnit: "px" });
//   inputarr.forEach((input, index) => {
//     pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {});
//   });
//   pdf.save("test.pdf");
// };

// const reportTemplateRef = useRef(null);

// const handleGeneratePdf = () => {
//   const doc = new jsPDF({
//     format: "a4",
//     unit: "px",
//   });

//   // Adding the fonts.
//   doc.setFont("Inter-Regular", "normal");

//   doc.html(reportTemplateRef.current, {
//     async callback(doc) {
//       await doc.save("document");
//     },
//   });
// };
