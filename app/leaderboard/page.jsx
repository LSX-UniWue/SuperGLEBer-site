import results from "../../public/results.json";



let FONT_HEAD = "16px"
let BORDER_RIGHT = '1px solid black'

export default function Leaderboard() {
    return (
        <div className="flex flex-col px-4 md:px-16 lg:px-128">
            <Intro/>
            <OverallTable/>
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
    const tableStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%', // Ensure table fills container


    };
    const containerStyle = {
        maxWidth: '100%',  // or set a specific maxWidth
        overflowX: 'scroll',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',

    };

    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black'// Align content in center
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };
    const midstyle = {
        ...thTdStyle,
        color: 'darkblue',
        fontWeight: 'bold',
    };


    return (
        <div className="overflow-x-auto py-5" style={containerStyle}>
            <h1 className="text-3xl font-bold text-center py-3"> Overall Results </h1>

            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>
                    <td style={{...headerStyle, textAlign: 'left'}} colSpan="2">Model</td>
                    <td className="text-center" colSpan="5"
                        style={headerStyle}>Sentence Classification
                    </td>
                    <td className="text-center" colSpan="2"
                        style={headerStyle}>Sequence Tagging
                    </td>
                    <td className="text-center" style={headerStyle}>Doc. Emb.
                    </td>
                    <td className="text-center" style={headerStyle}>QA</td>
                </tr>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder
                    </td>
                    <td className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxicity</td>
                    <td className='bg-gray-100' style={midstyle}>Sentiment</td>
                    <td className='bg-gray-100' style={midstyle}>Matching</td>
                    <td className='bg-gray-100' style={midstyle}>WSD</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={midstyle}>NER</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Doc. Emb.</td>
                    <td className='bg-gray-100' style={midstyle}>QA</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "encoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxicity}</td>
                        <td style={thTdStyle}>{row.sentiment}</td>
                        <td style={thTdStyle}>{row.matching}</td>
                        <td style={thTdStyle}>{row.wsd}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.class_other}</td>
                        <td style={thTdStyle}>{row.ner}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.tagg_other}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.doc_emb}</td>
                        <td style={thTdStyle}>{row.qa}</td>


                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder+Decoder
                    </td>
                    <td className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxicity</td>
                    <td className='bg-gray-100' style={midstyle}>Sentiment</td>
                    <td className='bg-gray-100' style={midstyle}>Matching</td>
                    <td className='bg-gray-100' style={midstyle}>WSD</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={midstyle}>NER</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Doc. Emb.</td>
                    <td className='bg-gray-100' style={midstyle}>QA</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "enc+dec").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxicity}</td>
                        <td style={thTdStyle}>{row.sentiment}</td>
                        <td style={thTdStyle}>{row.matching}</td>
                        <td style={thTdStyle}>{row.wsd}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.class_other}</td>
                        <td style={thTdStyle}>{row.ner}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.tagg_other}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.doc_emb}</td>
                        <td style={thTdStyle}>{row.qa}</td>


                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Decoder
                    </td>
                    <td className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxicity</td>
                    <td className='bg-gray-100' style={midstyle}>Sentiment</td>
                    <td className='bg-gray-100' style={midstyle}>Matching</td>
                    <td className='bg-gray-100' style={midstyle}>WSD</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={midstyle}>NER</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Doc. Emb.</td>
                    <td className='bg-gray-100' style={midstyle}>QA</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "decoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle,  textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxicity}</td>
                        <td style={thTdStyle}>{row.sentiment}</td>
                        <td style={thTdStyle}>{row.matching}</td>
                        <td style={thTdStyle}>{row.wsd}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.class_other}</td>
                        <td style={thTdStyle}>{row.ner}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.tagg_other}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.doc_emb}</td>
                        <td style={thTdStyle}>{row.qa}</td>


                    </tr>
                ))}
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={midstyle}></th>
                    <th style={{...midstyle,  textAlign: 'left'}}>Model</th>
                    <th style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting</th>

                    <td style={midstyle}>Toxicity</td>
                    <td style={midstyle}>Sentiment</td>
                    <td style={midstyle}>Matching</td>
                    <td style={midstyle}>WSD</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td style={midstyle}>NER</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Other</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Doc. Emb.</td>
                    <td style={midstyle}>QA</td>
                </tr>
                </tfoot>
                <caption className="caption-bottom">
                    Table 1: Overall leaderboard for the different tasks.
                </caption>
            </table>
        </div>
    );
}


function ClassificationTable() {
    const tableStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%', // Ensure table fills container


    };
    const containerStyle = {
        maxWidth: '100%',  // or set a specific maxWidth
        overflowX: 'scroll',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',

    };
    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black'// Align content in center
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };
    const midstyle = {
        ...thTdStyle,
        color: 'darkblue',
        fontWeight: 'bold',
    };


    return (
        <div className="overflow-x-auto py-5" style={containerStyle}>
            <h1 className="text-3xl font-bold text-center py-3"> Classification </h1>
            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>

                    <td style={{...headerStyle, textAlign: 'left'}} colSpan="2">Model</td>
                    <td className="text-center" colSpan="2"
                        style={headerStyle}>Toxicity
                    </td>
                    <td className="text-center" colSpan="3"
                        style={headerStyle}>Sentiment
                    </td>
                    <td className="text-center" colSpan="3"
                        style={headerStyle}>Matching
                    </td>
                    <td className="text-center" colSpan="2"
                        style={headerStyle}>WSD
                    </td>
                    <td className="text-center" colSpan="7" style={headerStyle}>Other</td>
                </tr>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder
                    </td>
                    <td  className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxic comments</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Offensive Lang</td>
                    <td className='bg-gray-100' style={midstyle}>DB Aspect</td>
                    <td className='bg-gray-100' style={midstyle}>Hotel Aspect</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Polarity</td>
                    <td className='bg-gray-100' style={midstyle}>Query-Ad</td>
                    <td className='bg-gray-100' style={midstyle}>Quest. Ans</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>PAWS-X</td>
                    <td className='bg-gray-100' style={midstyle}>WebCAGe</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Verbal Idioms</td>
                    <td className='bg-gray-100' style={midstyle}>Engaging Comments</td>
                    <td className='bg-gray-100' style={midstyle}>FactClaiming Comments</td>
                    <td className='bg-gray-100' style={midstyle}>News Class</td>
                    <td className='bg-gray-100' style={midstyle}>NLI</td>
                    <td className='bg-gray-100' style={midstyle}>Argument Mining</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE: Intent</td>
                    <td className='bg-gray-100' style={midstyle}>Topic Relevance</td>


                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "encoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxic_comments}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.offensive_lang}</td>
                        <td style={thTdStyle}>{row.db_aspect}</td>
                        <td style={thTdStyle}>{row.hotel_aspect}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.polarity}</td>
                        <td style={thTdStyle}>{row.query_ad}</td>
                        <td style={thTdStyle}>{row.quest_ans}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.paws_x}</td>
                        <td style={thTdStyle}>{row.webcage}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.verbal_idioms}</td>
                        <td style={thTdStyle}>{row.engaging_comments}</td>
                        <td style={thTdStyle}>{row.factclaiming_comments}</td>
                        <td style={thTdStyle}>{row.news_class}</td>
                        <td style={thTdStyle}>{row.nli}</td>
                        <td style={thTdStyle}>{row.augment_mining}</td>
                        <td style={thTdStyle}>{row.massive_intents}</td>
                        <td style={thTdStyle}>{row.top_relevance}</td>


                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder+Decoder
                    </td>
                    <td className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxic comments</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Offensive Lang</td>
                    <td className='bg-gray-100' style={midstyle}>DB Aspect</td>
                    <td className='bg-gray-100' style={midstyle}>Hotel Aspect</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Polarity</td>
                    <td className='bg-gray-100' style={midstyle}>Query-Ad</td>
                    <td className='bg-gray-100' style={midstyle}>Quest. Ans</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>PAWS-X</td>
                    <td className='bg-gray-100' style={midstyle}>WebCAGe</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Verbal Idioms</td>
                    <td className='bg-gray-100' style={midstyle}>Engaging Comments</td>
                    <td className='bg-gray-100' style={midstyle}>FactClaiming Comments</td>
                    <td className='bg-gray-100' style={midstyle}>News Class</td>
                    <td className='bg-gray-100' style={midstyle}>NLI</td>
                    <td className='bg-gray-100' style={midstyle}>Argument Mining</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE: Intent</td>
                    <td className='bg-gray-100' style={midstyle}>Topic Relevance</td>


                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "enc+dec").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxic_comments}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.offensive_lang}</td>
                        <td style={thTdStyle}>{row.db_aspect}</td>
                        <td style={thTdStyle}>{row.hotel_aspect}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.polarity}</td>
                        <td style={thTdStyle}>{row.query_ad}</td>
                        <td style={thTdStyle}>{row.quest_ans}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.paws_x}</td>
                        <td style={thTdStyle}>{row.webcage}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.verbal_idioms}</td>
                        <td style={thTdStyle}>{row.engaging_comments}</td>
                        <td style={thTdStyle}>{row.factclaiming_comments}</td>
                        <td style={thTdStyle}>{row.news_class}</td>
                        <td style={thTdStyle}>{row.nli}</td>
                        <td style={thTdStyle}>{row.augment_mining}</td>
                        <td style={thTdStyle}>{row.massive_intents}</td>
                        <td style={thTdStyle}>{row.top_relevance}</td>


                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Decoder
                    </td>
                    <td className='bg-gray-100'
                        style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting
                    </td>
                    <td className='bg-gray-100' style={midstyle}>Toxic comments</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Offensive Lang</td>
                    <td className='bg-gray-100' style={midstyle}>DB Aspect</td>
                    <td className='bg-gray-100' style={midstyle}>Hotel Aspect</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Polarity</td>
                    <td className='bg-gray-100' style={midstyle}>Query-Ad</td>
                    <td className='bg-gray-100' style={midstyle}>Quest. Ans</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>PAWS-X</td>
                    <td className='bg-gray-100' style={midstyle}>WebCAGe</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Verbal Idioms</td>
                    <td className='bg-gray-100' style={midstyle}>Engaging Comments</td>
                    <td className='bg-gray-100' style={midstyle}>FactClaiming Comments</td>
                    <td className='bg-gray-100' style={midstyle}>News Class</td>
                    <td className='bg-gray-100' style={midstyle}>NLI</td>
                    <td className='bg-gray-100' style={midstyle}>Argument Mining</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE: Intent</td>
                    <td className='bg-gray-100' style={midstyle}>Topic Relevance</td>


                </tr>

                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "decoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.toxic_comments}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.offensive_lang}</td>
                        <td style={thTdStyle}>{row.db_aspect}</td>
                        <td style={thTdStyle}>{row.hotel_aspect}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.polarity}</td>
                        <td style={thTdStyle}>{row.query_ad}</td>
                        <td style={thTdStyle}>{row.quest_ans}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.paws_x}</td>
                        <td style={thTdStyle}>{row.webcage}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.verbal_idioms}</td>
                        <td style={thTdStyle}>{row.engaging_comments}</td>
                        <td style={thTdStyle}>{row.factclaiming_comments}</td>
                        <td style={thTdStyle}>{row.news_class}</td>
                        <td style={thTdStyle}>{row.nli}</td>
                        <td style={thTdStyle}>{row.augment_mining}</td>
                        <td style={thTdStyle}>{row.massive_intents}</td>
                        <td style={thTdStyle}>{row.top_relevance}</td>


                    </tr>
                ))}
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={midstyle}></th>
                    <th style={{...midstyle, textAlign: 'left'}}>Model</th>
                    <th style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting</th>

                    <td style={midstyle}>Toxic comments</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Offensive Lang</td>
                    <td style={midstyle}>DB Aspect</td>
                    <td style={midstyle}>Hotel Aspect</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Polarity</td>
                    <td style={midstyle}>Query-Ad</td>
                    <td style={midstyle}>Quest. Ans.</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>PAWS-X</td>
                    <td style={midstyle}>WebCAGe</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Verbal Idioms</td>
                    <td style={midstyle}>Engaging Comments</td>
                    <td style={midstyle}>FactClaiming Comments</td>
                    <td style={midstyle}>News Class</td>
                    <td style={midstyle}>NLI</td>
                    <td style={midstyle}>Argument Mining</td>
                    <td style={midstyle}>MASSIVE: Intents</td>
                    <td style={midstyle}>Topic relevance</td>


                </tr>
                </tfoot>
                <caption className="caption-bottom">
                Table 2: Sentence Classification leaderboard.
                </caption>
            </table>
        </div>
    );
}

function SequenceTaggingTable() {
    const tableStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%', // Ensure table fills container


    };
    const containerStyle = {
        maxWidth: '100%',  // or set a specific maxWidth
        overflowX: 'scroll',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',

    };

    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black'// Align content in center
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };

    const midstyle = {
        ...thTdStyle,
        color: 'darkblue',
        fontWeight: 'bold',
    };


    return (
        <div className="overflow-x-auto py-5" style={containerStyle}>
            <h1 className="text-3xl font-bold text-center py-3"> Sequence Tagging </h1>

            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>

                    <td style={{...headerStyle, textAlign: 'left'}} colSpan="2">Model</td>
                    <td className="text-center" colSpan="5"
                        style={headerStyle}>NER
                    </td>
                    <td className="text-center" colSpan="4" style={headerStyle}>Other</td>

                </tr>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle,  textAlign: 'left'}}>Encoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>News</td>
                    <td className='bg-gray-100' style={midstyle}>EuroParl</td>
                    <td className='bg-gray-100' style={midstyle}>BioFID</td>
                    <td className='bg-gray-100' style={midstyle}>Wiki & News</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Legal</td>
                    <td className='bg-gray-100' style={midstyle}>UP-POS</td>
                    <td className='bg-gray-100' style={midstyle}>UP-DEP</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE</td>
                    <td className='bg-gray-100' style={midstyle}>GermEval Opinions</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "encoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle,  textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.ner_news}</td>
                        <td style={thTdStyle}>{row.ner_europarl}</td>
                        <td style={thTdStyle}>{row.ner_biofid}</td>
                        <td style={thTdStyle}>{row.ner_wiki_news}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.ner_legal}</td>
                        <td style={thTdStyle}>{row.up_pos}</td>
                        <td style={thTdStyle}>{row.up_dep}</td>
                        <td style={thTdStyle}>{row.seq_massive}</td>
                        <td style={thTdStyle}>{row.germeval_opinions}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder+Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>News</td>
                    <td className='bg-gray-100' style={midstyle}>EuroParl</td>
                    <td className='bg-gray-100' style={midstyle}>BioFID</td>
                    <td className='bg-gray-100' style={midstyle}>Wiki & News</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Legal</td>
                    <td className='bg-gray-100' style={midstyle}>UP-POS</td>
                    <td className='bg-gray-100' style={midstyle}>UP-DEP</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE</td>
                    <td className='bg-gray-100' style={midstyle}>GermEval Opinions</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "enc+dec").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.ner_news}</td>
                        <td style={thTdStyle}>{row.ner_europarl}</td>
                        <td style={thTdStyle}>{row.ner_biofid}</td>
                        <td style={thTdStyle}>{row.ner_wiki_news}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.ner_legal}</td>
                        <td style={thTdStyle}>{row.up_pos}</td>
                        <td style={thTdStyle}>{row.up_dep}</td>
                        <td style={thTdStyle}>{row.seq_massive}</td>
                        <td style={thTdStyle}>{row.germeval_opinions}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>News</td>
                    <td className='bg-gray-100' style={midstyle}>EuroParl</td>
                    <td className='bg-gray-100' style={midstyle}>BioFID</td>
                    <td className='bg-gray-100' style={midstyle}>Wiki & News</td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT}}>Legal</td>
                    <td className='bg-gray-100' style={midstyle}>UP-POS</td>
                    <td className='bg-gray-100' style={midstyle}>UP-DEP</td>
                    <td className='bg-gray-100' style={midstyle}>MASSIVE</td>
                    <td className='bg-gray-100' style={midstyle}>GermEval Opinions</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "decoder").map((row) => (
                    <tr>
                        <th></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.ner_news}</td>
                        <td style={thTdStyle}>{row.ner_europarl}</td>
                        <td style={thTdStyle}>{row.ner_biofid}</td>
                        <td style={thTdStyle}>{row.ner_wiki_news}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT}}>{row.ner_legal}</td>
                        <td style={thTdStyle}>{row.up_pos}</td>
                        <td style={thTdStyle}>{row.up_dep}</td>
                        <td style={thTdStyle}>{row.seq_massive}</td>
                        <td style={thTdStyle}>{row.germeval_opinions}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={midstyle}></th>
                    <th style={{...midstyle, textAlign: 'left'}}>Model</th>
                    <th style={{...midstyle, borderRight: BORDER_RIGHT}}>Setting</th>

                    <td style={midstyle}>News</td>
                    <td style={midstyle}>EuroParl</td>
                    <td style={midstyle}>BioFID</td>
                    <td style={midstyle}>Wiki & News</td>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT}}>Legal</td>
                    <td style={midstyle}>UP-POS</td>
                    <td style={midstyle}>UP-DEP</td>
                    <td style={midstyle}>MASSIVE</td>
                    <td style={midstyle}>GermEval Opinions</td>
                </tr>
                </tfoot>
                <caption className="caption-bottom">
                Table 3: Sequence Tagging leaderboard.
                </caption>
            </table>
        </div>
    );
}

function SimilarityTable() {
    const tableStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%', // Ensure table fills container


    };
    const containerStyle = {
        maxWidth: '100%',  // or set a specific maxWidth
        overflowX: 'scroll',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',

    };
    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black'// Align content in center
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };

    const midstyle = {
        ...thTdStyle,
        color: 'darkblue',
        fontWeight: 'bold',
    };


    return (
        <div className="overflow-x-auto py-5" style={containerStyle}>
            <h1 className="text-3xl font-bold text-center py-3"> Sentence Similarity </h1>

            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>
                    <td style={{...headerStyle, textAlign: 'left'}} colSpan='2'>Model</td>

                    <td className="text-center" style={headerStyle}>Sentence Similarity</td>

                </tr>

                </thead>
                <tbody>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT, }}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>Pawsx</td>
                </tr>

                {results.results_overall.filter((row) => row.model_type === "encoder").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.sim_pawsx}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder+Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>Pawsx</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "enc+dec").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.sim_pawsx}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>Pawsx</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "decoder").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.sim_pawsx}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={midstyle}></th>
                    <th style={{...midstyle, textAlign: 'left'}}>Model</th>
                    <td style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <th style={midstyle}>Pawsx</th>
                </tr>
                </tfoot>
                <caption className="caption-bottom">
                Table 4: Sentence Similarity leaderboard.
                </caption>
            </table>
        </div>
    );
}


function QATable() {
    const tableStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%', // Ensure table fills container


    };
    const containerStyle = {
        maxWidth: '100%',  // or set a specific maxWidth
        overflowX: 'scroll',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',

    };

    const thTdStyle = {
        padding: '12px 16px',
        fontSize: FONT_HEAD,
        textAlign: 'center',
        color: 'black'// Align content in center
    };

    const headerStyle = {
        ...thTdStyle,
        backgroundColor: 'lightgray', // Light grey background for the header
        color: 'black', // Dark text for contrast
        fontWeight: 'bold',
    };

    const midstyle = {
        ...thTdStyle,
        color: 'darkblue',
        fontWeight: 'bold',
    };


    return (
        <div className="overflow-x-auto py-5" style={containerStyle}>
            <h1 className="text-3xl font-bold text-center py-3"> Question Answering </h1>

            <table className="w-full text-sm text-gray-500" style={tableStyle}>
                <thead className="text-gray-700 bg-gray-50">
                <tr>
                    <th style={headerStyle}></th>
                    <td style={{...headerStyle, textAlign: 'left'}} colSpan="2">Model</td>
                    <td className="text-center" colSpan="2" style={headerStyle}>QA</td>

                </tr>

                </thead>
                <tbody>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle,  textAlign: 'left'}}>Encoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>MLQA</td>
                    <td className='bg-gray-100' style={midstyle}>GermQUAD</td>
                </tr>

                {results.results_overall.filter((row) => row.model_type === "encoder").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.mlqa}</td>
                        <td style={thTdStyle}>{row.germanquad}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Encoder+Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>MLQA</td>
                    <td className='bg-gray-100' style={midstyle}>GermQUAD</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "enc+dec").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.mlqa}</td>
                        <td style={thTdStyle}>{row.germanquad}</td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <td colSpan='2' className='bg-gray-100'
                        style={{...midstyle, textAlign: 'left'}}>Decoder
                    </td>
                    <td className='bg-gray-100' style={{...midstyle, borderRight: BORDER_RIGHT,}}>Setting</td>

                    <td className='bg-gray-100' style={midstyle}>MLQA</td>
                    <td className='bg-gray-100' style={midstyle}>GermQUAD</td>
                </tr>
                </thead>
                <tbody>
                {results.results_overall.filter((row) => row.model_type === "decoder").map((row) => (
                    <tr>
                        <th style={thTdStyle}></th>
                        <td style={{...thTdStyle, textAlign: 'left'}}>{row.model}</td>
                        <td style={{...thTdStyle, borderRight: BORDER_RIGHT, textAlign: 'left'}}>{row.setting}</td>

                        <td style={thTdStyle}>{row.mlqa}</td>
                        <td style={thTdStyle}>{row.germanquad}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot className="text-gray-700 bg-gray-50">
                <tr style={midstyle}>
                    <th style={midstyle}></th>
                    <th style={{...midstyle, textAlign: 'left'}}>Model</th>
                    <th style={{...midstyle, borderRight: BORDER_RIGHT }}>Setting</th>

                    <th style={midstyle}>MLQA</th>
                    <th style={midstyle}>GermQUAD</th>
                </tr>
                </tfoot>
                <caption className="caption-bottom">
                    Table 5: Question Answering leaderboard.
                </caption>
            </table>
        </div>
    );
}




