import React from "react";
import { useState } from "react";
import PDFComponent from "./PDFComponent";

export const InputComponent = () => {
  const [File, setFile] = useState();
  const [show, setShow] = useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const showDiv = () => {
    setShow(true);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>Generate Pie Chart</h1>
        <input type="file" onChange={handleChange} />
        <button className="btn btn-primary" onClick={showDiv}>
          Upload
        </button>
      </div>
      <div>
        {show && (
          <div>
            <PDFComponent file={File} />
          </div>
        )}
      </div>
    </div>
  );
};
export default InputComponent;
