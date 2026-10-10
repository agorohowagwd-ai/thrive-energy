import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { LanguageProvider } from "./contexts/LanguageContext";
console.log("THIS IS NEW BUILD");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);