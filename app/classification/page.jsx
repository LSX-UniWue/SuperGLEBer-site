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
            <h1 className="text-5xl font-bold text-center py-5">Classification Tasks</h1>
        </article>
    )
}


function OverallTable() {

    const data = [

        {
            id: 1,
            name: "Toxic Comments",
            topic: "Toxicity",
            metric: "macro F1",
            split: "2920/ 324/ 944",
            download: "",
            more: "https://aclanthology.org/2021.germeval-1.pdf",
            license: ""
        },
        {
            id: 2,
            name: "Offensive Lang",
            topic: "Toxicity",

            metric: "macro F1",
            split: "4508/ 501/ 3398",
            download: "",
            more: "https://www.lsv.uni-saarland.de/wp-content/publications/2018/germeval2018_wiegand.pdf",
            license: ""
        },
        {
            id: 3,
            name: "DB Aspect",
            topic: "Sentiment",
            metric: "micro F1",
            split: "16200/ 1930/ 2095",
            download: "",
            more: "https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw",
            license: "CC-BY 4.0"
        },
        {
            id: 4,
            name: "Hotel Aspect",
            topic: "Sentiment",

            metric: "micro F1",
            split: "2977/ 426/ 851",
            download: "",
            more: "https://aclanthology.org/2023.konvens-main.21.pdf",
            license: ""
        },
        {
            id: 5,
            name: "Polarity",
            topic: "Sentiment",

            metric: "micro F1",
            split: "20941/ 2584/ 2566",
            download: "",
            more: "https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw",
            license: "CC-BY 4.0"
        },
        {
            id: 6,
            name: "Query-Ad",
            topic: "Matching",
            metric: "Accuracy",
            split: "9000/ 1000/ 10000",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "MIT",
        },
        {
            id: 7,
            name: "Quest. Ans.",
            topic: "Matching",

            metric: "Accuracy",
            split: "9000/ 1000/ 10000",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "MIT",
        },
        {
            id: 8,
            name: "PAWS-X",
            topic: "Matching",

            metric: "Accuracy",
            split: "49129/ 2000/ 2000",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "MIT",
        },
        {
            id: 9,
            name: "WebCAGe",
            topic: "Word Sense Disambiguation",
            metric: "micro F1",
            split: "6249/ 1032/ 2069",
            download: "",
            more: "https://aclanthology.org/E12-1039.pdf",
            license: "",
        },
        {
            id: 10,
            name: "Verbal Idioms",
            topic: "Word Sense Disambiguation",

            metric: "micro F1",
            split: "6902/ 1488/ 1511",
            download: "",
            more: "https://konvens.org/proceedings/2021/papers/KONVENS_2021_Disambiguation_ST-Shared_Task_on_the_Disambiguation_of_German_Verbal_Idioms_at_KONVENS_2021.pdf",
            license: "",
        },
        {
            id: 11,
            name: "Engaging Comments",
            topic: "Other",
            metric: "macro F1",
            split: "2920/ 324/ 944",
            download: "",
            more: "https://aclanthology.org/2021.germeval-1.pdf",
            license: "",
        },
        {
            id: 12,
            name: "FactClaiming Comments",
            topic: "Other",

            metric: "macro F1",
            split: "2920/ 324/ 944",
            download: "",
            more: "https://aclanthology.org/2021.germeval-1.pdf",
            license: "",
        },
        {
            id: 13,
            name: "News Class",
            topic: "Other",

            metric: "Accuracy",
            split: "9000/ 1000/ 10000",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "MIT",
        },
        {
            id: 14,
            name: "NLI",
            topic: "Other",

            metric: "Accuracy",
            split: "2245/ 250/ 5010",
            download: "",
            more: "https://arxiv.org/abs/2004.01401",
            license: "OANC",
        },
        {
            id: 15,
            name: "Argument Mining",
            topic: "Other",

            metric: "macro F1",
            split: "12494/ 1785/ 3570",
            download: "",
            more: "https://aclanthology.org/2021.argmining-1.9.pdf",
            license: "CC-BY-SA",
        },
        {
            id: 16,
            name: "MASSIVE: Intents",
            topic: "Other",

            metric: "micro F1",
            split: "13382/ 1487/ 1652",
            download: "",
            more: "https://aclanthology.org/2023.acl-long.235/",
            license: "CC-BY 4.0",
        },
        {
            id: 17,
            name: "Topic Relevance",
            topic: "Other",

            metric: "micro F1",
            split: "20941/ 2584/ 2566",
            download: "",
            more: "https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw",
            license: "CC-BY 4.0",
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

    // Define columns for ReactTabulator
    const tableColumns = [
        {title: "Task Name", field: "name", headerMenu: headerMenu},
        {title: "Topic", field: "topic"},

        {title: "Train/Val/Test", field: "split"},
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
