import React from "react";

function Comments(props) {
  const comData = props.comdata;
  const comName = props.comname;
  return (
    <div className="">
      <br />
      <h4 className="text-center" style={{ textAlign: "center" }}>
        {comName}
      </h4>
      <hr />
      <ul className="list-group" style={{ margin: 5 }}>
        {comData.map((entry, index) => (
          <li className="list-group-item text-left">{comData[index]}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
