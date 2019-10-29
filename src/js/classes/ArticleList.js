import RawDataParser from "./RawDataParser";
import Article from "./Article";

export default class ArticleList {

    articles;
    #rawArticles;

    constructor(rawArticles) {
        this.#rawArticles = rawArticles;
        this.populate();
    }

    populate() {
        let articles = [];
        this.#rawArticles.forEach(function (rawArticle) {
            let rawArticleData = RawDataParser.parseRawArticle(rawArticle);

            let suggestedLabels = RawDataParser.parseRawLabels(rawArticleData[1],'suggested');
            let originalLabels = RawDataParser.parseRawLabels(rawArticleData[2], 'default');
            let title = rawArticleData[3].trim();
            let content = rawArticleData[4].trim();

            articles.push(new Article(suggestedLabels, originalLabels, title, content));
        });
        this.articles = articles;
    }
}