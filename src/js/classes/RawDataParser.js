export default class RawDataParser {

    static parseRawData(rawData) {
        return rawData.split("\n");
    }

    static parseRawArticle(rawArticle) {
        return rawArticle.split('$$$');
    }

    static parseRawLabels(rawData, type) {
        let rawLabels = RawDataParser.splitRawLabelsByType(rawData, type);
        let labels = RawDataParser.generateLabelsArray();

        rawLabels.forEach(function (rawLabel) {
            if (rawLabel !== '') {
                let label = RawDataParser.populateLabelValueByType(rawLabel, type);
                RawDataParser.populateNormalAndCustomLabels(label, labels);
            }
        });
        return labels;
    }

    static splitRawLabelsByType(rawData, type) {
        if (type === 'suggested') {
            return rawData.split('__label__');
        } else if (type === 'default') {
            return rawData.split(' ');
        } else {
            throw 'Label type must be suggested or default.';
        }
    }

    static populateLabelValueByType(rawLabel, type) {
        let label = [];
        if (type === 'suggested') {
            RawDataParser.populateSuggestedLabelValue(rawLabel, label)
        } else if (type === 'default') {
            RawDataParser.populateDefaultLabelValue(rawLabel, label)
        } else {
            throw 'Label type must be suggested or default.';
        }
        return label;
    }

    static populateSuggestedLabelValue(rawLabel, label) {
        let values = rawLabel.split(' ');
        label['num'] = parseFloat(values[1]);
        let regexMap = {'@@': ' ', '__': ': '};
        label['value'] = RawDataParser.replaceAllRegex(values[0], regexMap);
    }

    static populateDefaultLabelValue(rawLabel, label) {
        let regexMap = {'@@': ' ', '__label__': '', '__': ': '};
        label['value'] = RawDataParser.replaceAllRegex(rawLabel, regexMap);
    }

    static generateLabelsArray() {
        let labels = [];
        labels['normal'] = [];
        labels['custom'] = [];
        return labels;
    }

    static populateNormalAndCustomLabels(label, labels) {
        if (label['value'] === '') {
            return;
        }
        if (/(geography: |organization: |person: )/.test(label['value'])) {
            labels['custom'].push(label);
        } else {
            labels['normal'].push(label);
        }
    }

    static replaceAllRegex(str, regexMap) {
        let re = new RegExp(Object.keys(regexMap).join('|'), 'gi');

        return str.replace(re, function (matched) {
            return regexMap[matched.toLowerCase()];
        });
    }
}