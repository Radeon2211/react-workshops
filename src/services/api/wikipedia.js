/* eslint-disable consistent-return */
import ky from 'ky';

const client = ky.create({
  prefixUrl: 'https://pl.wikipedia.org/w',
  headers: {
    'content-type': 'application/json',
  },
});

const defaultParams = {
  origin: '*',
};

const api = {
  getArticles({ coord, radius = 10000, limit = 10 } = {}) {
    if (!coord) {
      return;
    }

    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      ...defaultParams,
    };

    return client
      .get('api.php?', {
        searchParams: {
          ...params,
          gscoord: `${coord.lat}|${coord.lng}`,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },
  getArticle({ title }) {
    if (!title) {
      return;
    }

    const params = {
      action: 'query',
      format: 'json',
      titles: title,
      prop: 'info',
      inprop: 'url',
      origin: '*',
    };

    return client
      .get('api.php?', {
        searchParams: {
          ...params,
        },
      })
      .json();
  },
};

export default api;
