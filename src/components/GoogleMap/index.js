import React from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { emit } from '../../pages/map/mediator';
import Marker from '../Marker';
import { useMapStore } from '../../pages/map/store';
import styles from './styles';

const GoogleMapWrapper = styled.div`
  width: 100%;
  height: 90vh;
`;

const gdanskPosition = {
  lat: 53.49527,
  lng: 17.2447934,
};
const defaultZoom = 13;

function GoogleMap() {
  const [{ markers }] = useMapStore();

  return (
    <GoogleMapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY, libraries: ['places'] }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => emit('mapLoaded', map)}
        defaultCenter={gdanskPosition}
        defaultZoom={defaultZoom}
        options={{ styles: styles.tinia }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.pageid}
            title={marker.title}
            color={marker.color}
            lat={marker.lat}
            lng={marker.lng}
          />
        ))}
      </GoogleMapReact>
    </GoogleMapWrapper>
  );
}

export default GoogleMap;
