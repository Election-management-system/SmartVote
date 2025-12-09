import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ElectionProvider } from "./context/ElectionContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // ⬅ add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ElectionProvider>
          <App />
        </ElectionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
