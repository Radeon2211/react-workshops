import WikipediaApi from '../../services/api/wikipedia';
import { useMapStore } from './store';
import ArticlesDatabase from '../../services/ArticlesDatabase';

const readArticleColor = 'blue';
const defaultArticleColor = 'orange';

const listeners = {};
let map;

export function emit(event, ...args) {
  const listener = listeners[event];

  if (listener) {
    listener(...args);
  }
}

function attachListner(eventName, listener) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
  return articles.map(({ lat, lon, pageid, title }) => ({
    lat,
    lng: lon,
    pageid,
    title,
  }));
}

function mapReadArticles(articles) {
  return articles.map(({ title, ...rest }) => ({
    ...rest,
    title,
    color: ArticlesDatabase.isArticleRead(title) ? readArticleColor : defaultArticleColor,
  }));
}

function useMapMediator() {
  const [
    ,
    { addMarkers, setMarkerColor, setGoogleApiLoaded, setModalVisible, setCurrentArticle },
  ] = useMapStore();

  async function getArticlesForMapCenter() {
    const response = await WikipediaApi.getArticles({
      coord: map.center.toJSON(),
      limit: 100,
    });
    let articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    articles = mapReadArticles(articles);
    addMarkers(articles);
  }

  function mapLoaded(mapInstance) {
    map = mapInstance;

    map.addListener('dragend', getArticlesForMapCenter);

    getArticlesForMapCenter();
    setGoogleApiLoaded(true);
  }

  function searchBoxPlacesSelected(position) {
    if (map) {
      map.setCenter(position);
    }
  }

  async function markerClicked(title) {
    const { query } = await WikipediaApi.getArticle({ title });
    const articles = Object.values(query.pages);
    const article = articles[0];

    setCurrentArticle({ url: article.fullurl, title });
    setModalVisible(true);
    setMarkerColor({ title, color: readArticleColor });

    ArticlesDatabase.setArticleAsRead(title);
  }

  attachListner('mapLoaded', mapLoaded);
  attachListner('searchBoxPlacesSelected', searchBoxPlacesSelected);
  attachListner('markerClicked', markerClicked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
