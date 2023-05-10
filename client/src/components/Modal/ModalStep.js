import React from "react";

import Map from "../AddBusForm/Map";
import Seats from "../AddBusForm/Seats/Seats";
import BusInfo from "../AddBusForm/BusInfo";

function ModalStep({
  taskNumber,
  setTaskNumber,
  isModalEdit,
  localBus,
  setLocalBus,
  chosenBus,
  isDataCorrect,
  setIsDataCorrect,
  mapData,
  setMapData,
}) {
  switch (taskNumber) {
    case 1:
      return (
        <Map
          setTaskNumber={setTaskNumber}
          isModalEdit={isModalEdit}
          localBus={localBus}
          setLocalBus={setLocalBus}
          chosenBus={chosenBus}
          mapData={mapData}
          setMapData={setMapData}
        />
      );

    case 2:
      return (
        <Seats
          setTaskNumber={setTaskNumber}
          isModalEdit={isModalEdit}
          localBus={localBus}
          setLocalBus={setLocalBus}
          chosenBus={chosenBus}
        />
      );

    case 3:
      return (
        <BusInfo
          setTaskNumber={setTaskNumber}
          isModalEdit={isModalEdit}
          localBus={localBus}
          setLocalBus={setLocalBus}
          chosenBus={chosenBus}
          isDataCorrect={isDataCorrect}
          setIsDataCorrect={setIsDataCorrect}
        />
      );

    default:
      return;
  }
}

export default ModalStep;
