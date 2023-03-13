import React from "react";
import { useState } from "react";
import PDFComponent from "./PDFComponent";

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

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleClick(e) {}

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
                class="form-control"
                id="title"
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Module Name</label>
            <div className="dropdown col-sm-10">
              <select
                className="btn btn-outline"
                onChange={(event) => setModuleName(event.target.value)}
              >
                <option value="select">Select</option>
                <option value="CPOS">CPOS</option>
                <option value="oopj">OOPJ</option>
                <option value="ads">ADS</option>
                <option value="dbt">DBT</option>
                <option value="wpt">WPT</option>
                <option value="wjp">WJP</option>
                <option value="sdm">SDM</option>
              </select>
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">Batch</label>
            <div className="col-sm-10">
              <input
                type="text"
                class="form-control"
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
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="moduleco"
                placeholder="Module Coordinator"
                onChange={(event) => setModuleco(event.target.value)}
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
