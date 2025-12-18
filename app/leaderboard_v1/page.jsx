"use client";
import React, { useState, useEffect } from "react";
import "/styles/globals.css";
import LeaderboardTable from "../components/LeaderboardTable";
import { headerMenu, formatter_avg } from "/public/utils";
import { computeAverage, computeGlobalAvgClass, computeGlobalAvgSeq, computeLocalAvgClass, computeLocalAvgSeq } from "/public/averages";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import data from "/public/results_new.json";

const KEY_REST_CLASS = ["engaging_comments", "factclaiming_comments", "news_class", "nli", "argument_mining", "massive_intents", "topic_relevance"];
const KEY_REST_SEQ = ["up_pos", "up_dep", "massive_seq", "germeval_opinions"];
const KEY_QA = ["mlqa", "germanquad"];

function render_team(cell) {
  const value = cell.getValue();
  const url = cell.getRow().getData().team_url;
  return url ? `<a href="${url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">🧑‍🔬 ${value}</a>` : value;
}

function render_model(cell) {
  const value = cell.getValue();
  return `<a href="https://hf.co/${value}" target="_blank" style="color: #3b82f6; text-decoration: underline;">🤖 ${value}</a>`;
}

const avgFormatter = {
  formatter: formatter_avg,
  formatterParams: { min: 0, max: 1, color: "#c6dcff" },
};

const modelColumns = [
  { title: "Team", field: "team", headerMenu: headerMenu, formatter: render_team },
  { title: "Model", field: "model", formatter: render_model },
  { title: "Type", field: "model_type" },
  { title: "Setting", field: "setting", hozAlign: "left" },
];

function computeOverallData() {
  const classAvg = computeLocalAvgClass(data);
  const classAvgGlobal = computeGlobalAvgClass(classAvg, KEY_REST_CLASS);
  const seqAvg = computeLocalAvgSeq(classAvgGlobal);
  const seqAvgGlobal = computeGlobalAvgSeq(seqAvg, KEY_REST_SEQ);

  const withQA = seqAvgGlobal.map((row) => ({
    ...row,
    averageQA: (Math.round(computeAverage(row, KEY_QA) * 1000) / 1000).toFixed(3),
  }));

  return withQA.map((row) => {
    const values = [parseFloat(row.averageClas), parseFloat(row.averageSeq), parseFloat(row.averageQA), parseFloat(row.similarity_pawsx)];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { ...row, average: (Math.round(avg * 1000) / 1000).toFixed(3) };
  });
}

function computeClassificationData() {
  const classAvg = computeLocalAvgClass(data);
  return computeGlobalAvgClass(classAvg, KEY_REST_CLASS);
}

function computeSequenceData() {
  const seqAvg = computeLocalAvgSeq(data);
  return computeGlobalAvgSeq(seqAvg, KEY_REST_SEQ);
}

function computeQAData() {
  return data.map((row) => ({
    ...row,
    averageQA: (Math.round(computeAverage(row, KEY_QA) * 1000) / 1000).toFixed(3),
  }));
}

export default function Leaderboard() {
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
    window.addEventListener("hashchange", handleScrollToHash);
    return () => window.removeEventListener("hashchange", handleScrollToHash);
  }, []);

  return (
    <div className="flex flex-col px-2 sm:px-6 md:px-16 lg:px-24">
      <Intro />
      <div id="modelparamsplot" style={{ width: "auto", height: 600, maxWidth: "100%", margin: "0 auto" }}>
        <h2 className="text-xl sm:text-3xl font-bold text-center py-3">Model Performance vs Parameter Count</h2>
        <ModelParamsPlot />
      </div>

      <div id="overall" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <OverallTable />
      </div>
      <div id="classification" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <ClassificationTable />
      </div>
      <div id="sequence-tagging" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SequenceTaggingTable />
      </div>
      <div id="similarity" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SimilarityTable />
      </div>
      <div id="qa" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <QATable />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <article className="py-6 sm:py-10 px-2">
      <h1 className="text-3xl sm:text-5xl font-bold text-center py-3 sm:py-5">Leaderboard v1</h1>
      <p className="text-center py-4 sm:py-7 text-sm sm:text-base">Below you can find the current leaderboard for the different tasks.</p>
      <p className="text-center text-sm sm:text-base">
        Compared to the previous{" "}
        <a href="leaderboard_v09" style={{ color: "cornflowerblue" }}>v0.9 version</a>{" "}
        used in our paper, we updated several packages to more recent versions leading to different results. All tasks and settings remain the same.
      </p>
      <p className="text-center text-sm sm:text-base">The leaderboard will be updated as new results come in.</p>
    </article>
  );
}

function OverallTable() {
  const columns = [
    {
      title: "Model",
      columns: [...modelColumns, { title: "Average", field: "average", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" }],
    },
    {
      title: "Sentence Classification",
      columns: [
        { title: "Toxicity", field: "averageToxic", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "Sentiment", field: "averageSentiment", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Matching", field: "averageMatching", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "WSD", field: "averageWSD", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Other", field: "averageRestClass", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "mixed" },
      ],
    },
    {
      title: "Sequence Tagging",
      columns: [
        { title: "NER", field: "averageNer", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Other", field: "averageRestSeq", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "mixed" },
      ],
    },
    { title: "Sentence Similarity", columns: [{ title: "Sentence Similarity", field: "similarity_pawsx", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "Pearson Correlation" }] },
    { title: "QA", columns: [{ title: "QA", field: "averageQA", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "mixed" }] },
  ];

  return <LeaderboardTable title="Overall Results" data={computeOverallData()} columns={columns} sortColumn="average" />;
}

function ClassificationTable() {
  const columns = [
    {
      title: "Model",
      columns: [...modelColumns, { title: "Average", field: "averageClas", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" }],
    },
    {
      title: "Toxicity",
      columns: [
        { title: "Toxic comments", field: "toxic_comments", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "Offensive Language", field: "offensive_lang", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "Average", field: "averageToxic", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
    {
      title: "Sentiment",
      columns: [
        { title: "DB Aspect", field: "db_aspect", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Hotel Aspect", field: "hotel_aspect", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Polarity", field: "polarity", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Average", field: "averageSentiment", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
    {
      title: "Matching",
      columns: [
        { title: "Query-Ad", field: "query_ad", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "Quest. Ans", field: "quest_ans", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "PAWS-X", field: "pawsx", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "Average", field: "averageMatching", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
    {
      title: "WSD",
      columns: [
        { title: "WebCAGe", field: "webcage", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Verbal Idioms", field: "verbal_idioms", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Average", field: "averageWSD", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
    {
      title: "Other",
      columns: [
        { title: "Engaging Comments", field: "engaging_comments", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "FactClaiming Comments", field: "factclaiming_comments", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "News Class", field: "news_class", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "NLI", field: "nli", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "Argument Mining", field: "argument_mining", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "MASSIVE: Intents", field: "massive_intents", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Topic Relevance", field: "topic_relevance", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Average", field: "averageRestClass", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
  ];

  return <LeaderboardTable title="Classification" data={computeClassificationData()} columns={columns} sortColumn="averageClas" />;
}

function SequenceTaggingTable() {
  const columns = [
    {
      title: "Model",
      columns: [...modelColumns, { title: "Average", field: "averageSeq", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" }],
    },
    {
      title: "NER",
      columns: [
        { title: "News", field: "ner_news", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "EuroParl", field: "ner_europarl", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "BioFID", field: "ner_biofid", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Wiki & News", field: "ner_wiki_news", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Legal", field: "ner_legal", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Average", field: "averageNer", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
    {
      title: "Other",
      columns: [
        { title: "UP-POS", field: "up_pos", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "UP-DEP", field: "up_dep", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "MASSIVE", field: "massive_seq", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "GermEval Opinions", field: "germeval_opinions", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Average", field: "averageRestSeq", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" },
      ],
    },
  ];

  return <LeaderboardTable title="Sequence Tagging" data={computeSequenceData()} columns={columns} sortColumn="averageSeq" />;
}

function SimilarityTable() {
  const columns = [
    { title: "Model", columns: [...modelColumns.slice(0, -1), { ...modelColumns[3], cssClass: "vertical-line" }] },
    { title: "Sentence Similarity", columns: [{ title: "Pawsx", field: "similarity_pawsx", width: 200, hozAlign: "center", headerTooltip: "Pearson Correlation" }] },
  ];

  return <LeaderboardTable title="Sentence Similarity" data={data} columns={columns} sortColumn="similarity_pawsx" />;
}

function QATable() {
  const columns = [
    {
      title: "Model",
      columns: [...modelColumns, { title: "Average", field: "averageQA", hozAlign: "center", ...avgFormatter, cssClass: "vertical-line" }],
    },
    {
      title: "QA",
      columns: [
        { title: "MLQA", field: "mlqa", hozAlign: "center", headerTooltip: "mean-token" },
        { title: "GermQUAD", field: "germanquad", hozAlign: "center", headerTooltip: "F1" },
      ],
    },
  ];

  return <LeaderboardTable title="Question Answering" data={computeQAData()} columns={columns} sortColumn="averageQA" />;
}

function ModelParamsPlot() {
  const [plotType, setPlotType] = useState("overall");

  const prepareData = () => {
    const classAvg = computeLocalAvgClass(data);
    const classAvgGlobal = computeGlobalAvgClass(classAvg, KEY_REST_CLASS);
    const seqAvg = computeLocalAvgSeq(classAvgGlobal);
    const seqAvgGlobal = computeGlobalAvgSeq(seqAvg, KEY_REST_SEQ);

    return seqAvgGlobal.map((row) => {
      const paramStr = row.num_params ? row.num_params.toString() : "0";
      const params = parseInt(paramStr.replace(/\./g, ""));
      const averageClas = parseFloat(row.averageClas);
      const averageSeq = parseFloat(row.averageSeq);
      const averageQA = computeAverage(row, KEY_QA);
      const similarityScore = parseFloat(row.similarity_pawsx);
      const totalValues = [averageClas, averageSeq, averageQA, similarityScore].filter((v) => !isNaN(v));
      const overallAverage = totalValues.length > 0 ? totalValues.reduce((a, b) => a + b, 0) / totalValues.length : 0;

      return {
        name: row.model,
        team: row.team,
        type: row.model_type,
        setting: row.setting,
        params,
        overall: overallAverage,
        classification: averageClas,
        sequenceTagging: averageSeq,
        qa: averageQA,
        similarity: similarityScore,
      };
    });
  };

  const plotData = prepareData();
  const validParams = plotData.filter((d) => !isNaN(d.params) && d.params > 0).map((d) => d.params);
  const minParams = validParams.length > 0 ? Math.min(...validParams) : 1000000;
  const maxParams = validParams.length > 0 ? Math.max(...validParams) : 1000000000;
  const xMin = Math.max(minParams * 0.5, 100000);
  const xMax = maxParams * 1.2;

  const getMarkerColor = (type) => {
    const colors = { encoder: "#8884d8", decoder: "#82ca9d", "enc+dec": "#ffc658" };
    return colors[type] || "#ff7300";
  };

  const getYValue = (entry) => {
    const map = { classification: entry.classification, sequenceTagging: entry.sequenceTagging, qa: entry.qa, similarity: entry.similarity };
    return map[plotType] ?? entry.overall;
  };

  const validPlotData = plotData.filter((d) => !isNaN(d.params) && d.params > 0 && !isNaN(getYValue(d)));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-base-100 text-base-content p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
          <p className="font-bold">{d.name}</p>
          <p>Team: {d.team}</p>
          <p>Type: {d.type}</p>
          <p>Parameters: {d.params.toLocaleString()}</p>
          <p>Setting: {d.setting}</p>
          <p className="font-semibold mt-2">Scores:</p>
          <p>Overall: {d.overall.toFixed(3)}</p>
          <p>Classification: {d.classification}</p>
          <p>Sequence Tagging: {d.sequenceTagging}</p>
          <p>QA: {d.qa.toFixed(3)}</p>
          <p>Similarity: {d.similarity}</p>
        </div>
      );
    }
    return null;
  };

  const plotTypes = ["overall", "classification", "sequenceTagging", "qa", "similarity"];
  const plotLabels = { overall: "Overall", classification: "Classification", sequenceTagging: "Seq. Tagging", qa: "QA", similarity: "Similarity" };

  return (
    <>
      <div className="flex justify-center mb-4 px-2">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-0 sm:inline-flex sm:rounded-md sm:shadow-sm" role="group">
          {plotTypes.map((type, idx) => (
            <button
              key={type}
              onClick={() => setPlotType(type)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium border ${plotType === type ? "bg-blue-500 text-white" : "bg-base-100 text-base-content"} rounded-lg sm:rounded-none ${idx === 0 ? "sm:rounded-l-lg" : ""} ${idx === plotTypes.length - 1 ? "sm:rounded-r-lg" : ""} ${idx > 0 ? "sm:border-l-0" : ""}`}
            >
              {plotLabels[type]}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="params"
            name="Parameters"
            domain={[xMin, xMax]}
            scale="log"
            label={{ value: "Number of Parameters (log scale)", position: "bottom", offset: 15 }}
            tickFormatter={(value) => {
              if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
              if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
              if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
              return value;
            }}
            ticks={[1e8, 3e8, 1e9, 3e9, 7e9]}
          />
          <YAxis
            type="number"
            dataKey={getYValue}
            name="Score"
            domain={[0, 1]}
            label={{ value: plotLabels[plotType] + " Score", angle: -90, position: "insideLeft" }}
            ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {["encoder", "decoder", "enc+dec"].map((type) => (
            <Scatter
              key={type}
              name={type === "enc+dec" ? "Encoder-Decoder" : type.charAt(0).toUpperCase() + type.slice(1)}
              data={validPlotData.filter((d) => d.type === type)}
              fill={getMarkerColor(type)}
              shape={type === "encoder" ? "circle" : type === "decoder" ? "triangle" : "square"}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}
