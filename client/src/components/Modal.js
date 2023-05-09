import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { DisplayLoader, HideLoader } from "../redux/alertsSlice";
import { message } from "antd";

import Map from "./AddBusForm/Map";
import Seats from "./AddBusForm/Seats/Seats";
import BusInfo from "./AddBusForm/BusInfo";
import "../resources/css/modal.css";

function Modal({ isModalActive, setIsModalActive }) {
  const dispatch = useDispatch();

  const formHandler = async () => {
    try {
      dispatch(DisplayLoader());
      const busData = JSON.parse(localStorage.getItem("busData"));

      let response = null;
      response = await axiosInstance.post("/api/buses/add-bus", {
        departureTown: busData.departure.town,
        departureCoords: busData.departure.coords,
        departureDate: busData.departure.date,
        arrivalTown: busData.arrival.town,
        arrivalCoords: busData.arrival.coords,
        arrivalDate: busData.arrival.date,
        seats: busData.seats,
        type: busData.type,
        price: busData.price,
        number: busData.number,
        driverName: busData.driverName,
        driverContacts: busData.driverContact,
      });
      response.data.success
        ? message.success(response.data.message)
        : message.error(response.data.message);

      dispatch(HideLoader());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoader());
    }
  };

  const [taskNumber, setTaskNumber] = useState(1);
  localStorage.removeItem("addresses");

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

  const Step = function () {
    switch (taskNumber) {
      case 1:
        return <Map setTaskNumber={setTaskNumber} />;

      case 2:
        return <Seats taskNumber={taskNumber} setTaskNumber={setTaskNumber} />;

      case 3:
        return (
          <BusInfo taskNumber={taskNumber} setTaskNumber={setTaskNumber} />
        );

      default:
    }
  };

  const Footer = function () {
    const [isNoteHighlight, setIsNoteHighlight] = useState(
      localStorage.getItem("addresses")
    );

    return (
      <div>
        {taskNumber !== 3 && (
          <>
            <button
              onMouseEnter={() => {
                if (!localStorage.getItem("addresses") && taskNumber === 1) {
                  setIsNoteHighlight(true);
                }
              }}
              onMouseLeave={() => {
                setIsNoteHighlight(false);
              }}
              onClick={() => {
                if (localStorage.getItem("address") && taskNumber === 2) {
                  setTaskNumber(3);
                }
                if (localStorage.getItem("addresses")) {
                  setTaskNumber(2);
                }
              }}
            >
              Next Step
            </button>
            {taskNumber === 2 && (
              <button
                className="prev-btn"
                onClick={() => {
                  setTaskNumber(1);
                }}
              >
                Prev Step
              </button>
            )}
          </>
        )}
        {taskNumber === 3 && (
          <>
            <button
              onMouseEnter={() => {
                if (!localStorage.getItem("busData")) {
                  setIsNoteHighlight(true);
                }
              }}
              onMouseLeave={() => {
                setIsNoteHighlight(false);
              }}
              onClick={() => {
                if (localStorage.getItem("busData")) {
                  formHandler();
                }
              }}
            >
              Add Bus
            </button>
            <button
              className="prev-btn"
              onClick={() => {
                setTaskNumber(2);
              }}
            >
              Prev Step
            </button>
          </>
        )}
        <i
          className={`ri-error-warning-line ${isNoteHighlight && "color-red"}`}
        ></i>
        <p className={`note ${isNoteHighlight && "color-red"}`}>
          {notes[taskNumber - 1]}
        </p>
      </div>
    );
  };

  return (
    <div>
      {isModalActive && (
        <div
          className="modal-mask"
          onClick={(e) => {
            if (e.target.classList.contains("modal-mask"))
              setIsModalActive(false);
          }}
        >
          <div className="modal">
            <i
              className="ri-close-circle-line close"
              onClick={() => setIsModalActive(false)}
            ></i>
            <div className="modal-wrapper">
              <div className="modal-header">
                <p className="step">Step {taskNumber}/3</p>
                <p className="title">Add New Bus</p>
              </div>
              <div className="task">{tasks[taskNumber - 1]}</div>
              <div className="modal-step">
                <Step />
              </div>

              <div className="modal-footer">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
