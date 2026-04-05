import React from "react";

//to plot comments
function Comments({ comdata, comname }) {
  return (
    <div>
      <br />
      <h4 className="text-center" style={{ textAlign: "center" }}>
        {comname}
      </h4>
      <hr />
      {(comdata?.length || 0) === 0 ? (
        <p className="text-muted text-center fst-italic">
          No comments recorded for this section.
        </p>
      ) : (
        <ul style={{ margin: 5 }}>
          {comdata.map((entry, index) => (
            <li key={index} className="text-left">
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comments;
