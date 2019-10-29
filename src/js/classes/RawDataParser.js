export default class RawDataParser {

    static parseRawData(rawData) {
        return rawData.split("\n");
    }

    static parseRawArticle(rawArticle) {
        return rawArticle.split('$$$');
    }

    static parseRawSuggestedLabels(rawSuggestedLabels) {
        let rawLabels = rawSuggestedLabels.split('__label__');
        let labels = [];
        labels['normal'] = [];
        labels['custom'] = [];
        rawLabels.forEach(function (rawLabel) {
            if (rawLabel !== '') {
                let label = [];
                let values = rawLabel.split(' ');
                label['num'] = parseFloat(values[1]);
                label['value'] = values[0].replace(/@@/g, ' ');
                if (label['value'].includes('geography__') ||
                    label['value'].includes('organization__') ||
                    label['value'].includes('person__ ')) {
                    labels['custom'].push(label);
                } else {
                    labels['normal'].push(label);
                }
            }
        });
        return labels;
    }