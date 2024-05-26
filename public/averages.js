import data from "./results.json";

export const computeAverage = (row, keys) => {
    const scores = keys
        .map(key => parseFloat(row[key]))
        .filter(value => !isNaN(value));

    return scores.length > 0
        ? (scores.reduce((total, score) => total + score, 0) / scores.length)
        : 0;
};


export const computeLocalAvgClass = (data) => {
    const keyToxic = ['toxic_comments', 'offensive_lang']
    const keySentiment = ['db_aspect', 'hotel_aspect', 'polarity']
    const keyMatching = ['query_ad', 'quest_ans', 'pawsx' ]
    const keyWSD = ['webcage', 'verbal_idioms']
    const keyRestClass = ['engaging_comments', 'factclaiming_comments', 'news_class', 'nli', 'argument_mining', 'massive_intents', 'topic_relevance']

    return data.map(row => {
        const averageToxic = computeAverage(row, keyToxic);
        const averageSentiment = computeAverage(row, keySentiment);
        const averageMatching = computeAverage(row, keyMatching);
        const averageWSD = computeAverage(row, keyWSD);
        const averageRestClass = computeAverage(row, keyRestClass)
        return {
            ...row,
            averageToxic: (Math.round(averageToxic * 1000) / 1000).toFixed(3),
            averageSentiment: (Math.round(averageSentiment * 1000) / 1000).toFixed(3),
            averageMatching: (Math.round(averageMatching * 1000) / 1000).toFixed(3),
            averageWSD: (Math.round(averageWSD * 1000) / 1000).toFixed(3),
            averageRestClass: (Math.round(averageRestClass * 1000) / 1000).toFixed(3)

        };
    });
};

export const computeGlobalAvgClass = (data, keyRestClass) => {
    return data.map(row => {
        const averageToxic = parseFloat(row.averageToxic);
        const averageSentiment = parseFloat(row.averageSentiment);
        const averageMatching = parseFloat(row.averageMatching);
        const averageWSD = parseFloat(row.averageWSD);

        const restValues = keyRestClass.map(key => parseFloat(row[key])).filter(value => !isNaN(value));

        const totalValues = [averageToxic, averageSentiment, averageMatching, averageWSD, ...restValues];
        const globalAverage = totalValues.length > 0
            ? (totalValues.reduce((total, value) => total + value, 0) / totalValues.length)
            : 0;
        return { ...row, averageClas: (Math.round(globalAverage * 1000) / 1000).toFixed(3) };
    });
};



export const computeLocalAvgSeq = (data) => {
    const keyNer = ['ner_news', 'ner_europarl', 'ner_biofid', 'ner_wiki_news', 'ner_legal']
    const keyRestSeq = ['up_pos', 'up_dep', 'massive_seq', 'germeval_opinions']

    return data.map(row => {
        const averageNer = computeAverage(row, keyNer);
        const averageRestSeq= computeAverage(row, keyRestSeq)
        return {
            ...row,
            averageNer: (Math.round(averageNer * 1000) / 1000).toFixed(3),
            averageRestSeq: (Math.round(averageRestSeq * 1000) / 1000).toFixed(3),
        };
    });
};

export const computeGlobalAvgSeq = (data, keyRestSeq) => {
    return data.map(row => {
        const averageNer = parseFloat(row.averageNer);

        const restValues = keyRestSeq.map(key => parseFloat(row[key])).filter(value => !isNaN(value));

        const totalValues = [averageNer, ...restValues];
        const globalAverage = totalValues.length > 0
        ? (totalValues.reduce((total, value) => total + value, 0) / totalValues.length)
        : 0;
    return { ...row, averageSeq: (Math.round(globalAverage * 1000) / 1000).toFixed(3) };
    });
};




