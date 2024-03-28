import React from 'react';

const COLOR = "darkblue";
const FONT_SEC = "14px";
const FONT_HEAD = "16px";

export default function Leaderboard() {
    return (
        <div className="flex flex-col px-4 md:px-16 lg:px-64">
            <Intro/>
            <OverallTable/>
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
    const tableStyle = {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black',

    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };

    const rowStyle = {
        borderBottom: '1px solid #eaecef', // Light border for rows
    };

    return (
        <div className="overflow-x-auto py-5">
            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr style={rowStyle}>
                    <th style={headerStyle}></th>
                    <th style={headerStyle}>Task Name</th>
                    <th style={headerStyle}>Metric</th>
                    <th style={headerStyle}>Train/ Test</th>
                    <th style={headerStyle}>Download</th>
                    <th style={headerStyle}>More</th>
                    <th style={headerStyle}>License</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={thTdStyle}>GermanQUAD</td>
                    <td style={thTdStyle}></td>
                    <td style={thTdStyle}>11518/2204</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2021.mrqa-1.4.pdf"><i className="fa fa-info-circle"></i></a></td>
                    <td style={thTdStyle}>cc-by-4.0</td>

                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={thTdStyle}>MLQA</td>
                    <td style={thTdStyle}></td>
                    <td style={thTdStyle}>512/4517</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://arxiv.org/abs/2004.01401"><i className="fa fa-info-circle"></i></a></td>
                    <td style={thTdStyle}>CC-BY-SA 3.0</td>

                </tr>
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={thTdStyle}></th>
                    <th style={thTdStyle}>Task Name</th>
                    <th style={thTdStyle}>Metric</th>
                    <th style={thTdStyle}>Train/Test</th>
                    <th style={thTdStyle}>Download</th>
                    <th style={thTdStyle}>More</th>
                    <th style={thTdStyle}>License</th>

                </tr>
                </tfoot>
                <caption className="caption-bottom" style={{paddingTop: '8px'}}>
                    Table 1: Overview Question Answering Tasks.
                </caption>
            </table>
        </div>
    );
}
