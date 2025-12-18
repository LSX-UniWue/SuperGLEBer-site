"use client";

import { useEffect } from "react";

const darkOverrides = `
/* Lighter link color for dark mode */
.tabulator a {
  color: #93c5fd !important;
}
/* Darker progress bar background for dark mode */
.tabulator .tabulator-cell > div > div:first-child {
  background-color: #1e3a5f !important;
}
`;

export default function TabulatorDarkMode() {
  useEffect(() => {
    const applyTheme = (dark) => {
      // Apply theme CSS
      const existingLink = document.getElementById("tabulator-theme");
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement("link");
      link.id = "tabulator-theme";
      link.rel = "stylesheet";
      link.href = dark
        ? "https://unpkg.com/tabulator-tables/dist/css/tabulator_midnight.min.css"
        : "https://unpkg.com/tabulator-tables/dist/css/tabulator_semanticui.min.css";
      document.head.appendChild(link);

      // Apply dark mode overrides
      const existingOverrides = document.getElementById("tabulator-dark-overrides");
      if (dark) {
        if (!existingOverrides) {
          const style = document.createElement("style");
          style.id = "tabulator-dark-overrides";
          style.textContent = darkOverrides;
          document.body.appendChild(style);
        }
      } else {
        if (existingOverrides) {
          existingOverrides.remove();
        }
      }
    };

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(isDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return null;
}
