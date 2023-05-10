import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../helpers/axiosInstance";
import { DisplayLoader, HideLoader } from "../../redux/alertsSlice";
import { message } from "antd";

import ModalStep from "./ModalStep";
import ModalFooter from "./ModalFooter";
import "../../resources/css/modal.css";

function Modal({
  isModalActive,
  setIsModalActive,
  isModalEdit,
  chosenBus,
  getBuses,
}) {
  const [localBus, setLocalBus] = useState({
    departureTown: "",
    departureCoords: [],
    departureDate: "",
    arrivalTown: "",
    arrivalCoords: [],
    arrivalDate: "",
    seats: "",
    type: "",
    price: "",
    number: "",
    driverName: "",
    driverContacts: "",
  });

  useEffect(() => {
    if (isModalEdit) {
      setLocalBus(chosenBus);
    }
  }, [setLocalBus, chosenBus, isModalEdit]);

  const [isDataCorrect, setIsDataCorrect] = useState({
    date: false,
    price: false,
    number: false,
    name: false,
    contact: false,
  });

  const dispatch = useDispatch();
  const [taskNumber, setTaskNumber] = useState(1);

  const formHandler = async () => {
    try {
      dispatch(DisplayLoader());

      console.log(localBus);

      let response = null;
      if (!isModalEdit) {
        response = await axiosInstance.post("/api/buses/add-bus", localBus);
      } else {
        response = await axiosInstance.post("/api/buses/edit-bus", {
          ...localBus,
          _id: localBus._id,
        });
      }

      response.data.success
        ? message.success(response.data.message)
        : message.error(response.data.message);

      getBuses();
      setIsModalActive(false);

      dispatch(HideLoader());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoader());
    }
  };

  const [mapData, setMapData] = useState({
    departureTown: isModalEdit ? localBus.departureTown : "",
    departureCoords: isModalEdit ? localBus.departureCoords : "",
    arrivalTown: isModalEdit ? localBus.arrivalTown : "",
    arrivalCoords: isModalEdit ? localBus.arrivalCoords : "",
  });

  const tasks = [
    "Choose deaprture and arrival",
    "Bus layout seats",
    "Enter additional information correctly",
  ];

  const notes = [
    "Use search bar on the map to choose departure and arrival",
    "Choose bus type",
    "Enter additional information",
  ];

  const modalMaskClickHandler = function (e) {
    if (e.target.classList.contains(["modal-mask"])) setIsModalActive(false);
  };

  return (
    <>
      {isModalActive && (
        <div className="modal-mask" onClick={modalMaskClickHandler}>
          <div className="modal">
            <i
              className="ri-close-circle-line close"
              onClick={() => setIsModalActive(false)}
            ></i>
            <div className="modal-wrapper">
              <div className="modal-header">
                <p className="step">Step {taskNumber}/3</p>
                <p className="title">{isModalEdit ? 'Edit Bus' : 'Add New Bus'}</p>
              </div>
              <div className="task">{tasks[taskNumber - 1]}</div>
              <div className="modal-step">
                <ModalStep
                  taskNumber={taskNumber}
                  setTaskNumber={setTaskNumber}
                  isModalEdit={isModalEdit}
                  localBus={localBus}
                  setLocalBus={setLocalBus}
                  chosenBus={chosenBus}
                  isDataCorrect={isDataCorrect}
                  setIsDataCorrect={setIsDataCorrect}
                  mapData={mapData}
                  setMapData={setMapData}
                />
              </div>
              <div className="modal-footer">
                <ModalFooter
                  taskNumber={taskNumber}
                  setTaskNumber={setTaskNumber}
                  localBus={localBus}
                  setLocalBus={setLocalBus}
                  formHandler={formHandler}
                  notes={notes}
                  isDataCorrect={isDataCorrect}
                  setIsDataCorrect={setIsDataCorrect}
                  isModalEdit={isModalEdit}
                  setIsModalActive={setIsModalActive}
                  getBuses={getBuses}
                  mapData={mapData}
                  setMapData={setMapData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
