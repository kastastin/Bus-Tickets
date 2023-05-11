import React from "react";

import Map from "../AddBusForm/Map";
import Seats from "../AddBusForm/Seats/Seats";
import BusInfo from "../AddBusForm/BusInfo";

function ModalStep({
  taskNumber,
  localBus,
  setLocalBus,
  isDataCorrect,
  setIsDataCorrect,
  mapData,
  setMapData,
}) {
  switch (taskNumber) {
    case 1:
      return (
        <Map
          localBus={localBus}
          setLocalBus={setLocalBus}
          mapData={mapData}
          setMapData={setMapData}
        />
      );

    case 2:
      return (
        <Seats
          localBus={localBus}
          setLocalBus={setLocalBus}
        />
      );

    case 3:
      return (
        <BusInfo
          localBus={localBus}
          setLocalBus={setLocalBus}
          isDataCorrect={isDataCorrect}
          setIsDataCorrect={setIsDataCorrect}
        />
      );

    default:
      return;
  }
}

export default ModalStep;
