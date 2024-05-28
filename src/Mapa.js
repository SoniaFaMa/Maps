import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

function Mapa({ selectedUser }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjPd6r_7W8iKsTg7wafs8ZgzzUajOY2U4",
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      const lat = parseFloat(selectedUser.latitude);
      const lng = parseFloat(selectedUser.longitude);
      setMarkerPosition({ lat, lng });
    }
  }, [selectedUser]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    if (markerPosition) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(markerPosition);
      map.fitBounds(bounds);
    }
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={handleOnLoad}
      mapContainerStyle={{ width: "50vw", height: "50vh" }}
    >
      {markerPosition && (
        <Marker
          position={markerPosition}
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