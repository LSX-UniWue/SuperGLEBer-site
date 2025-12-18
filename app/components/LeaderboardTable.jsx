"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTableFilter } from "/public/utils";

const ReactTabulator = dynamic(
  () => import("react-tabulator").then((mod) => mod.ReactTabulator),
  { ssr: false, loading: () => <div>Loading table...</div> }
);

function FilterControls({ columns, filterField, setFilterField, filterType, setFilterType, filterValue, setFilterValue, handleFilterChange, clearFilter }) {
  const flatColumns = columns.flatMap((group) =>
    group.columns ? group.columns.map((col) => ({ field: col.field, title: col.title })) : []
  );

  return (
    <div className="py-3 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 px-2 sm:px-0">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="w-full appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="">Select Field</option>
            {flatColumns.map((col, idx) => (
              <option key={idx} value={col.field}>
                {col.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>

        <div className="relative w-16">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full appearance-none border border-gray-300 rounded-md pl-3 pr-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="!=">!=</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
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
          className="flex-1 sm:flex-none border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          onClick={clearFilter}
          className="border border-gray-300 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400 text-sm whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default function LeaderboardTable({ title, data, columns, sortColumn, paginationSize = 10 }) {
  const {
    filterField,
    setFilterField,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    filteredData,
    handleFilterChange,
    clearFilter,
  } = useTableFilter(data);

  const options = {
    pagination: "local",
    paginationSize,
    paginationSizeSelector: [5, 10, 50, 100],
    paginationSizeSelectorLayout: "dropdown",
    ...(sortColumn && { initialSort: [{ column: sortColumn, dir: "desc" }] }),
  };

  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-xl sm:text-3xl font-bold text-center py-3">{title}</h1>
      <FilterControls
        columns={columns}
        filterField={filterField}
        setFilterField={setFilterField}
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
      />
      <ReactTabulator
        data={filteredData}
        columns={columns}
        layout="fitData"
        options={options}
        className="custom-table-style"
      />
    </div>
  );
}
