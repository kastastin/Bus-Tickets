import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import startMarker from "../../resources/icons/startMarker.svg";
import "../../resources/map.css";
import "../../resources/modal.css";
import Modal from "../../components/Modal";

function Map({ isMapActive, setIsMapActive }) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const defaultCoords = [50.448, 30.522];
  const startIcon = new L.Icon({
    iconUrl: startMarker,
    iconRetinaUrl: startMarker,
    iconSize: [60, 60],
    iconAnchor: [29, 45],
    popupAnchor: [0, -40],
  });

  const SearchDeparture = function () {
    const map = useMap();

    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      showPopup: true,
      marker: {
        icon: startIcon,
        draggable: true,
      },
      searchLabel: "Enter departure address...",
    });

    useEffect(() => {
      const searchHandler = function (e) {
        const addressArr = e.location.label.split(", ");
        const town = addressArr[0];
        const country = addressArr.at(-1);
        const address = `${town}, ${country}`;
        setDeparture(address);
      };

      map.addControl(searchControl);
      map.on("geosearch/showlocation", searchHandler);
      return () => map.removeControl(searchControl);
    });
  };

  const SearchArrival = function () {
    const map = useMap();

    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      showPopup: true,
      marker: {
        icon: startIcon,
        draggable: true,
      },
      searchLabel: "Enter departure address...",
    });

    useEffect(() => {
      const searchHandler = function (e) {
        const addressArr = e.location.label.split(", ");
        const town = addressArr[0];
        const country = addressArr.at(-1);
        const address = `${town}, ${country}`;
        setArrival(address);
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
        <div className="task">Choose deaprture and arrival</div>
        <div className="maps-wrapper">
          <div className="departure-map">
            <MapContainer
              center={defaultCoords}
              zoom={9}
              attributionControl={false}
            >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
              <SearchDeparture />
            </MapContainer>
            <div className="departure-wrapper">
              <div className="title">Departure from:</div>
              <input type="text" disabled value={departure}></input>
            </div>
          </div>
          <div className="arrival-map">
            <MapContainer
              center={defaultCoords}
              zoom={9}
              attributionControl={false}
            >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
              <SearchArrival />
            </MapContainer>
            <div className="arrival-wrapper">
              <div className="title">Arrival in:</div>
              <input type="text" disabled value={arrival}></input>
            </div>
          </div>
        </div>
        <div className="map-footer">
          <button type="submit">Next Step</button>
        </div>
      </div>
    </Modal>
  );
}

export default Map;
