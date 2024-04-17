'use client'
import React from "react";
import "tabulator-tables/dist/css/tabulator_semanticui.min.css";
import "/styles/globals.css"
import {ReactTabulator} from "react-tabulator";
import {headerMenu, useTableFilter} from "/public/utils";

export default function Leaderboard() {
    return (
        <div className="flex flex-col px-4 md:px-16 lg:px-64">
            <Intro/>
            <div className="OverallTable"
                 style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <OverallTable/>
            </div>
        </div>
    )
};

function Intro() {
    return (
        <article className="py-10">
            <h1 className="text-5xl font-bold text-center py-5">Question Answering Tasks</h1>
        </article>
    )
}


function OverallTable() {

    const data = [
        {
            id: 1,
            name: "GermanQUAD",
            split: "11518/2204",
            download: "",
            more: "https://aclanthology.org/2021.mrqa-1.4.pdf",
            license: "cc-by-4.0"
        },
        {
            id: 2,
            name: "MLQA",
            split: "512/4517",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "CC-BY-SA 3.0"
        }

    ]
    const {
        filterField,
        setFilterField,
        filterType,
        setFilterType,
        filterValue,
        setFilterValue,
        filteredData,
        handleFilterChange,
        clearFilter
    } = useTableFilter(data);

    // Define columns for ReactTabulator
    const tableColumns = [
        {title: "Task Name", field: "name", headerMenu: headerMenu},
        {title: "Train/Test", field: "split"},
        {
            title: "Download",
            field: "download",
            hozAlign: "center",
            formatter: function (cell) {
                let url = cell.getValue();
                return `<a href="${url}" target="_blank"><i class='fa fa-download' style='color: #3c81f6;'></i></a>`;

            }
        },
        {
            title: "More",
            field: "more", hozAlign: "center",
            formatter: function (cell) {
                let url = cell.getValue();
                return `<a href="${url}" target="_blank"><i class='fa fa-info-circle' style='color: #3c81f6;'></i></a>`;

            }
        },
        {title: "License", field: "license"}

    ];


    return (
        <div className="overflow-x-auto py-5">
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {tableColumns.map((column, index) => (
                            <option key={index} value={column.field}>
                                {column.title}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.5 7l4.5 4.5L14.5 7h-9z"/>
                        </svg>
                    </div>
                </div>
                <div className="relative">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="=">=</option>
                        <option value="<">&lt;</option>
                        <option value=">">&gt;</option>
                        <option value="!=">!=</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.5 7l4.5 4.5L14.5 7h-9z"/>
                        </svg>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Value to filter"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleFilterChange();
                        }
                    }}
                    className="border border-gray-300 rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    onClick={clearFilter}
                    className="border border-gray-300 bg-gray-200 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"
                >
                    Clear Filter
                </button>
            </div>
            <ReactTabulator
                data={filteredData}
                columns={tableColumns}
                layout={"fitData"}
                options={{
                    pagination: "local",
                    paginationSize: 10,
                    paginationSizeSelector: [5, 10, 50, 100],
                    paginationSizeSelectorLayout: "dropdown",
                }}
                className="custom-table-style"
            />
        </div>
    );
}
