import React, { useState } from "react";

import "../../resources/buses.css";
import AddBusForm from "../../components/AddBusForm";

function BusesAdmin() {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2 className="title">Buses List</h2>
        <button onClick={() => {setIsFormActive(true)}}>Add New Bus</button>
      </div>
      {isFormActive && (
        <AddBusForm
          isFormActive={isFormActive}
          setIsFormActive={setIsFormActive}
        />
      )}
    </div>
  );
}

export default BusesAdmin;
