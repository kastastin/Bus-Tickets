import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import startMarker from "../../resources/icons/startMarker.svg";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../../resources/css/map.css";
import "../../resources/css/modal.css";

function Map() {
  const address = JSON.parse(localStorage.getItem("address"));

  const [arrival, setArrival] = useState(address.arrival.town || "");
  const [departure, setDeparture] = useState(address.departure.town || "");
  const [departureCoords, setDepartureCoords] = useState([]);
  const [arrivalCoords, setArrivalCoords] = useState([]);

  useEffect(() => {
    const addresses = [departure, arrival];

    if (!!departure && !!arrival && departure !== arrival) {
      const newBusAddress = {
        departure: { town: departure, coords: departureCoords },
        arrival: { town: arrival, coords: arrivalCoords },
      };

      localStorage.setItem("addresses", JSON.stringify(addresses));
      localStorage.setItem("address", JSON.stringify(newBusAddress));
    } else {
      localStorage.removeItem("addresses");
    }
  }, [departure, arrival, departureCoords, arrivalCoords]);

  const defaultCoords = [50.448, 30.522];
  const startIcon = new L.Icon({
    iconUrl: startMarker,
    iconRetinaUrl: startMarker,
    iconSize: [60, 60],
    iconAnchor: [29, 45],
    popupAnchor: [0, -40],
  });

  const createSearchControl = function (type) {
    return new GeoSearchControl({
      searchLabel: `Enter ${type} address...`,
      style: "bar",
      marker: { icon: startIcon },
      showPopup: true,
      popupFormat: ({ query, result }) => result.label.split(", ")[0],
      retainZoomLevel: true,
      provider: new OpenStreetMapProvider(),
    });
  };

  const getAddress = function (e, type) {
    const addressArr = e.location.label.split(", ");
    const town = addressArr[0];
    const country = addressArr.at(-1);
    const address = `${town}, ${country}`;
    if (type === "departure") {
      setDeparture(address);
      setDepartureCoords([e.location.y, e.location.x]);
    }
    if (type === "arrival") {
      setArrival(address);
      setArrivalCoords([e.location.y, e.location.x]);
    }
  };

  const SearchDeparture = function () {
    const map = useMap();
    const searchControl = createSearchControl("departure");

    useEffect(() => {
      map.addControl(searchControl);
      map.on("geosearch/showlocation", function (e) {
        getAddress(e, "departure");
      });
      return () => map.removeControl(searchControl);
    });
  };

  const SearchArrival = function () {
    const map = useMap();
    const searchControl = createSearchControl("arrival");

    useEffect(() => {
      map.addControl(searchControl);
      map.on("geosearch/showlocation", function (e) {
        getAddress(e, "arrival");
      });
      return () => map.removeControl(searchControl);
    });
  };

  return (
    <>
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
    </>
  );
}

export default Map;
