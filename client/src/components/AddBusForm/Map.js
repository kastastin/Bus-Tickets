import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../../resources/map.css";
import Modal from "../../components/Modal";
import "../../resources/modal.css";

function Map({ isMapActive, setIsMapActive }) {
  return (
    <Modal isModalActive={isMapActive} setIsFormActive={setIsMapActive}>
      <div className="map-wrapper">
        <div className="map-header">
          <p className="step">Step 1/3</p>
          <p className="title">Add New Bus</p>
        </div>
        <div className="map-main">
          <div className="form"></div>
          <div className="map">
            <MapContainer
              center={[49.25295500665459, -123.11120364979581]}
              zoom={11}
              attributionControl={false}
            >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
            </MapContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Map;
