"use strict";
{
    var selectorArticle_1 = '.post';
    var selectorTitle_1 = '.post-title';
    var selectorTitleList_1 = '.titles';
    var selectorArticleTags_1 = '.post-tags .list';
    var selectorArticleAuthor_1 = '.post-author';
    var selectorAuthorsList_1 = '.list.authors';
    var selectorTagsList_1 = '.sidebar .tags';
    var titleClickHandler_1 = function (event) {
        event.preventDefault();
        var clickedElement = this;
        /* find active link and make it inactive */
        var activeLink = document.querySelector('.titles a.active');
        if (activeLink)
            activeLink.classList.remove('active');
        /* add active class to clicked link */
        clickedElement.classList.add('active');
        /* find and hide active article */
        var activeArticle = document.querySelector('.posts article.active');
        if (activeArticle)
            activeArticle.classList.remove('active');
        /* find id of article related to clicked link, then find it and show */
        var hrefAttribute = clickedElement.getAttribute('href');
        var targetArticle = document.querySelector(hrefAttribute);
        if (targetArticle)
            targetArticle.classList.add('active');
    };
    var generateTitleLinks = function (customSelector) {
        if (customSelector === void 0) { customSelector = ''; }
        /* find and empty title list */
        var titleList = document.querySelector(selectorTitleList_1);
        titleList.innerHTML = '';
        /* prepare variable for storing all the title links */
        var html = '';
        /* find all articles and loop through each of them */
        var articles = document.querySelectorAll(selectorArticle_1 + customSelector);
        for (var _i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
            var article = articles_1[_i];
            /* find id of the article */
            var articleID = article.getAttribute('id');
            /* find elem that holds the title and retrieve it */
            var articleTitle = article.querySelector(selectorTitle_1).innerHTML;
            /* create HTML of the link */
            var linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
            /* insert link into html variable */
            html = html + linkHTML;
        }
        /* add all the links from html variable to titleList */
        titleList.insertAdjacentHTML('afterbegin', html);
        /* find created links and add listeners to them */
        var links = document.querySelectorAll('.titles a');
        for (var _a = 0, links_1 = links; _a < links_1.length; _a++) {
            var link = links_1[_a];
            link.addEventListener('click', titleClickHandler_1);
        }
    };
    var generateTags = function () {
        /* create a new array for holding unique tag names */
        var allTags = [];
        /* find all articles and loop through */
        var articles = document.querySelectorAll(selectorArticle_1);
        for (var _i = 0, articles_2 = articles; _i < articles_2.length; _i++) {
            var article = articles_2[_i];
            /* find div for storing tags  */
            var tagWrapper = article.querySelector(selectorArticleTags_1);
            /* prepare variable for storing all the tag links */
            var html = '';
            /* get info about tags from data-tags attribute */
            var dataTag = article.getAttribute('data-tags');
            /* split tags into array */
            var tagsArray = dataTag.split(' ');
            /* loop through tags */
            for (var _a = 0, tagsArray_1 = tagsArray; _a < tagsArray_1.length; _a++) {
                var tag = tagsArray_1[_a];
                /* generate HTML of the link */
                var linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + linkHTML;
                /* check if tag is NOT already in allTags, if not -> push it */
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            }
            /* insert HTML of all the links into the tags wrapper */
            tagWrapper.insertAdjacentHTML('afterbegin', html);
        }
        /* find tags list in sidebar */
        var tagList = document.querySelector(selectorTagsList_1);
        /* create variable for all links */
        var allTagsHTML = '';
        /* loop for each tag in unique tags list */
        for (var _b = 0, allTags_1 = allTags; _b < allTags_1.length; _b++) {
            var tag = allTags_1[_b];
            allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        }
        /* add html from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
    };
    var generateAuthors = function () {
        /* create list of unique authors */
        var allAuthors = [];
        /* find all articles and loop through */
        var articles = document.querySelectorAll(selectorArticle_1);
        for (var _i = 0, articles_3 = articles; _i < articles_3.length; _i++) {
            var article = articles_3[_i];
            /* find wrapper for author in article elem */
            var articleAuthor = article.querySelector(selectorArticleAuthor_1);
            /* get article data-author attribute */
            var author = article.getAttribute('data-author');
            /* check if author is not already in the list, if not -> push it */
            if (!allAuthors.includes(author)) {
                allAuthors.push(author);
            }
            /* create author link and add it  to article */
            var html = 'by <a href="#author-' + author + '">' + author + '</a>';
            articleAuthor.insertAdjacentHTML('beforeend', html);
        }
        /* find wrapper for author links in sidebar */
        var authorList = document.querySelector(selectorAuthorsList_1);
        /* loop through unique authors and generate author links in in sidebar*/
        for (var _a = 0, allAuthors_1 = allAuthors; _a < allAuthors_1.length; _a++) {
            var author = allAuthors_1[_a];
            authorList.insertAdjacentHTML('afterbegin', '<li><a href="#">' + author + '</a></li>');
        }
    };
    // generate title links, tags and author based on articles */
    generateTitleLinks();
    generateTags();
    generateAuthors();
}
//# sourceMappingURL=script.js.map