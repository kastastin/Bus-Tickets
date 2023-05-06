import React, { useState } from "react";

import Map from "./AddBusForm/Map";
import Seats from "./AddBusForm/Seats/Seats";
import BusInfo from "./AddBusForm/BusInfo";
import "../resources/css/modal.css";

function Modal({ isModalActive, setIsModalActive }) {
  const [taskNumber, setTaskNumber] = useState(1);
  localStorage.removeItem("addresses");

  const tasks = [
    "Choose deaprture and arrival",
    "Bus layout seats",
    "Enter additional information",
  ];

  const notes = [
    "Use search bar on the map to choose departure and arrival",
    "Choose bus type",
    "Fill in the new information and check the old one",
  ];

  const Step = function () {
    switch (taskNumber) {
      case 3:
        return <Map setTaskNumber={setTaskNumber} />;

      case 2:
        return <Seats taskNumber={taskNumber} setTaskNumber={setTaskNumber} />;

      case 1:
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
            // if (localStorage.getItem("address")) return;

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
            if (!localStorage.getItem("addresses")) return;

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
