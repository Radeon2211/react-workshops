import WikipediaAPI from '../../services/wikipedia';
import { useMapStore } from './store';

const listeners = {};

export function emit(event, ...args) {
  listeners[event](...args);
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
  return articles.map(({ lat, lon, pageid }) => ({
    lat,
    lng: lon,
    pageid,
  }));
}

function useMapMediator() {
  const [, { addMarkers }] = useMapStore();

  async function mapDragged(center) {
    const response = await WikipediaAPI.getArticles({ coord: center, limit: 100 });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  async function mapLoaded(center) {
    await WikipediaAPI.getArticles({ coord: center });
  }

  attachListener('mapLoaded', mapLoaded);
  attachListener('mapDragged', mapDragged);
}

function MapMediator() {
  useMapMediator();

  return null;
}

export default MapMediator;
