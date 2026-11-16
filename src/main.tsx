import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./presentation/App";
import { applyTheme, readInitialTheme } from "./presentation/theme/applyTheme";
import "./presentation/theme/global.css";

applyTheme(readInitialTheme());

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element is missing");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
