import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

const geojson = {
  type: 'FeatureCollection' as 'FeatureCollection',
  features: [
    {
      type: 'Feature' as 'Feature',
      properties: {
        id: 1
      },
      geometry: {
        type: 'Point' as 'Point',
        coordinates: [-122.4, 37.8]
      }
    },
    {
      type: 'Feature' as 'Feature',
      properties: {
        id: 2
      },
      geometry: {
        type: 'Point' as 'Point',
        coordinates: [-122.1, 37.7]
      }
    }
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle' as 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App() {
  const [viewport, setViewport] = React.useState();
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 9
      }}
      mapLib={maplibregl}
      style={{ width: 800, height: 600 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

export default App;
