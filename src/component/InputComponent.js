import React from "react";
import { useState } from "react";
import PDFComponent from "./PDFComponent";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Instructions from "./Instructions";

//to get all required data from user
export const InputComponent = () => {
  //state to pass it as props to other component
  const [File, setFile] = useState();
  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState();
  const [batchMonth, setBatchMonth] = useState([]);
  const [batchYear, setBatchYear] = useState([]);
  const [faculty, setFaculty] = useState();
  // const [faculty1, setFaculty1] = useState();
  const [moduleco, setModuleco] = useState();

  const batchYears = generateYears();

  //list of module coordinators
  const moduleCoordinatorName = [
    { value: "Mrs. Kiran Waghmare", label: "Mrs. Kiran Waghmare" },
    { value: "Mr. Vipul Tembulwar", label: "Mr. Vipul Tembulwar" },
    { value: "Ms. Shweta Bhere", label: "Ms. Shweta Bhere" },
    { value: "Mr. Malkeet Singh", label: "Mr. Malkeet Singh" },
    { value: "Mr. Aniket Takmare", label: "Mr. Aniket Takmare" },
    { value: "Mr. Aditya Kansana", label: "Mr. Aditya Kansana" },
    { value: "Mr. Shilbhushan Khanderao", label: "Mr. Shilbhushan Khanderao" },
    { value: "Mr. Prashant Bhosale", label: "Mr. Prashant Bhosale" },
    { value: "Mr. Manoj More", label: "Mr. Manoj More" },
  ];

  //Overall Modules
  const moduleNameList = [
    { value: "Logic Building Session", label: "LBS" },
    { value: "Operating Systems", label: "OS" },
    { value: "C++ Programming", label: "CPPP" },
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

  //for select of faculty name or can create new also directly
  const facultyNameList = [
    { value: "", label: "None" },
    { value: "Mrs. Kiran Waghmare", label: "Mrs. Kiran Waghmare" },
    { value: "Mr. Shrinivas Kalewad", label: "Mr. Shrinivas Kalewad" },
    { value: "Mr. Shivnath Kumar", label: "Mr. Shivnath Kumar" },
    { value: "Mr. Sandeep Kulange", label: "Mr. Sandeep Kulange" },
    { value: "Mr. Sameer Dehadrai", label: "Mr. Sameer Dehadrai" },
    { value: "Mr. Abhishek Purohit", label: "Mr. Abhishek Purohit" },
    { value: "Mr. Santosh Mondal", label: "Mr. Santosh Mondal" },
    { value: "Mr. Vikram Sulakhe", label: "Mr. Vikram Sulakhe" },
    { value: "Mr. Vipul Tembulwar", label: "Mr. Vipul Tembulwar" },
    { value: "Mr. Mazrul Ansari", label: "Mr. Mazrul Ansari" },
    { value: "Mr. Malkeet Singh", label: "Mr. Malkeet Singh" },
    { value: "Mr. Koustav Nandi", label: "Mr. Koustav Nandi" },
    { value: "Dr. C P Johnson", label: "Dr. C P Johnson" },
    { value: "Mr. Aditya Kansana", label: "Mr. Aditya Kansana" },
  ];

  //for select batch months
  const batchMonths = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  //to genarate years for selection of years in input
  function generateYears() {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, index) => {
      const year = currentYear - index;
      return { value: year.toString(), label: year.toString() };
    });
  }

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
    <div>
      <div style={{ textAlign: "end" }}>
        <Instructions />
      </div>
      <div className="container">
        <div className="text-center">
          <h1>Feedback Generator</h1>
        </div>
        <br />
        <div className="col-md-10 mx-auto">
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
              <div className="col-sm-5">
                <Select
                  placeholder="Month"
                  options={batchMonths}
                  onChange={(event) => setBatchMonth(event.value)}
                />
              </div>
              <div className="col-sm-5">
                <Select
                  placeholder="Year"
                  options={batchYears}
                  onChange={(event) => setBatchYear(event.value)}
                />
              </div>
            </div>
            <div className="form-group row m-1">
              <label className="col-sm-2 col-form-label">Faculty Name</label>
              <div className="col-sm-10">
                <CreatableSelect
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={facultyNameList}
                  onChange={(event) => setFaculty(event.value)}
                />
              </div>
              {/* <div className="col-sm-5">
                <CreatableSelect
                  placeholder="In case of two faculties"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={facultyNameList}
                  onChange={(event) => setFaculty1(event.value)}
                />
              </div> */}
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
                  accept=".csv"
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
                  batchMonth={batchMonth}
                  batchYear={batchYear}
                  faculty={faculty}
                  // faculty1={faculty1}
                  moduleco={moduleco}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InputComponent;
