import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import { startIcon, finishIcon } from "./MapIcons";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "../../resources/css/map.css";
import "../../resources/css/modal.css";

function Map({ localBus, setLocalBus, mapData, setMapData }) {
  const defaultCoords = [50.448, 30.522];

  useEffect(() => {
    const { departureTown, departureCoords, arrivalTown, arrivalCoords } =
      mapData;

    if (!!departureTown && !!arrivalTown && departureTown !== arrivalTown) {
      setLocalBus((prevState) => ({
        ...prevState,
        departureTown: departureTown,
        departureCoords: departureCoords,
        arrivalTown: arrivalTown,
        arrivalCoords: arrivalCoords,
      }));
    }
  }, [mapData, setLocalBus]);

  const createSearchControl = function (type, icon) {
    return new GeoSearchControl({
      searchLabel: `Enter ${type} address...`,
      style: "bar",
      marker: { icon: icon },
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
    const coords = [e.location.y, e.location.x];

    if (type === "departure") {
      setMapData((prevState) => ({
        ...prevState,
        departureTown: address,
        departureCoords: coords,
      }));
    }

    if (type === "arrival") {
      setMapData((prevState) => ({
        ...prevState,
        arrivalTown: address,
        arrivalCoords: coords,
      }));
    }
  };

  const SearchDeparture = function () {
    const map = useMap();
    const searchControl = createSearchControl("departure", startIcon);

    useEffect(() => {
      map.addControl(searchControl);
      map.on("geosearch/showlocation", function (e) {
        getAddress(e, "departure");
      });
      return () => map.removeControl(searchControl);
    });

    useEffect(() => {
      if (localBus.departureCoords.length !== 0) {
        map.setView(localBus.departureCoords);
      }
      // eslint-disable-next-line
    }, [localBus.departureCoords]);

    useEffect(() => {
      if (mapData.departureCoords.length !== 0) {
        map.setView(mapData.departureCoords);
      }
      // eslint-disable-next-line
    }, [mapData.departureCoords]);
  };

  const SearchArrival = function () {
    const map = useMap();
    const searchControl = createSearchControl("arrival", finishIcon);

    useEffect(() => {
      map.addControl(searchControl);
      map.on("geosearch/showlocation", function (e) {
        getAddress(e, "arrival");
      });
      return () => map.removeControl(searchControl);
    });

    useEffect(() => {
      if (localBus.arrivalCoords.length !== 0) {
        map.setView(localBus.arrivalCoords);
      }

      // eslint-disable-next-line
    }, [localBus.arrivalCoords]);

    useEffect(() => {
      if (mapData.arrivalCoords.length !== 0) {
        map.setView(mapData.arrivalCoords);
      }
      // eslint-disable-next-line
    }, [mapData.arrivalCoords]);
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
          {!!localBus.departureTown && (
            <Marker position={localBus.departureCoords} icon={startIcon}>
              <Popup>
                <span>{localBus.departureTown}</span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <div className="departure-wrapper">
          <div className="title">Departure from:</div>
          <input
            type="text"
            disabled
            value={mapData.departureTown || localBus.departureTown}
          ></input>
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
          {!!localBus.arrivalTown && (
            <Marker position={localBus.arrivalCoords} icon={finishIcon}>
              <Popup>
                <span>{localBus.arrivalTown}</span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <div className="arrival-wrapper">
          <div className="title">Arrival in:</div>
          <input
            type="text"
            disabled
            value={mapData.arrivalTown || localBus.arrivalTown}
          ></input>
        </div>
      </div>
    </>
  );
}

export default Map;
