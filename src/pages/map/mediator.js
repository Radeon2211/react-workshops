import React from 'react';
import WikipediaAPI from '../../services/wikipedia';

const listeners = {};

export function emit (event, ...args) {
  console.log(event, args);
  listeners[event](...args);
};

function attachListener (eventName, listener) {
  listeners[eventName] = listener;
};

function useMapMediator () {
  async function mapDragged (center) {
    const articles = await WikipediaAPI.getArticles({ coord: center });
    console.log('articles:', articles)
  }

  async function mapLoaded (center) {
    const articles = await WikipediaAPI.getArticles({ coord: center });
    console.log('useMapMediator map articles:', articles)
  }

  attachListener('mapLoaded', mapLoaded);
  attachListener('mapDragged', mapDragged);
};

function MapMediator () {
  useMapMediator();

  return null;
};

export default MapMediator;
