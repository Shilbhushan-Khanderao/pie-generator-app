import React from "react";

//to plot comments
function Comments({ comdata, comname }) {
  //to check for printing condition for page break
  const shouldPageBreak = comname.toLowerCase().includes("comments")
    ? true
    : false;
  return (
    <div style={{ pageBreakBefore: shouldPageBreak ? "always" : "auto" }}>
      <br />
      <h4 className="text-center" style={{ textAlign: "center" }}>
        {comname}
      </h4>
      <hr />
      <ul style={{ margin: 5 }}>
        {comdata.map(
          (entry, index) =>
            index !== 0 && (
              <li key={index} className="text-left">
                {comdata[index]}
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Comments;
