import React from "react";

function Form() {
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
  return (
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
          <div className="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="modulename"
              placeholder="Module Name"
              onChange={(event) => setModuleName(event.target.value)}
            />
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
          <label className="col-sm-2 col-form-label">Module Coordinater</label>
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
        <div className=" from-group text-center m-1">
          <button type="submit" className="btn btn-primary" onClick={showDiv}>
            Submit
          </button>
        </div>
      </form>
      {/* <div>
          <button type="submit" className="btn btn-primary" onClick={showDiv}>
            Show
          </button>
        </div> */}
    </div>
  );
}

export default Form;
