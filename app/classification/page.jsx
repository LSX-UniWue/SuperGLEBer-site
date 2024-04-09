let COLOR = "darkblue"
let FONT_SEC = "14px"
let FONT_HEAD = "16px"
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
            <h1 className="text-5xl font-bold text-center py-5">Classification Tasks</h1>
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
        color: 'black'// Align content in center
    };



    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgrey', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };

     const footerStyle = {
        ...thTdStyle,
        backgroundColor: 'white', // Light grey background for the header
        color: 'black', // Dark text for contrast
    };
    const rowStyle = {
        borderBottom: '1px solid #eaecef', // Light border for rows
    };
    return (
        <div className="overflow-x-auto py-5 ">
            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr style={rowStyle}>
                    <th style={headerStyle}></th>
                    <th style={{...headerStyle, textAlign: 'left'}}>Task Name</th>
                    <th style={headerStyle}>Metric</th>
                    <th style={headerStyle}>Train/ Test</th>
                    <th style={headerStyle}>Download</th>
                    <th style={headerStyle}>More</th>
                    <th style={headerStyle}>License</th>

                </tr>

                </thead>
                <tbody>

                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7" style={{...thTdStyle, color:COLOR, textAlign: 'left'}}>Toxicity</th>
                </tr>

                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Toxic Comments</td>
                    <td style={thTdStyle}>macro F1</td>
                    <td style={thTdStyle}>2920/ 324/ 944</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2021.germeval-1.pdf"><i className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>

                </tr>

                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Offensive Lang</td>
                    <td style={thTdStyle}>macro F1</td>
                    <td style={thTdStyle}>4508/ 501/ 3398</td>
                    <td style={thTdStyle} className="text-center " style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://www.lsv.uni-saarland.de/wp-content/publications/2018/germeval2018_wiegand.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                </tbody>
                <thead>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7" style={{...thTdStyle, color:COLOR,textAlign: 'left'}}>Sentiment</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>DB Aspect</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>16200/ 1930/ 2095</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CC-BY 4.0</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Hotel Aspect</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>2977/ 426/ 851</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="#https://aclanthology.org/2023.konvens-main.21.pdf"><i className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Polarity</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>20941/ 2584/ 2566</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CC-BY 4.0</td>


                </tr>
                </tbody>
                <thead>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7" style={{...thTdStyle, color:COLOR, textAlign: 'left'}}>Matching</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Query-Ad</td>
                    <td style={thTdStyle}>Accuracy</td>
                    <td style={thTdStyle}>9000/ 1000/ 10000</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://microsoft.github.io/XGLUE/"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>MIT</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Quest. Ans.</td>
                    <td style={thTdStyle}>Accuracy</td>
                    <td style={thTdStyle}>9000/ 1000/ 10000</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://microsoft.github.io/XGLUE/"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>MIT</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>PAWS-X</td>
                    <td style={thTdStyle}>Accuracy</td>
                    <td style={thTdStyle}>49129/ 2000/ 2000</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://arxiv.org/abs/2004.01401"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>MIT</td>


                </tr>
                </tbody>
                <thead>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7" style={{...thTdStyle, color:COLOR, textAlign: 'left'}}>Word Sense Disambiguation</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>WebCAGe</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>6249/ 1032/ 2069</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/E12-1039.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Verbal Idioms</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>6902/ 1488/ 1511</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://konvens.org/proceedings/2021/papers/KONVENS_2021_Disambiguation_ST-Shared_Task_on_the_Disambiguation_of_German_Verbal_Idioms_at_KONVENS_2021.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                </tbody>
                <thead>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7" style={{...thTdStyle, color:COLOR, textAlign: 'left'}}>Other</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Engaging Comments</td>
                    <td style={thTdStyle}>macro F1</td>
                    <td style={thTdStyle}>2920/ 324/ 944</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2021.germeval-1.pdf"><i className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>FactClaiming Comments</td>
                    <td style={thTdStyle}>macro F1</td>
                    <td style={thTdStyle}>2920/ 324/ 944</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2021.germeval-1.pdf"><i className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>News Class</td>
                    <td style={thTdStyle}>Accuracy</td>
                    <td style={thTdStyle}>9000/ 1000/ 10000</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://arxiv.org/abs/2004.01401"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>MIT</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>NLI</td>
                    <td style={thTdStyle}>Accuracy</td>
                    <td style={thTdStyle}>2245/ 250/ 5010</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://arxiv.org/abs/2004.01401"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>OANC</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Argument Mining</td>
                    <td style={thTdStyle}>macro F1</td>
                    <td style={thTdStyle}>12494/ 1785/ 3570</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2021.argmining-1.9.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CC-BY-SA</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>MASSIVE: Intents</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>13382/ 1487/ 1652</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/2023.acl-long.235/"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>cc-by-4.0</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Topic Relevance</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>20941/ 2584/ 2566</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CC-BY 4.0</td>


                </tr>
                </tbody>
                <tfoot className="text-gray-700 bg-gray-100">
                <tr style={rowStyle}>
                    <th style={thTdStyle}></th>
                    <th style={{...thTdStyle, textAlign: 'left'}}>Task Name</th>
                    <th style={thTdStyle}>Metric</th>
                    <th style={thTdStyle}>Train/Val/Test</th>
                    <th style={thTdStyle}>Download</th>
                    <th style={thTdStyle}>More</th>
                    <th style={thTdStyle}>License</th>

                </tr>
                </tfoot>
                <caption className="caption-bottom">
                    Table 1: Overview Classification Tasks.
                </caption>
            </table>
        </div>
    );
}

