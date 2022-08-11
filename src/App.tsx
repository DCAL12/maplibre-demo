import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery } from '@apollo/client';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

const GET_LOCATIONS = gql`
  query MyQuery {
    vehicles(codespaceId:"SKY") {
      line {lineRef}
      lastUpdated
      location {
        latitude
        longitude
      }
    }
  }
`;

interface Vehicle {
  line: any;
  location: any;
  lastUpdated: string;
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(error)</p>;

  const layerStyle = {
    id: 'point',
    type: 'circle' as 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  const vehiclesGeojson = {
    type: 'FeatureCollection' as 'FeatureCollection',
    features: data.vehicles.map((item: Vehicle) => ({
      type: 'Feature' as 'Feature',
      properties: {
        id: item.line.lineRef,
        lastUpdated: item.lastUpdated
      },
      geometry: {
        type: 'Point' as 'Point',
        coordinates: [
          item.location.longitude,
          item.location.latitude
        ]
      }
    }))
  };

  return (
    <Map
      initialViewState={{
        latitude: 60.5,
        longitude: 5.8,
        zoom: 7
      }}
      mapLib={maplibregl}
      style={{ width: 800, height: 600 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source id="my-data" type="geojson" data={vehiclesGeojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

function App() {
  const [viewport, setViewport] = React.useState();
  return (
    <div>
      <DisplayLocations />
    </div>
  );
}

export default App;
