import React from "react";
import { themeConfig } from "../config/themeConfig";

function FooterComponent() {
  return (
    <div
      style={{
        background: themeConfig.footerGradient,
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 999,
        boxShadow: "0 -2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <footer
        style={{
          padding: "10px 20px",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          fontSize: "0.82rem",
          color: "#444",
          textAlign: "center",
        }}
      >
        {themeConfig.footerText}
      </footer>
    </div>
  );
}

export default FooterComponent;
