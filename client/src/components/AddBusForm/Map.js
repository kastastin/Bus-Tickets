import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import startMarker from "../../resources/icons/startMarker.svg";
import "../../resources/map.css";
import "../../resources/modal.css";
import Modal from "../../components/Modal";

function Map({ isMapActive, setIsMapActive }) {
  const defaultCoords = [50.448, 30.522];
  const startIcon = new L.Icon({
    iconUrl: startMarker,
    iconRetinaUrl: startMarker,
    iconSize: [60, 60],
    iconAnchor: [29, 45],
    popupAnchor: [0, -40],
  });

  const CurrentPosition = function () {
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", (e) => {
        map.flyTo(e.latlng);
      });
    });

    return null;
  };

  const SetMarker = function () {
    const map = useMap();
    const [position, setPosition] = useState(null);

    useEffect(() => {
      map.on("click", (e) => {
        setPosition(e.latlng);
      });
    });

    if (!position) return;

    return (
      <Marker position={position} icon={startIcon} draggable={true}></Marker>
    );
  };

  const Search = function () {
    const map = useMap();

    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      showPopup: true,
      marker: {
        icon: startIcon,
        draggable: true,
      },
    });

    useEffect(() => {
      const searchHandler = function () {
        // setIsMarkerExist(true);
      };

      map.addControl(searchControl);
      map.on("geosearch/showlocation", searchHandler);
      return () => map.removeControl(searchControl);
    });
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
              <Search />
            </MapContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Map;
