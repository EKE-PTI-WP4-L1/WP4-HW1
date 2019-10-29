export default class Article {

    suggestedLabels;
    originalLabels;
    title;
    content;

    constructor(suggestedLabels, originalLabels, title, content) {
        this.suggestedLabels = suggestedLabels;
        this.originalLabels = originalLabels;
        this.title = title;
        this.content = content;
    }
}