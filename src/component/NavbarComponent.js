import React from "react";
import logo from "./image/logo.png";

function NavbarComponent() {
  return (
    <nav
      className="navbar navbar-light justify-content-center"
      style={{
        background: `linear-gradient(180deg, rgba(33,133,218,1) 0%, rgba(255,255,255,1) 100%)`,
        alignItems: "flex-start",
      }}
    >
      <img
        src={logo}
        width="250"
        height="250"
        className="d-flex align-top m-1 img-fluid "
        alt="logo"
      />
    </nav>
  );
}

export default NavbarComponent;
