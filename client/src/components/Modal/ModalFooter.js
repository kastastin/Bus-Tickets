import React, { useState } from "react";

function ModalFooter({
  taskNumber,
  setTaskNumber,
  localBus,
  setLocalBus,
  formHandler,
  isDataCorrect,
  isModalEdit,
  mapData,
  notes,
}) {
  const [isNoteRed, setIsNoteRed] = useState(localStorage.addresses);

  const checkDataCorrect = () =>
    Object.values(isDataCorrect).every((val) => val === true);

  return (
    <div>
      {taskNumber !== 3 && (
        <>
          <button
            onMouseEnter={() => {
              if (!!!localBus.departureTown && taskNumber === 1)
                setIsNoteRed(true);
            }}
            onMouseLeave={() => setIsNoteRed(false)}
            onClick={() => {
              if (taskNumber === 2) setTaskNumber(3);
              if (localBus.departureTown && taskNumber === 1) {
                setTaskNumber(2);

                if (isModalEdit && !!mapData.departureTown) {
                  setLocalBus((prevState) => ({
                    ...prevState,
                    departureTown: mapData.departureTown,
                    departureCoords: mapData.departureCoords,
                  }));
                }

                if (isModalEdit && !!mapData.arrivalTown) {
                  setLocalBus((prevState) => ({
                    ...prevState,
                    arrivalTown: mapData.arrivalTown,
                    arrivalCoords: mapData.arrivalCoords,
                  }));
                }
              }
            }}
          >
            Next Step
          </button>
          {taskNumber === 2 && (
            <button className="prev-btn" onClick={() => setTaskNumber(1)}>
              Prev Step
            </button>
          )}
        </>
      )}
      {taskNumber === 3 && (
        <>
          <button
            onMouseEnter={() => {
              if (!checkDataCorrect()) setIsNoteRed(true);
            }}
            onMouseLeave={() => setIsNoteRed(false)}
            onClick={() => {
              if (checkDataCorrect()) formHandler();
            }}
          >
            {isModalEdit ? "Edit Bus" : "Add Bus"}
          </button>
          <button className="prev-btn" onClick={() => setTaskNumber(2)}>
            Prev Step
          </button>
        </>
      )}
      <i className={`ri-error-warning-line ${isNoteRed && "c-red"}`}></i>
      <p className={`note ${isNoteRed && "c-red"}`}>{notes[taskNumber - 1]}</p>
    </div>
  );
}

export default ModalFooter;
