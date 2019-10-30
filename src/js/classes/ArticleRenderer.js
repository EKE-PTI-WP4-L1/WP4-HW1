export default class ArticleRenderer {

    article;
    labelProbability;
    titleContainer;
    bodyContainer;
    originalLabelsContainer;
    suggestedLabelsContainer;
    customOriginalLabelsContainer;
    customSuggestedLabelsContainer;

    constructor(article = null) {
        this.article = article;
        this.titleContainer = $('#article-title');
        this.bodyContainer = $('#article-body');
        this.originalLabelsContainer = $('#original-labels');
        this.suggestedLabelsContainer = $('#suggested-labels');
        this.customOriginalLabelsContainer = $('#custom-original-labels');
        this.customSuggestedLabelsContainer = $('#custom-suggested-labels');
    }

    getArticle() {
        return this.article;
    }

    setArticle(article) {
        this.article = article;
    }

    render() {
        this.titleContainer.html(this.article.title);
        this.bodyContainer.html(this.article.content);
        this.originalLabelsContainer.html('');
        this.suggestedLabelsContainer.html('');
        this.customOriginalLabelsContainer.html('');
        this.customSuggestedLabelsContainer.html('');

        this.renderLabels();
    }

    renderLabels() {
        this.labelProbability = $('#label-probability-range').val() / 100;
        $('#probability-value').html('<b>' + this.labelProbability + '</b>');

        this.renderOriginalLabels(this.originalLabelsContainer, this.article.originalLabels.normal);
        this.renderOriginalLabels(this.customOriginalLabelsContainer, this.article.originalLabels.custom);
        this.renderSuggestedLabels(this.suggestedLabelsContainer, this.article.suggestedLabels.normal);
        this.renderSuggestedLabels(this.customSuggestedLabelsContainer, this.article.suggestedLabels.custom);
    }

    renderOriginalLabels(container, data) {
        data.forEach(function (label) {
            container.append('<li>' + label.value + '</li>');
        });
    }

    renderSuggestedLabels(container, data) {
        let self = this;
        let lower = 1;
        let inserted = 0;
        let minThree = $('#min-three').is(":checked");

        data.forEach(function (label) {
            if (label.num >= self.labelProbability) {
                container.append('<li>' + label.value + ' (' + label.num + ')</li>');
                inserted++;
                lower = label.num;
            }
        });

        if (minThree && inserted < 3) {
            data.sort(function (a, b) {
                return b['num'] - a['num']
            });
            data.forEach(function (label) {
                if (label.num < lower && inserted < 3) {
                    container.append('<li>' + label.value + ' (' + label.num + ')</li>');
                    inserted++;
                }
            });
        }
    }
}