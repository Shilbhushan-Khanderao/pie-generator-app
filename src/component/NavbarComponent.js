import React from "react";
import logo from "./image/logo.png";

function NavbarComponent() {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        background: `linear-gradient(180deg, rgba(33,133,218,1) 0%, rgba(255,255,255,1) 100%)`,
        alignItems: "flex-start",
      }}
    >
      <a className="navbar-brand">
        <img
          src={logo}
          width="250"
          height="250"
          class="d-inline-block align-top m-1 img-fluid"
          alt="logo"
        />
      </a>
      <text
        className="d-flex mx-3"
        style={{
          alignItems: "flex-start",
          position: "relative",
          alignItems: "end",
        }}
      >
        by Shilbhushan Khanderao
      </text>
    </nav>
  );
}

export default NavbarComponent;
