const articlesKey = 'articles';

function ArticlesDatabase() {
  let articles;

  // eslint-disable-next-line consistent-return
  function getArticles() {
    try {
      const articlesLS = localStorage.getItem(articlesKey);

      if (articlesLS) {
        return JSON.parse(articlesLS);
      }
      return [];
    } catch (e) {
      console.error('Error while reading articles from localStorage', e);
    }
  }

  articles = getArticles();

  function addArticle(title) {
    try {
      articles.push(title);
      localStorage.setItem(articlesKey, JSON.stringify(articles));
    } catch (e) {
      console.error('Error while adding article to localStorage', e);
    }
  }

  const api = {
    refresh() {
      articles = getArticles();
    },
    isArticleRead(title) {
      return articles.includes(title);
    },
    setArticleAsRead(title) {
      addArticle(title);
    },
  };
  return api;
}

export default ArticlesDatabase();
