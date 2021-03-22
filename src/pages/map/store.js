import produce from 'immer';
import { createStore, createHook, defaults } from 'react-sweet-state';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const Store = createStore({
  initialState: {
    markers: [],
  },
  actions: {
    addMarkers: (markers) => ({ setState, getState }) => {
      const state = getState();
      const existingMarkers = state.markers.map((marker) => marker.pageid);
      const newMarkers = markers.filter((marker) => !existingMarkers.includes(marker.pageid));
      // const oldMarkers = getState().markers;
      setState((draft) => {
        draft.markers.push(...newMarkers);
      });
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const useMapStore = createHook(Store);
