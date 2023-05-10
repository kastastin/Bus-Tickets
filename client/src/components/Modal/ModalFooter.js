import React, { useState } from "react";

function ModalFooter({
  taskNumber,
  setTaskNumber,
  localBus,
  setLocalBus,
  formHandler,
  notes,
  isDataCorrect,
}) {
  const [isNoteHighlight, setIsNoteHighlight] = useState(
    localStorage.getItem("addresses")
  );

  return (
    <div>
      {taskNumber !== 3 && (
        <>
          <button
            onMouseEnter={() => {
              if (!!!localBus.departureTown && taskNumber === 1) {
                setIsNoteHighlight(true);
              }
            }}
            onMouseLeave={() => {
              setIsNoteHighlight(false);
            }}
            onClick={() => {
              if (taskNumber === 2) {
                setTaskNumber(3);
              }
              if (localBus.departureTown && taskNumber === 1) {
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
              if (!Object.values(isDataCorrect).every((val) => val === true)) {
                setIsNoteHighlight(true);
              }
            }}
            onMouseLeave={() => {
              setIsNoteHighlight(false);
            }}
            onClick={() => {
              if (Object.values(isDataCorrect).every(val => val === true)) {
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
}

export default ModalFooter;
