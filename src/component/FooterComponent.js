import React from "react";

function FooterComponent() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(33,133,218,1) 100%)",
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <footer className="d-flex flex-wrap justify-content-center py-3 border-top">
        <div className=" ml-5 ">
          © Copyright 2023 - C-DAC Mumbai (Education & Training Team). All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default FooterComponent;
