import React from "react";

function FooterComponent() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(33,133,218,1) 100%)",
      }}
    >
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <div class="col-md-6 d-flex align-items-center">
          © Copyright 2023 - C-DAC Mumbai (Education & Training Team). All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default FooterComponent;
