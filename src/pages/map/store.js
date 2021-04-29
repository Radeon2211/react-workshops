/* eslint-disable no-param-reassign */
import { createStore, createHook, defaults } from 'react-sweet-state';
import { produce } from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const Store = createStore({
  initialState: {
    markers: [],
    googleApiLoaded: false,
    modalVisible: false,
    currentArticle: {
      url: '',
      title: '',
    },
  },
  actions: {
    addMarkers: (markers) => ({ setState, getState }) => {
      const state = getState();
      const existingMarkers = state.markers.map((marker) => marker.pageid);
      const newMarkers = markers.filter((marker) => !existingMarkers.includes(marker.pageid));
      const finalMarkers = [...state.markers, ...newMarkers].slice(-400);

      setState((draft) => {
        draft.markers = finalMarkers;
      });
    },
    setGoogleApiLoaded: (value) => ({ setState }) => {
      setState((draft) => {
        draft.googleApiLoaded = value;
      });
    },
    setModalVisible: (value) => ({ setState }) => {
      setState((draft) => {
        draft.modalVisible = value;
      });
    },
    setCurrentArticle: ({ url, title }) => ({ setState }) => {
      setState((draft) => {
        draft.currentArticle = {
          url,
          title,
        };
      });
    },
    setMarkerColor: ({ title, color }) => ({ setState, getState }) => {
      const { markers } = getState();
      const markerIndex = markers.findIndex((marker) => marker.title === title);

      setState((draft) => {
        draft.markers[markerIndex].color = color;
      });
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const useMapStore = createHook(Store);
