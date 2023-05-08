import React, { useState } from "react";
import { message } from "antd";

import Modal from "../../components/Modal";
import "../../resources/css/buses.css";

function BusesAdmin() {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2 className="title">Buses List</h2>
        <button
          onClick={() => {
            window.innerWidth > 991
              ? setIsModalActive(true)
              : message.error("Your screen is too small. Try using another device!");
          }}
        >
          Add New Bus
        </button>
      </div>
      {isModalActive && (
        <Modal
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
        />
      )}
    </div>
  );
}

export default BusesAdmin;
