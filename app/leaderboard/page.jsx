'use client'
import React from "react";
import "tabulator-tables/dist/css/tabulator_semanticui.min.css";
import "/styles/globals.css"
import {ReactTabulator} from "react-tabulator";
import data from '/public/results.json';
import {headerMenu, useTableFilter} from "/public/utils";


export default function Leaderboard() {
    return (
        <div className="flex flex-col px-6 md:px-16 lg:px-128">
            <Intro/>
            <div className="OverallTable"
                 style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <OverallTable/>
            </div>

            <div className="ClassificationTable"
                 style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <ClassificationTable/>
            </div>
            <div className="SequenceTaggingTable"
                 style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <SequenceTaggingTable/>
            </div>

            <div className="SimilarityTable"
                 style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <SimilarityTable/>
            </div>
            <div className="QATable" style={{width: 'auto', maxWidth: '100%', margin: '0 auto', overflowX: 'auto'}}>
                <QATable/>
            </div>

        </div>
    );
}


function Intro() {
    return (
        <article className="py-10">
            <h1 className="text-5xl font-bold text-center">Leaderboard</h1>
            <p className="text-center py-5">
                Below you find the current leaderboard for the different tasks.
                The leaderboard will be updated as new results come in.
            </p>
        </article>
    )
}


function OverallTable() {
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


    const columns = [
        {
            title: "Model",
            columns: [
                {title: "Model", field: "model", headerMenu: headerMenu},
                {title: "Type", field: "model_type"},

                {title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line"},
            ],
        },
        {
            title: "Sentence Classification",
            columns: [
                {title: "Toxicity", field: "toxicity", hozAlign: "center"},
                {title: "Sentiment", field: "sentiment", hozAlign: "center"},
                {title: "Matching", field: "matching", hozAlign: "center"},
                {title: "WSD", field: "wsd", hozAlign: "center"},
                {title: "Other", field: "class_other", hozAlign: "center", cssClass: "vertical-line"},
            ],
        },
        {
            title: "Sequence Tagging",
            columns: [
                {title: "NER", field: "ner", hozAlign: "center"},
                {title: "Other", field: "tagg_other", hozAlign: "center", cssClass: "vertical-line"},
            ],
        },
        {
            title: "Doc. Emb.",
            columns: [
                {title: "Doc. Emb.", field: "doc_emb", hozAlign: "center", cssClass: "vertical-line"},
            ],
        },
        {
            title: "QA",
            columns: [
                {title: "QA", field: "qa", hozAlign: "center", cssClass: "vertical-line"},
            ],
        },
    ];


    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Overall Results</h1>
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {columns.map((columnGroup) => (
                            columnGroup.columns.map((column, columnIndex) => (
                                <option key={columnIndex} value={column.field}>
                                    {column.title}
                                </option>
                            ))
                        ))}
                    </select>

                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
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
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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
                    className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"

                >
                    Clear Filter
                </button>
            </div>

            <ReactTabulator
                data={filteredData}
                columns={columns}
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


function ClassificationTable() {
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

    const columns = [
        {
            title: "Model",
            columns: [
                {title: "Model", field: "model", headerMenu: headerMenu},
                {title: "Type", field: "model_type"},

                {title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line"},
            ]
        },
        {
            title: "Toxicity",
            columns: [
                {title: "Toxic comments", field: "toxic_comments", hozAlign: "center"},
                {title: "Offensive Language", field: "offensive_lang", hozAlign: "center", cssClass: "vertical-line"},
            ]
        },
        {
            title: "Sentiment",
            columns: [
                {title: "DB Aspect", field: "db_aspect", hozAlign: "center"},
                {title: "Hotel Aspect", field: "hotel_aspect", hozAlign: "center"},
                {title: "Polarity", field: "polarity", hozAlign: "center", cssClass: "vertical-line"},
            ]
        },
        {
            title: "Matching",
            columns: [
                {title: "Query-Ad", field: "query_ad", hozAlign: "center"},
                {title: "Quest. Ans", field: "quest_ans", hozAlign: "center"},
                {title: "PAWS-X", field: "paws_x", hozAlign: "center", cssClass: "vertical-line"},
            ]
        },
        {
            title: "WSD",
            columns: [
                {title: "WebCAGe", field: "webcage", hozAlign: "center"},
                {title: "Verbal Idioms", field: "verbal_idioms", hozAlign: "center", cssClass: "vertical-line"},
            ]
        },
        {
            title: "Other",
            columns: [
                {title: "Engaging Comments", field: "engaging_comments", hozAlign: "center"},
                {title: "FactClaiming Comments", field: "factclaiming_comments", hozAlign: "center"},
                {title: "News Class", field: "news_class", hozAlign: "center"},
                {title: "NLI", field: "nli", hozAlign: "center"},
                {title: "Argument Mining", field: "augment_mining", hozAlign: "center"},
                {title: "MASSIVE: Intents", field: "massive_intents", hozAlign: "center"},
                {title: "Top Relevance", field: "top_relevance", hozAlign: "center"},
            ]
        }
    ]
    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Classification</h1>
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {columns.map((columnGroup) => (
                            columnGroup.columns.map((column, columnIndex) => (
                                <option key={columnIndex} value={column.field}>
                                    {column.title}
                                </option>
                            ))
                        ))}
                    </select>

                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
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
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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
                    className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"

                >
                    Clear Filter
                </button>
            </div>

            <ReactTabulator
                data={filteredData}
                columns={columns}
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
    )
}


function SequenceTaggingTable() {
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

    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model", headerMenu: headerMenu},
                {title: "Type", field: "model_type"},

                {title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line"},
            ]
        },
        {
            title: "NER", columns: [

                {title: "News", field: "ner_news", hozAlign: "center"},
                {title: "EuroParl", field: "ner_europarl", hozAlign: "center"},
                {title: "BioFID", field: "ner_biofid", hozAlign: "center"},
                {title: "Wiki & News", field: "ner_wiki_news", hozAlign: "center"},
                {title: "Legal", field: "ner_legal", hozAlign: "center", cssClass: "vertical-line"},
            ]
        },

        {
            title: "Other", columns: [


                {title: "UP-POS", field: "up_pos", hozAlign: "center"},
                {title: "UP-DEP", field: "up_dep", hozAlign: "center"},
                {title: "MASSIVE", field: "seq_massive", hozAlign: "center"},
                {title: "GermEval Opinions ", field: "germeval_opinions", hozAlign: "center"},
            ]
        },


    ]

    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Sequence Tagging</h1>
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {columns.map((columnGroup) => (
                            columnGroup.columns.map((column, columnIndex) => (
                                <option key={columnIndex} value={column.field}>
                                    {column.title}
                                </option>
                            ))
                        ))}
                    </select>

                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
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
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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
                    className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"

                >
                    Clear Filter
                </button>
            </div>

            <ReactTabulator
                data={filteredData}
                columns={columns}
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

    )
}

function SimilarityTable() {
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

    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model", headerMenu: headerMenu},
                {title: "Type", field: "model_type"},

                {title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line"},
            ]
        },
        {
            title: "Sentence Similarity", columns: [

                {title: "Pawsx", field: "sim_pawsx", width: 200, hozAlign: "center"},

            ]
        },


    ]
    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Sentence Similarity</h1>
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {columns.map((columnGroup) => (
                            columnGroup.columns.map((column, columnIndex) => (
                                <option key={columnIndex} value={column.field}>
                                    {column.title}
                                </option>
                            ))
                        ))}
                    </select>

                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
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
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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
                    className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"

                >
                    Clear Filter
                </button>
            </div>

            <ReactTabulator
                data={filteredData}
                columns={columns}
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
    )
}


function QATable() {
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

    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model", headerMenu: headerMenu},
                {title: "Type", field: "model_type"},

                {title: "Setting", field: "setting", hozAlign: "left", cssClass: "vertical-line"},
            ]
        },
        {
            title: "QA", columns: [

                {
                    title: "MLQA",
                    field: "mlqa",
                    hozAlign: "center"
                },
                {title: "GermQUAD", field: "germanquad", hozAlign: "center"},


            ]
        },


    ]

    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Question Answering</h1>
            <div className="py-5 flex items-center justify-center space-x-3">
                <div className="relative">
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Field</option>
                        {columns.map((columnGroup) => (
                            columnGroup.columns.map((column, columnIndex) => (
                                <option key={columnIndex} value={column.field}>
                                    {column.title}
                                </option>
                            ))
                        ))}
                    </select>

                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
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
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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
                    className=" border border-gray-300 bg-gray-200 0 px-4 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-400"

                >
                    Clear Filter
                </button>
            </div>

            <ReactTabulator
                data={filteredData}
                columns={columns}
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

    )
}

