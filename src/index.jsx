// Polyfill Buffer for @react-pdf/renderer in browser environment
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
