export default class ArticleRenderer {

    article;
    articleList;
    labelProbability;
    titleContainer;
    bodyContainer;
    originalLabelsContainer;
    suggestedLabelsContainer;
    customOriginalLabelsContainer;
    customSuggestedLabelsContainer;
    articleListOptions;

    constructor(articleList) {
        this.article = articleList[0];
        this.articleList = articleList;
        this.titleContainer = $('#article-title');
        this.bodyContainer = $('#article-body');
        this.originalLabelsContainer = $('#original-labels');
        this.suggestedLabelsContainer = $('#suggested-labels');
        this.customOriginalLabelsContainer = $('#custom-original-labels');
        this.customSuggestedLabelsContainer = $('#custom-suggested-labels');
        this.articleListOptions = $('#article-selector');
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

    renderOptions() {
        let container = this.articleListOptions;
        container.html('');
        this.articleList.forEach(function (article, index) {
            container.append('<option value="' + index + '">' + article.title + '</option>');
        });
    }

    renderLabels() {
        this.labelProbability = $('#label-probability-range').val() / 100;
        $('#probability-value').html('<b>' + this.labelProbability + '</b>');

        let inserted = 0;

        this.renderOriginalLabels(this.originalLabelsContainer, this.article.originalLabels.normal);
        this.renderOriginalLabels(this.customOriginalLabelsContainer, this.article.originalLabels.custom);
        inserted += this.renderSuggestedLabels(this.suggestedLabelsContainer, this.article.suggestedLabels.normal);
        inserted += this.renderSuggestedLabels(this.customSuggestedLabelsContainer, this.article.suggestedLabels.custom);

        let p = inserted / (this.article.suggestedLabels.normal.length + this.article.suggestedLabels.custom.length);
        let r = inserted / (this.article.originalLabels.normal.length + this.article.originalLabels.custom.length);

        $('#p-value').html(p);
        $('#r-value').html(r);
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

        return inserted;
    }
}