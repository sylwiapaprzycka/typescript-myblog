"use strict";
{
    const selectorArticle = '.post';
    const selectorTitle = '.post-title';
    const selectorTitleList = '.titles';
    const selectorArticleTags = '.post-tags .list';
    const selectorArticleAuthor = '.post-author';
    const selectorAuthorsList = '.list.authors';
    const selectorTagsList = '.sidebar .tags';
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        /* find active link and make it inactive */
        const activeLink = document.querySelector('.titles a.active');
        if (activeLink)
            activeLink.classList.remove('active');
        /* add active class to clicked link */
        clickedElement.classList.add('active');
        /* find and hide active article */
        const activeArticle = document.querySelector('.posts article.active');
        if (activeArticle)
            activeArticle.classList.remove('active');
        /* find id of article related to clicked link, then find it and show */
        const hrefAttribute = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(hrefAttribute);
        if (targetArticle)
            targetArticle.classList.add('active');
    };
    const generateTitleLinks = (customSelector = '') => {
        /* find and empty title list */
        const titleList = document.querySelector(selectorTitleList);
        titleList.innerHTML = '';
        /* prepare variable for storing all the title links */
        let html = '';
        /* find all articles and loop through each of them */
        const articles = document.querySelectorAll(selectorArticle + customSelector);
        articles.forEach(article => {
            var _a;
            /* find id of the article */
            const articleID = article.getAttribute('id');
            /* find elem that holds the title and retrieve it */
            const articleTitle = (_a = article.querySelector(selectorTitle)) === null || _a === void 0 ? void 0 : _a.innerHTML;
            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
            /* insert link into html variable */
            html = html + linkHTML;
        });
        /* add all the links from html variable to titleList */
        titleList.insertAdjacentHTML('afterbegin', html);
        /* find created links and add listeners to them */
        const links = document.querySelectorAll('.titles a');
        links.forEach(link => {
            link.addEventListener('click', titleClickHandler);
        });
    };
    const generateTags = () => {
        /* create a new array for holding unique tag names */
        let allTags = [];
        /* find all articles and loop through */
        const articles = document.querySelectorAll(selectorArticle);
        articles.forEach(article => {
            /* find div for storing tags  */
            const tagWrapper = article.querySelector(selectorArticleTags);
            /* prepare variable for storing all the tag links */
            let html = '';
            /* get info about tags from data-tags attribute */
            const dataTag = article.getAttribute('data-tags');
            /* split tags into array */
            const tagsArray = dataTag.split(' ');
            /* loop through tags */
            for (let tag of tagsArray) {
                /* generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + linkHTML;
                /* check if tag is NOT already in allTags, if not -> push it */
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            }
            /* insert HTML of all the links into the tags wrapper */
            tagWrapper.insertAdjacentHTML('afterbegin', html);
        });
        /* find tags list in sidebar */
        const tagList = document.querySelector(selectorTagsList);
        /* create variable for all links */
        let allTagsHTML = '';
        /* loop for each tag in unique tags list */
        allTags.forEach(tag => {
            allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        });
        /* add html from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
    };
    const generateAuthors = () => {
        /* create list of unique authors */
        let allAuthors = [];
        /* find all articles and loop through */
        const articles = document.querySelectorAll(selectorArticle);
        articles.forEach(article => {
            /* find wrapper for author in article elem */
            const articleAuthor = article.querySelector(selectorArticleAuthor);
            /* get article data-author attribute */
            const author = article.getAttribute('data-author');
            /* check if author is not already in the list, if not -> push it */
            if (!allAuthors.includes(author)) {
                allAuthors.push(author);
            }
            /* create author link and add it  to article */
            const html = 'by <a href="#author-' + author + '">' + author + '</a>';
            articleAuthor.insertAdjacentHTML('beforeend', html);
        });
        /* find wrapper for author links in sidebar */
        const authorList = document.querySelector(selectorAuthorsList);
        /* loop through unique authors and generate author links in in sidebar*/
        allAuthors.forEach(author => {
            authorList.insertAdjacentHTML('afterbegin', '<li><a href="#">' + author + '</a></li>');
        });
    };
    // generate title links, tags and author based on articles */
    generateTitleLinks();
    generateTags();
    generateAuthors();
}
//# sourceMappingURL=script.js.map