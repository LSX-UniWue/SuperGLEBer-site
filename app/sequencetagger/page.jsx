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
            <h1 className="text-5xl font-bold text-center py-3">Sequence Tagging Tasks</h1>
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
        color: 'black'
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgrey',
        color: 'black',
        fontWeight: 'bold',
    };

    const footerStyle = {
        ...thTdStyle,
        backgroundColor: 'white',
        color: 'black',
    };
    const rowStyle = {
        borderBottom: '1px solid #eaecef',
    };

    return (
        <div className="overflow-x-auto py-5 ">
            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>
                    <th style={{...headerStyle, textAlign: 'left'}}>Task Name</th>
                    <th style={headerStyle}>Metric</th>
                    <th style={headerStyle}>Train/Val/Test</th>
                    <th style={headerStyle}>Download</th>
                    <th style={headerStyle}>More</th>
                    <th style={headerStyle}>License</th>


                </tr>

                </thead>
                <tbody>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7"
                        style={{...thTdStyle, color: COLOR, textAlign: 'left'}}>NER
                    </th>
                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>News</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>2587/ 287/ 3007</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://arxiv.org/abs/2004.01401"><i
                        className="fa fa-info-circle"></i></a></td>
                    <td style={thTdStyle}></td>

                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>EuroParl</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>3184/ 354/ 858</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://nlpado.de/~sebastian/software/ner/"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>GNU GPL</td>

                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>BioFID</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>12668/ 1584/ 1584</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://aclanthology.org/K19-1081.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>cc-by-4.0</td>

                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Wiki & News</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>24000/ 2200/ 5100</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="http://www.lrec-conf.org/proceedings/lrec2014/pdf/276_Paper.pdf"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CC-BY</td>

                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>Legal</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>53384/ 6666/ 6673</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://github.com/elenanereiss/Legal-Entity-Recognition"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>cc-by-4.0</td>

                </tr>

                </tbody>
                <thead>
                <tr style={rowStyle}>
                    <th className='bg-gray-100' colSpan="7"
                        style={{...thTdStyle, color: COLOR, textAlign: 'left'}}>Other
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>UP-POS</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>14118/ 799/ 977</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://github.com/UniversalPropositions/UP-1.0/tree/master/UP_German"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CDLA-Sharing-1.0</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>UP-DEP</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}>14118/ 799/ 977</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://github.com/UniversalPropositions/UP-1.0/tree/master/UP_German"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}>CDLA-Sharing-1.0</td>


                </tr>
                <tr>
                    <th style={thTdStyle}></th>
                    <td style={{...thTdStyle, textAlign: 'left'}}>MASSIVE</td>
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
                    <td style={{...thTdStyle, textAlign: 'left'}}>GermEval Opinions</td>
                    <td style={thTdStyle}>micro F1</td>
                    <td style={thTdStyle}> 19432/ 2369/ 2566</td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a href="#" download><i
                        className="fa fa-download"></i></a></td>
                    <td style={thTdStyle} className="text-center" style={{color: COLOR}}><a
                        href="https://drive.google.com/file/d/0B0IJZ0wwnhHDc1ZpcU05Mnh2N0U/view?pli=1&resourcekey=0-UfVuudnLhY8V2QZv-Cg6Mw"><i
                        className="fa fa-info-circle"></i></a>
                    </td>
                    <td style={thTdStyle}></td>

                </tr>

                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
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
                    Table 1: Overview Sequence Tagger Tasks.
                </caption>
            </table>
        </div>
    );
}

