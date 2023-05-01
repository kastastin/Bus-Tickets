import React, { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../../resources/map.css";
import Modal from "../../components/Modal";
import "../../resources/modal.css";
import startMarker from "../../resources/icons/startMarker.svg";

function Map({ isMapActive, setIsMapActive }) {
  const defaultCoords = [50.448, 30.522];

  const CurrentPosition = function () {
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng);
      });
    }, [map]);

    return null;
  };

  const SetMarker = function () {
    const [position, setPosition] = useState(null);
    const startIcon = new L.Icon({
      iconUrl: startMarker,
      iconRetinaUrl: startMarker,
      iconSize: [60, 60],
      iconAnchor: [30, 45],
      popupAnchor: [0, -40],
    });

    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={startIcon}></Marker>
    );
  };

  return (
    <Modal isModalActive={isMapActive} setIsFormActive={setIsMapActive}>
      <div className="map-wrapper">
        <div className="map-header">
          <p className="step">Step 1/3</p>
          <p className="title">Add New Bus</p>
        </div>
        <div className="map-main">
          <div className="form">
            <div className="task">Indicate the bus route</div>
          </div>
          <div className="map">
            <MapContainer
              center={defaultCoords}
              zoom={11}
              attributionControl={false}
            >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
              <CurrentPosition />
              <SetMarker />
            </MapContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Map;
