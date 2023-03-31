import React from "react";
import { useState } from "react";
import PDFComponent from "./PDFComponent";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

//to get all required data from user
export const InputComponent = () => {
  //state to pass it as props to other component
  const [File, setFile] = useState();
  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState();
  const [batch, setBatch] = useState();
  const [faculty, setFaculty] = useState();
  const [faculty1, setFaculty1] = useState();
  const [moduleco, setModuleco] = useState();

  const moduleCoordinatorName = [
    { value: "Mrs. Kiran Waghmare", label: "Mrs. Kiran Waghmare" },
    { value: "Mrs. Nisha Karolia", label: "Mrs. Nisha Karolia" },
    { value: "Mr. Vipul Tembulwar", label: "Mr. Vipul Tembulwar" },
    { value: "Ms. Shweta Bhere", label: "Ms. Shweta Bhere" },
    { value: "Mr. Malkeet Singh", label: "Mr. Malkeet Singh" },
    { value: "Mr. Aniket Takmare", label: "Mr. Aniket Takmare" },
    { value: "Mr. Aditya Kansana", label: "Mr. Aditya Kansana" },
    { value: "Mr. Shilbhushan Khanderao", label: "Mr. Shilbhushan Khanderao" },
    { value: "Mr. Prashant Bhosale", label: "Mr. Prashant Bhosale" },
  ];

  const moduleNameList = [
    { value: "Concept of Programming & Operating Systems", label: "CPOS" },
    { value: "Object Oriented Programming with Java", label: "OOPJ" },
    { value: "Algorithm & Data Structures", label: "ADS" },
    { value: "Database Technologies", label: "DBT" },
    { value: "Web Programming Technologies", label: "WPT" },
    { value: "Web Java Programming", label: "WJP" },
    { value: "Microsoft DotNet", label: "DotNet" },
    { value: "Software Development Methodologies", label: "SDM" },
    { value: "Aptitude", label: "Aptitude" },
    { value: "Effective Communication", label: "Communication" },
  ];

  const facultyNameList = [
    { value: "", label: "None" },
    { value: "Mrs. Kiran Waghmare", label: "Mrs. Kiran Waghmare" },
    { value: "Mrs. Nisha Karolia", label: "Mrs. Nisha Karolia" },
    { value: "Mr. Shrinivas Kalewad", label: "Mr. Shrinivas Kalewad" },
    { value: "Mr. Sameer Dehadrai", label: "Mr. Sameer Dehadrai" },
    { value: "Mr. Abhishek Purohit", label: "Mr. Abhishek Purohit" },
    { value: "Mr. Vikram Sulakhe", label: "Mr. Vikram Sulakhe" },
    { value: "Mr. Vipul Tembulwar", label: "Mr. Vipul Tembulwar" },
    { value: "Mr. Mazrul Ansari", label: "Mr. Mazrul Ansari" },
    { value: "Mr. Malkeet Singh", label: "Mr. Malkeet Singh" },
    { value: "Mr. Koustav Nandi", label: "Mr. Koustav Nandi" },
    { value: "Dr. C P Johnson", label: "Dr. C P Johnson" },
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
            <div className="col-sm-5">
              <CreatableSelect
                className="basic-multi-select"
                classNamePrefix="select"
                options={facultyNameList}
                onChange={(event) => setFaculty(event.value)}
              />
            </div>
            <div className="col-sm-5">
              <CreatableSelect
                placeholder="In case of two faculties"
                className="basic-multi-select"
                classNamePrefix="select"
                options={facultyNameList}
                onChange={(event) => setFaculty1(event.value)}
              />
            </div>
          </div>
          <div className="form-group row m-1">
            <label className="col-sm-2 col-form-label">
              Module Coordinater
            </label>
            <div className="col-sm-10">
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
                moduleName={moduleName}
                batch={batch}
                faculty={faculty}
                faculty1={faculty1}
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
