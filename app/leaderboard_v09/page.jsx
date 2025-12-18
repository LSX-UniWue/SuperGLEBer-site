"use client";
import React from "react";
import "/styles/globals.css";
import LeaderboardTable from "../components/LeaderboardTable";
import { headerMenu, formatter_avg } from "/public/utils";
import { computeAverage, computeGlobalAvgClass, computeGlobalAvgSeq, computeLocalAvgClass, computeLocalAvgSeq } from "/public/averages";
import data from "/public/results.json";

const KEY_REST_CLASS = ["engaging_comments", "factclaiming_comments", "news_class", "nli", "argument_mining", "massive_intents", "topic_relevance"];
const KEY_REST_SEQ = ["up_pos", "up_dep", "massive_seq", "germeval_opinions"];
const KEY_QA = ["mlqa", "germanquad"];

const avgFormatter = {
  formatter: formatter_avg,
  formatterParams: { min: 0, max: 1, color: "#c6dcff" },
};

const modelColumns = [
  { title: "Team", field: "team", headerMenu: headerMenu },
  { title: "Model", field: "model" },
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
  return (
    <div className="flex flex-col px-2 sm:px-6 md:px-16 lg:px-24">
      <Intro />
      <div style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <OverallTable />
      </div>
      <div style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <ClassificationTable />
      </div>
      <div style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SequenceTaggingTable />
      </div>
      <div style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SimilarityTable />
      </div>
      <div style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <QATable />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <article className="py-6 sm:py-10 px-2">
      <h1 className="text-3xl sm:text-5xl font-bold text-center py-3 sm:py-5">Leaderboard v0.9</h1>
      <p className="text-center py-4 sm:py-7 text-sm sm:text-base">Below you can find the paper results for the different tasks.</p>
      <p className="text-center text-sm sm:text-base">Note that results for tasks marked with an '*' (Hotel Aspect and WebCAGe) have been updated as rerunning, resulted in different outcomes.</p>
      <p className="text-center text-sm sm:text-base">
        Please be aware that this leaderboard will no longer be updated. The new version is available{" "}
        <a href="leaderboard_v1" style={{ color: "cornflowerblue" }}>here</a>.
      </p>
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

  return <LeaderboardTable title="Overall Results" data={computeOverallData()} columns={columns} paginationSize={100} />;
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
        { title: "Hotel Aspect *", field: "hotel_aspect", hozAlign: "center", headerTooltip: "micro F1" },
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
        { title: "WebCAGe *", field: "webcage", hozAlign: "center", headerTooltip: "micro F1" },
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

  return (
    <div>
      <LeaderboardTable title="Classification" data={computeClassificationData()} columns={columns} paginationSize={100} />
      <p className="text-center text-sm">* Different results after rerun</p>
    </div>
  );
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

  return <LeaderboardTable title="Sequence Tagging" data={computeSequenceData()} columns={columns} paginationSize={100} />;
}

function SimilarityTable() {
  const columns = [
    { title: "Model", columns: [...modelColumns.slice(0, -1), { ...modelColumns[3], cssClass: "vertical-line" }] },
    { title: "Sentence Similarity", columns: [{ title: "Pawsx", field: "similarity_pawsx", width: 200, hozAlign: "center", headerTooltip: "Pearson Correlation" }] },
  ];

  return <LeaderboardTable title="Sentence Similarity" data={data} columns={columns} paginationSize={100} />;
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

  return <LeaderboardTable title="Question Answering" data={computeQAData()} columns={columns} paginationSize={100} />;
}
