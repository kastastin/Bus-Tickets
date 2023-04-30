import React, { useState } from "react";

import "../../resources/buses.css";
import AddBusForm from "../../components/AddBusForm";
import Map from "../../components/AddBusForm/Map";

function BusesAdmin() {
  const [isFormActive, setIsFormActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2 className="title">Buses List</h2>
        <button
          onClick={() => {
            setIsFormActive(true);
          }}
        >
          Add New Bus
        </button>
        <button
          onClick={() => {
            setIsMapActive(true);
          }}
        >
          Map
        </button>
      </div>
      {isFormActive && (
        <AddBusForm
          isFormActive={isFormActive}
          setIsFormActive={setIsFormActive}
          type="add"
        />
      )}
      {isMapActive && (
        <Map isMapActive={isMapActive} setIsMapActive={setIsMapActive} />
      )}
    </div>
  );
}

export default BusesAdmin;
