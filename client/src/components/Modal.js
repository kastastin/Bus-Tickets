import React, { useState } from "react";

import Map from "./AddBusForm/Map";
import Seats from "./AddBusForm/Seats";
import BusInfo from "./AddBusForm/BusInfo";
import "../resources/modal.css";

function Modal({ isModalActive, setIsModalActive }) {
  const [taskNumber, setTaskNumber] = useState(1);
  localStorage.removeItem("addresses");

  const tasks = [
    "Choose deaprture and arrival",
    "Choose bus type and available seats",
  ];

  const notes = [
    "Use search bar on the map to choose departure and arrival",
    "Note for seats",
  ];

  const addInfoToLocalStorage = function () {
    const newBusData = {
      departure: localStorage.getItem("addresses")[0],
      arrival: localStorage.getItem("addresses")[1],
    };
    localStorage.setItem("newBusData", JSON.stringify(newBusData));
  };

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
        <button
          onMouseEnter={() => {
            if (!localStorage.getItem("addresses")) {
              setIsNoteHighlight(true);
            }
          }}
          onMouseLeave={() => {
            setIsNoteHighlight(false);
          }}
          onClick={() => {
            if (!localStorage.getItem("addresses")) return;

            addInfoToLocalStorage();
            setTaskNumber(2);
          }}
        >
          Next Step
        </button>
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
                <Footer data={localStorage.getItem("addresses")} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
