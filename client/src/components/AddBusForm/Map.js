import React from "react";

import Modal from "../../components/Modal";
import "../../resources/modal.css";

function Map({ isMapActive, setIsMapActive }) {
  return (
    <Modal isModalActive={isMapActive} setIsFormActive={setIsMapActive}>
      <p>Map</p>
    </Modal>
  );
}

export default Map;
