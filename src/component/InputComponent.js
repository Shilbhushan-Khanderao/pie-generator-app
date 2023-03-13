import React from "react";
import { useState } from "react";
import PDFComponent from "./PDFComponent";
import Select from "react-select";

//to get all required data from user
export const InputComponent = () => {
  //state to pass it as props to other component
  const [File, setFile] = useState();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [moduleName, setModuleName] = useState();
  const [batch, setBatch] = useState();
  const [faculty, setFaculty] = useState();
  const [moduleco, setModuleco] = useState();

  const moduleCoordinatorName = [
    { value: "Mrs. Kiran Waghmare", label: "Mrs. Kiran Waghmare" },
    { value: "Mr. Vipul Tembulwar", label: "Mr. Vipul Tembulwar" },
    { value: "Mrs. Shweta Bhere", label: "Mrs. Shweta Bhere" },
    { value: "Mr. Malkeet Singh", label: "Mr. Malkeet Singh" },
    { value: "Mr. Aniket Takmare", label: "Mr. Aniket Takmare" },
    { value: "Mr. Aditya Kansana", label: "Mr. Aditya Kansana" },
    { value: "Mr. Shilbhushan Khanderao", label: "Mr. Shilbhushan Khanderao" },
  ];

  const moduleNameList = [
    { value: "CPOS", label: "CPOS" },
    { value: "OOPJ", label: "OOPJ" },
    { value: "ADS", label: "ADS" },
    { value: "DBT", label: "DBT" },
    { value: "WPT", label: "WPT" },
    { value: "WJP", label: "WJP" },
    { value: "SDM", label: "SDM" },
  ];

  //to set state of file uploaded
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  //to view the chart
  const showDiv = () => {
    setShow(true);
  };

  const hideDiv = () => {
    setShow(false);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>Generate Pie Chart</h1>
      </div>
      <br />
      <div>
        <form>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Title of Document</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Module Name</label>
            <div className="dropdown col-sm-10">
              <Select
                options={moduleNameList}
                onChange={(event) => setModuleName(event.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Batch</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="batch"
                placeholder="Batch"
                onChange={(event) => setBatch(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Faculty Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="faculty"
                placeholder="Faculty Name"
                onChange={(event) => setFaculty(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">
              Module Coordinater
            </label>
            <div className="dropdown col-sm-10">
              <Select
                options={moduleCoordinatorName}
                onChange={(event) => setModuleco(event.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Upload CSV File</label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="file"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <div className="form-group text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={showDiv}
            onDoubleClick={hideDiv}
          >
            Upload
          </button>
        </div>
      </div>
      <div>
        {show && (
          <div className="row">
            <div className="">
              <PDFComponent
                file={File}
                title={title}
                moduleName={moduleName}
                batch={batch}
                faculty={faculty}
                moduleco={moduleco}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default InputComponent;
