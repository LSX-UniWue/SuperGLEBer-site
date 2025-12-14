"use client";
import React from "react";
import "tabulator-tables/dist/css/tabulator_semanticui.min.css";
import "/styles/globals.css";
import { ReactTabulator } from "react-tabulator";
import data from "/public/results.json";
import { headerMenu, useTableFilter, formatter_avg } from "/public/utils";
import { computeAverage, computeGlobalAvgClass, computeGlobalAvgSeq, computeLocalAvgClass, computeLocalAvgSeq } from "/public/averages";
import { bgBlue } from "next/dist/lib/picocolors";

export default function Leaderboard() {
  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24">
      <Intro />
      <div className="OverallTable" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <OverallTable />
      </div>

      <div className="ClassificationTable" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <ClassificationTable />
      </div>
      <div className="SequenceTaggingTable" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SequenceTaggingTable />
      </div>

      <div className="SimilarityTable" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <SimilarityTable />
      </div>
      <div className="QATable" style={{ width: "auto", maxWidth: "100%", margin: "0 auto", overflowX: "auto" }}>
        <QATable />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <article className="py-10">
      <h1 className="text-5xl font-bold text-center py-5">Leaderboard v0.9</h1>
      <p className="text-center py-7">Below you can find the paper results for the different tasks.</p>
      <p className="text-center">Note that results for tasks marked with an '*' (Hotel Aspect and WebCAGe) have been updated as rerunning, resulted in different outcomes.</p>
      <p className="text-center">
        Please be aware that this leaderboard will no longer be updated. The new version is available{" "}
        <a href="leaderboard_v1" style={{ color: "cornflowerblue" }}>
          here
        </a>
        .
      </p>
    </article>
  );
}

function OverallTable() {
  const keyRestClass = ["engaging_comments", "factclaiming_comments", "news_class", "nli", "argument_mining", "massive_intents", "topic_relevance"];
  const keyRestSeq = ["up_pos", "up_dep", "massive_seq", "germeval_opinions"];

  const class_avg = computeLocalAvgClass(data);
  const class_avg_global = computeGlobalAvgClass(class_avg, keyRestClass);

  const class_seq_avg = computeLocalAvgSeq(class_avg_global);
  const class_seq_avg_global = computeGlobalAvgSeq(class_seq_avg, keyRestSeq);

  const keyQA = ["mlqa", "germanquad"];
  const class_seq_qa_global = class_seq_avg_global.map((row) => {
    const averageQA = computeAverage(row, keyQA);

    return {
      ...row,
      averageQA: (Math.round(averageQA * 1000) / 1000).toFixed(3),
    };
  });

  const final_data = class_seq_qa_global.map((row) => {
    const averageClas = parseFloat(row.averageClas);
    const averageSeq = parseFloat(row.averageSeq);
    const averageQA = parseFloat(row.averageQA);
    const similarity_pawsx = parseFloat(row.similarity_pawsx);

    const totalValues = [averageClas, averageSeq, averageQA, similarity_pawsx];
    const globalAverage = totalValues.length > 0 ? totalValues.reduce((total, value) => total + value, 0) / totalValues.length : 0;
    return { ...row, average: (Math.round(globalAverage * 1000) / 1000).toFixed(3) };
  });
  const { filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, filteredData, handleFilterChange, clearFilter } = useTableFilter(final_data);

  const columns = [
    {
      title: "Model",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu },
        { title: "Model", field: "model" },
        { title: "Type", field: "model_type" },

        { title: "Setting", field: "setting", hozAlign: "left" },
        {
          title: "Average",
          field: "average",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },

    {
      title: "Sentence Classification",
      columns: [
        {
          title: "Toxicity",
          field: "averageToxic",
          hozAlign: "center",
          headerTooltip: "macro F1",
        },
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
    {
      title: "Sentence Similarity",
      columns: [{ title: "Sentence Similarity", field: "similarity_pawsx", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "Pearson Correlation" }],
    },
    {
      title: "QA",
      columns: [{ title: "QA", field: "averageQA", hozAlign: "center", cssClass: "vertical-line", headerTooltip: "mixed" }],
    },
  ];

  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold text-center py-3">Overall Results</h1>
      <div className="py-5 flex items-center justify-center space-x-3">
        <div className="relative">
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Select Field</option>
            {columns.map((columnGroup, groupIndex) =>
              columnGroup.columns
                ? columnGroup.columns.map((column, columnIndex) => (
                    <option key={groupIndex + "-" + columnIndex} value={column.field}>
                      {column.title}
                    </option>
                  ))
                : null
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Value to filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleFilterChange();
            }
          }}
          className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button onClick={clearFilter} className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400">
          Clear Filter
        </button>
      </div>

      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout={"fitData"}
        options={{
          pagination: "local",
          paginationSize: 100,
          paginationSizeSelector: [5, 10, 50, 100],
          paginationSizeSelectorLayout: "dropdown",
        }}
        className="custom-table-style"
      />
    </div>
  );
}

function ClassificationTable() {
  const keyRestClass = ["engaging_comments", "factclaiming_comments", "news_class", "nli", "argument_mining", "massive_intents", "topic_relevance"];

  const class_avg = computeLocalAvgClass(data);

  const class_avg_global = computeGlobalAvgClass(class_avg, keyRestClass);

  const { filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, filteredData, handleFilterChange, clearFilter } = useTableFilter(class_avg_global);

  const columns = [
    {
      title: "Model",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu },
        { title: "Model", field: "model" },
        { title: "Type", field: "model_type" },

        { title: "Setting", field: "setting", hozAlign: "left" },
        {
          title: "Average",
          field: "averageClas",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "Toxicity",
      columns: [
        { title: "Toxic comments", field: "toxic_comments", hozAlign: "center", headerTooltip: "macro F1" },
        {
          title: "Offensive Language",
          field: "offensive_lang",
          hozAlign: "center",
          headerTooltip: "macro F1",
        },
        {
          title: "Average",
          field: "averageToxic",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "Sentiment",
      columns: [
        { title: "DB Aspect", field: "db_aspect", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Hotel Aspect *", field: "hotel_aspect", hozAlign: "center", headerTooltip: "micro F1" },
        {
          title: "Polarity",
          field: "polarity",
          hozAlign: "center",
          headerTooltip: "micro F1",
        },
        {
          title: "Average",
          field: "averageSentiment",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "Matching",
      columns: [
        { title: "Query-Ad", field: "query_ad", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "Quest. Ans", field: "quest_ans", hozAlign: "center", headerTooltip: "Accuracy" },
        {
          title: "PAWS-X",
          field: "pawsx",
          hozAlign: "center",
          headerTooltip: "Accuracy",
        },
        {
          title: "Average",
          field: "averageMatching",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "WSD",
      columns: [
        { title: "WebCAGe *", field: "webcage", hozAlign: "center", headerTooltip: "micro F1" },
        {
          title: "Verbal Idioms",
          field: "verbal_idioms",
          hozAlign: "center",
          headerTooltip: "micro F1",
        },
        {
          title: "Average",
          field: "averageWSD",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "Other",
      columns: [
        { title: "Engaging Comments", field: "engaging_comments", hozAlign: "center", headerTooltip: "macro F1" },
        {
          title: "FactClaiming Comments",
          field: "factclaiming_comments",
          hozAlign: "center",
          headerTooltip: "macro F1",
        },
        { title: "News Class", field: "news_class", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "NLI", field: "nli", hozAlign: "center", headerTooltip: "Accuracy" },
        { title: "Argument Mining", field: "argument_mining", hozAlign: "center", headerTooltip: "macro F1" },
        { title: "MASSIVE: Intents", field: "massive_intents", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Topic Relevance", field: "topic_relevance", hozAlign: "center", headerTooltip: "micro F1" },
        {
          title: "Average",
          field: "averageRestClass",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
  ];
  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold text-center py-3">Classification</h1>
      <div className="py-5 flex items-center justify-center space-x-3">
        <div className="relative">
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Select Field</option>
            {columns.map((columnGroup) =>
              columnGroup.columns.map((column, columnIndex) => (
                <option key={columnIndex} value={column.field}>
                  {column.title}
                </option>
              ))
            )}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Value to filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleFilterChange();
            }
          }}
          className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button onClick={clearFilter} className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400">
          Clear Filter
        </button>
      </div>
      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout={"fitData"}
        options={{
          pagination: "local",
          paginationSize: 100,
          paginationSizeSelector: [5, 10, 50, 100],
          paginationSizeSelectorLayout: "dropdown",
        }}
        className="custom-table-style"
      />
      * Different results after rerun
    </div>
  );
}

function SequenceTaggingTable() {
  const keyRestSeq = ["up_pos", "up_dep", "massive_seq", "germeval_opinions"];

  const seq_avg = computeLocalAvgSeq(data);

  const seq_avg_global = computeGlobalAvgSeq(seq_avg, keyRestSeq);

  const { filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, filteredData, handleFilterChange, clearFilter } = useTableFilter(seq_avg_global);

  const columns = [
    {
      title: "Model",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu },
        { title: "Model", field: "model" },
        { title: "Type", field: "model_type" },

        { title: "Setting", field: "setting", hozAlign: "left" },
        {
          title: "Average",
          field: "averageSeq",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "NER",
      columns: [
        { title: "News", field: "ner_news", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "EuroParl", field: "ner_europarl", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "BioFID", field: "ner_biofid", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "Wiki & News", field: "ner_wiki_news", hozAlign: "center", headerTooltip: "micro F1" },
        {
          title: "Legal",
          field: "ner_legal",
          hozAlign: "center",
          headerTooltip: "micro F1",
        },
        {
          title: "Average",
          field: "averageNer",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },

    {
      title: "Other",
      columns: [
        { title: "UP-POS", field: "up_pos", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "UP-DEP", field: "up_dep", hozAlign: "center", headerTooltip: "micro F1" },
        { title: "MASSIVE", field: "massive_seq", hozAlign: "center", headerTooltip: "micro F1" },
        {
          title: "GermEval Opinions ",
          field: "germeval_opinions",
          hozAlign: "center",
          headerTooltip: "micro F1",
        },
        {
          title: "Average",
          field: "averageRestSeq",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold text-center py-3">Sequence Tagging</h1>
      <div className="py-5 flex items-center justify-center space-x-3">
        <div className="relative">
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Select Field</option>
            {columns.map((columnGroup) =>
              columnGroup.columns.map((column, columnIndex) => (
                <option key={columnIndex} value={column.field}>
                  {column.title}
                </option>
              ))
            )}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Value to filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleFilterChange();
            }
          }}
          className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button onClick={clearFilter} className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400">
          Clear Filter
        </button>
      </div>

      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout={"fitData"}
        options={{
          pagination: "local",
          paginationSize: 100,
          paginationSizeSelector: [5, 10, 50, 100],
          paginationSizeSelectorLayout: "dropdown",
        }}
        className="custom-table-style"
      />
    </div>
  );
}

function SimilarityTable() {
  const { filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, filteredData, handleFilterChange, clearFilter } = useTableFilter(data);

  const columns = [
    {
      title: "Model",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu },
        { title: "Model", field: "model" },
        { title: "Type", field: "model_type" },

        { title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line" },
      ],
    },
    {
      title: "Sentence Similarity",
      columns: [{ title: "Pawsx", field: "similarity_pawsx", width: 200, hozAlign: "center", headerTooltip: "Pearson Correlation" }],
    },
  ];
  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold text-center py-3">Sentence Similarity</h1>
      <div className="py-5 flex items-center justify-center space-x-3">
        <div className="relative">
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Select Field</option>
            {columns.map((columnGroup) =>
              columnGroup.columns.map((column, columnIndex) => (
                <option key={columnIndex} value={column.field}>
                  {column.title}
                </option>
              ))
            )}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Value to filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleFilterChange();
            }
          }}
          className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button onClick={clearFilter} className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400">
          Clear Filter
        </button>
      </div>

      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout={"fitData"}
        options={{
          pagination: "local",
          paginationSize: 100,
          paginationSizeSelector: [5, 10, 50, 100],
          paginationSizeSelectorLayout: "dropdown",
        }}
        className="custom-table-style"
      />
    </div>
  );
}

function QATable() {
  const keyQA = ["mlqa", "germanquad"];

  const computeDataWithAverages = data.map((row) => {
    const averageQA = computeAverage(row, keyQA);

    return {
      ...row,
      averageQA: (Math.round(averageQA * 1000) / 1000).toFixed(3),
    };
  });

  const { filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, filteredData, handleFilterChange, clearFilter } = useTableFilter(computeDataWithAverages);

  const columns = [
    {
      title: "Model",
      columns: [
        { title: "Team", field: "team", headerMenu: headerMenu },
        { title: "Model", field: "model" },

        { title: "Type", field: "model_type" },

        { title: "Setting", field: "setting", hozAlign: "left" },
        {
          title: "Average",
          field: "averageQA",
          hozAlign: "center",
          formatter: formatter_avg,
          formatterParams: {
            min: 0,
            max: 1,
            color: "#c6dcff",
          },
          cssClass: "vertical-line",
        },
      ],
    },
    {
      title: "QA",
      columns: [
        {
          title: "MLQA",
          field: "mlqa",
          hozAlign: "center",
          headerTooltip: "mean-token",
        },
        { title: "GermQUAD", field: "germanquad", hozAlign: "center", headerTooltip: "F1" },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold text-center py-3">Question Answering</h1>
      <div className="py-5 flex items-center justify-center space-x-3">
        <div className="relative">
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Select Field</option>
            {columns.map((columnGroup) =>
              columnGroup.columns.map((column, columnIndex) => (
                <option key={columnIndex} value={column.field}>
                  {column.title}
                </option>
              ))
            )}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Value to filter"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleFilterChange();
            }
          }}
          className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button onClick={clearFilter} className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400">
          Clear Filter
        </button>
      </div>

      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout={"fitData"}
        options={{
          pagination: "local",
          paginationSize: 100,
          paginationSizeSelector: [5, 10, 50, 100],
          paginationSizeSelectorLayout: "dropdown",
        }}
        className="custom-table-style"
      />
    </div>
  );
}
