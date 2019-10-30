require('jquery-ui-bundle');
import 'bootstrap';
import '../assets/icons/favicon.ico';
import '../../node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min';

import RawDataParser from './classes/RawDataParser';
import data from '../data/data.txt';
import ArticleList from './classes/ArticleList';
import ArticleRenderer from './classes/ArticleRenderer';

const rawArticles = RawDataParser.parseRawData(data);
const articleList = new ArticleList(rawArticles);
let articleIndex = 0;

const articleRenderer = new ArticleRenderer(articleList.articles);
articleRenderer.render();
articleRenderer.renderOptions();

$('#label-probability-range').on('change', function () {
    articleRenderer.render();
});

$('#min-three').on('change', function () {
    articleRenderer.render();
});

$('#article-selector').on('change', function () {
    articleIndex = parseInt($(this).val());
    articleRenderer.setArticle(articleList.articles[articleIndex]);
    articleRenderer.render();
});

$('.btn-paginator').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    let num = parseInt($(this).data('num'));
    let length = articleList.articles.length;
    let temp = (articleIndex + num) % length;

    if (temp >= 0) {
        articleIndex = temp;
    } else {
        articleIndex = temp + length;
    }
    articleRenderer.setArticle(articleList.articles[articleIndex]);
    $("#article-selector").val(articleIndex);
    articleRenderer.render();
    return false;
});

