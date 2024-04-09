'use client'
import React from "react";
import 'react-tabulator/lib/styles.css';
import "tabulator-tables/dist/css/tabulator.min.css";
import {ReactTabulator} from "react-tabulator";
import data from '/public/results.json';

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

    const columns = [
        {
            title: "Model", columns: [
                {title: "Model", field: "model"},
                {title: "Setting", field: "setting", hozAlign: "left"},
            ]
        },
        {
            title: "Sentence Classification", columns: [
                {title: "Toxicity", field: "toxicity", hozAlign: "center"},
                {title: "Sentiment", field: "sentiment", hozAlign: "center"},
                {title: "Matching", field: "matching", hozAlign: "center"},
                {title: "WSD", field: "wsd", hozAlign: "center"},
                {title: "Other", field: "class_other", hozAlign: "center"},
            ]
        },
        {
            title: "Sequence Tagging", columns: [
                {title: "NER", field: "ner", hozAlign: "center"},
                {title: "Other", field: "tagg_other", hozAlign: "center"},
            ]
        },
        {
            title: "Doc. Emb.", columns: [
                {title: "Doc. Emb.", field: "doc_emb", hozAlign: "center"},
            ]
        },
        {
            title: "QA", columns: [
                {title: "QA", field: "qa", hozAlign: "center"},
            ]
        },
    ];

    return (
        <div className="overflow-x-auto py-5">
            <h1 className="text-3xl font-bold text-center py-3">Overall Results</h1>
            <ReactTabulator
                data={data}
                columns={columns}
                layout={"fitData"}
            />
        </div>
    );
}


function ClassificationTable() {
    const columns = [
        {
            title: "Model",
            columns: [
                {title: "Model", field: "model"},
                {title: "Setting", field: "setting", hozAlign: "left"},
            ]
        },
        {
            title: "Toxicity",
            columns: [
                {title: "Toxic comments", field: "toxic_comments", hozAlign: "center"},
                {title: "Offensive Language", field: "offensive_lang", hozAlign: "center"},
            ]
        },
        {
            title: "Sentiment",
            columns: [
                {title: "DB Aspect", field: "db_aspect", hozAlign: "center"},
                {title: "Hotel Aspect", field: "hotel_aspect", hozAlign: "center"},
                {title: "Polarity", field: "polarity", hozAlign: "center"},
            ]
        },
        {
            title: "Matching",
            columns: [
                {title: "Query-Ad", field: "query_ad", hozAlign: "center"},
                {title: "Quest. Ans", field: "quest_ans", hozAlign: "center"},
                {title: "PAWS-X", field: "paws_x", hozAlign: "center"},
            ]
        },
        {
            title: "WSD",
            columns: [
                {title: "WebCAGe", field: "webcage", hozAlign: "center"},
                {title: "Verbal Idioms", field: "verbal_idioms", hozAlign: "center"},
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
            <h1 className="text-3xl font-bold text-center py-3"> Classification</h1>

            <ReactTabulator
                data={data}
                columns={columns}
                layout={"fitData"}/>
        </div>
    )
}


function SequenceTaggingTable() {
    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model"},
                {title: "Setting", field: "setting", hozAlign: "left"},
            ]
        },
        {
            title: "NER", columns: [

                {title: "News", field: "ner_news", hozAlign: "center"},
                {title: "EuroParl", field: "ner_europarl", hozAlign: "center"},
                {title: "BioFID", field: "ner_biofid", hozAlign: "center"},
                {title: "Wiki & News", field: "ner_wiki_news", hozAlign: "center"},
                {title: "Legal", field: "ner_legal", hozAlign: "center"},
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
            <h1 className="text-3xl font-bold text-center py-3"> Sequence Tagging</h1>

            <ReactTabulator
                data={data}
                columns={columns}
                layout={"fitData"}/>
        </div>

    )
}

function SimilarityTable() {
    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model"},
                {title: "Setting", field: "setting", hozAlign: "left"},
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
            <h1 className="text-3xl font-bold text-center py-3"> Sentence Similarity</h1>

            <ReactTabulator
                data={data}
                columns={columns}
                layout={"fitData"}/>
        </div>
    )
}

function QATable() {
    const columns = [

        {
            title: "Model", columns: [

                {title: "Model", field: "model"},
                {title: "Setting", field: "setting", hozAlign: "left"},
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
            <h1 className="text-3xl font-bold text-center py-3"> Question Answering</h1>

            <ReactTabulator
                data={data}
                columns={columns}
                layout={"fitData"}/>
        </div>

    )
}

