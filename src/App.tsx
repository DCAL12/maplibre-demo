import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

const data = [
  {
    "line": {
      "lineRef": "SKY:Line:900"
    },
    "lastUpdated": "2022-05-30T09:09:41+02:00",
    "location": {
      "latitude": 60.4175743740052,
      "longitude": 5.46647113747895
    }
  },
  {
    "line": {
      "lineRef": "SKY:Line:912"
    },
    "lastUpdated": "2022-05-30T09:09:42+02:00",
    "location": {
      "latitude": 60.7845161575824,
      "longitude": 5.75279728509486
    }
  },
  {
    "line": {
      "lineRef": "SKY:Line:911"
    },
    "lastUpdated": "2022-05-30T09:00:49+02:00",
    "location": {
      "latitude": 60.586475841701,
      "longitude": 5.81582332961261
    }
  },
  {
    "line": {
      "lineRef": "SKY:Line:911"
    },
    "lastUpdated": "2022-05-30T09:09:37+02:00",
    "location": {
      "latitude": 60.8293512091041,
      "longitude": 6.27050469629467
    }
  },
  {
    "line": {
      "lineRef": "SKY:Line:915"
    },
    "lastUpdated": "2022-05-30T09:09:39+02:00",
    "location": {
      "latitude": 60.8139958977699,
      "longitude": 5.80385321751237
    }
  }
];

const vehiclesGeojson = {
  type: 'FeatureCollection' as 'FeatureCollection',
  features: data.map(item => ({
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
}

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

export default App;
