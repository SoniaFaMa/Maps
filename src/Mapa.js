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
    // Actualizar la posición del marcador cuando se selecciona un usuario
    if (selectedUser) {
      const lat = parseFloat(selectedUser.latitude);
      const lng = parseFloat(selectedUser.longitude);
      setMarkerPosition({
        lat,
        lng
      });
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
      // Ajustar el mapa al tamaño del marcador solo si hay una posición válida
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
      {/* Mostrar el marcador solo si la posición es válida */}
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