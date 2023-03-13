import React from "react";

//to plot comments
function Comments(props) {

  //assigning data from props
  const comData = props.comdata;
  const comName = props.comname;
  //to check for printing condition for page break
  const ifPresent =
    comName.includes("Theory") || comName.includes("Lab") ? true : false;
  return (
    <div
      className="container"
      style={{ pageBreakBefore: ifPresent ? "always" : "auto" }}
    >
      <br />
      <h4 className="text-center" style={{ textAlign: "center" }}>
        {comName}
      </h4>
      <hr />
      <ul style={{ margin: 5 }}>
        {comData.map((entry, index) => (
          <li key={index} className="text-left">
            {comData[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
