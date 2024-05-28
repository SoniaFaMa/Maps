import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Amatista",
    position: { lat: 41.3898009, lng: 2.1417399 }
  }
];

function Mapa({ selectedUser }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjPd6r_7W8iKsTg7wafs8ZgzzUajOY2U4",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "50vw", height: "50vh" }}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id && (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          )}
        </Marker>
      ))}
      
      {selectedUser && (
        <Marker
          position={{ lat: selectedUser.latitude, lng: selectedUser.longitude }}
          onClick={() => handleActiveMarker(selectedUser.id)}
        >
          {activeMarker === selectedUser.id && (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{selectedUser.name}</div>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  ) : <></>;
}

export default Mapa;