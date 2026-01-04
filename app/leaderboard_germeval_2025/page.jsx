"use client";
import React, { useEffect } from "react";
import "/styles/globals.css";
import LeaderboardTable from "../components/LeaderboardTable";
import { headerMenu, formatter_avg } from "/public/utils";
import data from "/public/results_germeval_2025.json";

// Helper functions for rendering links
function render_team(cell) {
  const value = cell.getValue();
  const url = cell.getRow().getData().team_url;
  return url ? `<a href="${url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">🧑‍🔬 ${value}</a>` : value;
}

function render_model(cell) {
  const value = cell.getValue();
  const isUrl = value.startsWith("http");
  const href = isUrl ? value : `https://hf.co/${value}`;
  return `<a href="${href}" target="_blank" style="color: #3b82f6; text-decoration: underline;">🤖 ${value}</a>`;
}

// Formatter for score columns (blue background intensity)
const scoreFormatter = {
  formatter: formatter_avg,
  formatterParams: { min: 0, max: 1, color: "#c6dcff" },
};

export default function Leaderboard() {
  // Optional: Handle hash navigation if you still need it, otherwise this can be removed
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);
      }
    };
    handleScrollToHash();
  }, []);

  return (
    <div className="flex flex-col px-2 sm:px-6 md:px-16 lg:px-24 py-8">
      <Intro />
      <div id="germeval2025" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <GermEvalTable />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <article className="py-6 sm:py-10 px-2 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center py-3 sm:py-5">
        GermEval 2025
      </h1>

      <p className="text-center py-2 text-sm sm:text-base leading-relaxed">
        This page presents the results of our submission to the GermEval 2025 Shared Tasks,
        where we extended our <em>SuperGLEBer</em> benchmark by eight new tasks. All results displayed below are obtained from the <strong>development</strong> datasets
          and not from the official test sets.
      </p>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-center text-sm sm:text-base text-gray-700">
          Please find more information in our paper:
        <a
          href="https://aclanthology.org/2025.konvens-2.45.pdf"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📄</span>
          <span className="font-semibold text-center hover:underline">
            Die SuperGLEBer at GermEval 2025 Shared Tasks: Growing Pains - When More Isn't Always Better
          </span>
        </a>
                  </p>

      </div>
    </article>
  );
}

function GermEvalTable() {
  const columns = [
    {
      title: "Model Information",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu, formatter: render_team, width: 150 },
        { title: "Model", field: "model", formatter: render_model, width: 250 },
        { title: "Type", field: "model_type", width: 100 },
        { title: "Setting", field: "setting", hozAlign: "left", width: 100 },
      ],
    },
    {
      title: "Scores",
      columns: [
        { title: "Flausch Class.", field: "flausch_classification", hozAlign: "center", ...scoreFormatter },
        { title: "Flausch Tagging", field: "flausch_tagging", hozAlign: "center", ...scoreFormatter },
        { title: "Harmful C2A", field: "harmful_content_c2a", hozAlign: "center", ...scoreFormatter },
        { title: "Harmful DBO", field: "harmful_content_dbo", hozAlign: "center", ...scoreFormatter },
        { title: "Harmful VIO", field: "harmful_content_vio", hozAlign: "center", ...scoreFormatter },
        { title: "LLMs4Subjects", field: "llms4subjects", hozAlign: "center", ...scoreFormatter },
        { title: "SustainEval Class.", field: "sustaineval_classification", hozAlign: "center", ...scoreFormatter },
        { title: "SustainEval Reg.", field: "sustaineval_regression", hozAlign: "center", ...scoreFormatter },
      ],
    },
  ];

  // We sort by one of the columns by default, e.g., flausch_classification
  return <LeaderboardTable title="" data={data} columns={columns} sortColumn="flausch_classification" />;
}