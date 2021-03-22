import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { emit } from '../pages/map/mediator';
import { useMapStore } from '../pages/map/store';

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};
const defaultZoom = 14;

function GoogleMap() {
  const [{ markers }] = useMapStore();

  useEffect(() => {
    emit('mapLoaded', gdanskPosition);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={gdanskPosition}
        defaultZoom={defaultZoom}
        onChange={(event) => emit('mapDragged', event.center)}
      >
        {markers.map((marker) => (
          <Marker key={marker.pageid} lat={marker.lat} lng={marker.lng} />
        ))}
        <Marker lat={gdanskPosition.lat} lng={gdanskPosition.lng} />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
