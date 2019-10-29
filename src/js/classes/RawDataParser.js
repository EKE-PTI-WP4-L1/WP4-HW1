export default class RawDataParser {

    static parseRawData(rawData) {
        return rawData.split("\n");
    }

    static parseRawArticle(rawArticle) {
        return rawArticle.split('$$$');
    }

    static parseRawSuggestedLabels(rawSuggestedLabels) {
        let rawLabels = rawSuggestedLabels.split('__label__');
        let labels = RawDataParser.generateLabelsArray();
        rawLabels.forEach(function (rawLabel) {
            if (rawLabel !== '') {
                let label = [];
                let values = rawLabel.split(' ');
                label['num'] = parseFloat(values[1]);
                label['value'] = values[0].replace(/@@/g, ' ');
                RawDataParser.populateNormalAndCustomLabels(label, labels);
            }
        });
        return labels;
    }

    static parseRawOriginalLabels(rawDefaultLabels) {
        let rawLabels = rawDefaultLabels.split(' ');
        let labels = RawDataParser.generateLabelsArray();
        rawLabels.forEach(function (rawLabel) {
            if (rawLabel !== '') {
                let label = [];
                label['value'] = rawLabel.replace(/@@/g, ' ');
                label['value'] = label['value'].replace(/__label__/g, '');
                RawDataParser.populateNormalAndCustomLabels(label, labels);
            }
        });

        return labels;
    }

    static generateLabelsArray() {
        let labels = [];
        labels['normal'] = [];
        labels['custom'] = [];
        return labels;
    }

    static populateNormalAndCustomLabels(label, labels) {
        if (label['value'].match(/(geography__|organization__|person__ )/)) {
            labels['custom'].push(label);
        } else {
            labels['normal'].push(label);
        }
    }
}