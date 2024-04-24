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
            <h1 className="text-5xl font-bold text-center py-5">Sequence Tagging Tasks</h1>
        </article>
    )
}


function OverallTable() {

    const data = [
        {
            id: 1,
            name: "News",
            topic: "NER",
            metric: "micro F1",
            split: "2587/ 287/ 3007",
            more: "https://arxiv.org/abs/2004.01401",
            license: "MIT"
        },
        {
            id: 2,
            name: "EuroParl",
            topic: "NER",
            metric: "micro F1",
            split: "3184/ 354/ 858",
            more: "https://nlpado.de/~sebastian/software/ner/",
            license: "GNU GPL"
        },
        {
            id: 3,
            name: "BioFID",
            topic: "NER",
            metric: "micro F1",
            split: "12668/ 1584/ 1584",
            more: "https://aclanthology.org/K19-1081.pdf",
            license: "CC-BY 4.0"
        },
        {
            id: 4,
            name: "Wiki & News",
            topic: "NER",
            metric: "micro F1",
            split: "24000/ 2200/ 5100",
            more: "http://www.lrec-conf.org/proceedings/lrec2014/pdf/276_Paper.pdf",
            license: "CC-BY"
        },
        {
            id: 5,
            name: "Legal",
            topic: "NER",
            metric: "micro F1",
            split: "53384/ 6666/ 6673",
            more: "https://github.com/elenanereiss/Legal-Entity-Recognition",
            license: "CC-BY 4.0"
        },
        {
            id: 6,
            name: "UP-POS",
            topic: "Other",
            metric: "micro F1",
            split: "14118/ 799/ 977",
            more: "https://github.com/UniversalPropositions/UP-1.0/tree/master/UP_German",
            license: "CDLA-Sharing-1.0"
        },
        {
            id: 7,
            name: "UP-DEP",
            topic: "Other",
            metric: "micro F1",
            split: "14118/ 799/ 977",
            more: "https://github.com/UniversalPropositions/UP-1.0/tree/master/UP_German",
            license: "CDLA-Sharing-1.0"
        },
        {
            id: 8,
            name: "MASSIVE",
            topic: "Other",
            metric: "micro F1",
            split: "13382/ 1487/ 1652",
            more: "https://aclanthology.org/2023.acl-long.235/",
            license: "CC-BY 4.0"
        },
        {
            id: 9,
            name: "GermEval Opinions",
            topic: "Other",
            metric: "micro F1",
            split: "19432/ 2369/ 2566",
            more: "https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw",
            license: "CC-BY 4.0"
        },

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

    const tableColumns = [
        {title: "Task Name", field: "name", headerMenu: headerMenu},
        {title: "Topic", field: "topic"},
        {title: "Metric", field: "metric"},

        {title: "Train/Val/Test", field: "split"},
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
                    paginationSize: 100,
                    paginationSizeSelector: [5, 10, 50, 100],
                    paginationSizeSelectorLayout: "dropdown",
                }}
                className="custom-table-style"
            />
        </div>
    );
}
