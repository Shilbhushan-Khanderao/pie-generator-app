import React, { useState } from "react";
import logo from "./image/logo.png";
import SettingsPanel from "./SettingsPanel";
import { themeConfig } from "../config/themeConfig";

function NavbarComponent() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav
        style={{
          background: themeConfig.navbarGradient,
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={logo}
            alt="CDAC logo"
            style={{ height: 48, width: "auto", objectFit: "contain" }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "#0d3c72",
              letterSpacing: "0.01em",
            }}
          >
            Feedback Report Generator
          </span>
        </div>
        <button
          className="btn btn-outline-secondary btn-sm"
          title="Settings"
          onClick={() => setShowSettings(true)}
        >
          ⚙ Settings
        </button>
      </nav>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  );
}

export default NavbarComponent;
