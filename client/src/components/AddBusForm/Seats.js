import React, { useId } from "react";

import "../../resources/seats.css";
import door from "../../resources/icons/door.svg";
import steer from "../../resources/icons/steer.svg";
import seat from "../../resources/icons/seat.svg";
import reservedSeat from "../../resources/icons/reserved-seat.svg";

function Seats() {
  const Form = function () {
    const seatsNumberID = useId();
    const doorsNumberID = useId();

    const busTypeHandler = function (e) {
      switch (e.target.value) {
        case "standard":
          console.log("standard logic");
          break;

        case "large":
          console.log("large logic");
          break;

        default:
          console.log("mini default logic");
          break;
      }
    };

    return (
      <>
        <div className="form-wrapper">
          <div>
            <label htmlFor={seatsNumberID}>Number of seats:</label>
            <input
              type="number"
              name="seatsNumber"
              id={seatsNumberID}
              defaultValue="13"
            />
          </div>

          <div>
            <label htmlFor={doorsNumberID}>Number of doors:</label>
            <input
              type="number"
              name="doorsNumber"
              id={doorsNumberID}
              defaultValue="1"
            />
          </div>

          <div>
            <label>
              Choose bus type:
              <select name="busType" onChange={busTypeHandler}>
                <option value="mini">Mini</option>
                <option value="standard">Standard</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  };

  const Seat = function ({ number }) {
    return (
      <div
        className="seat-wrapper"
        onMouseEnter={(e) => {
          e.target.src = reservedSeat;
        }}
        onMouseLeave={(e) => {
          e.target.src = seat;
        }}
      >
        <img src={seat} alt="Passenger seat" />
        <span className="number">{number}</span>
      </div>
    );
  };

  return (
    <>
      <div className="left">
        <Form />
      </div>
      <div className="right">
        <div className="bus-wrapper">
          <img src={steer} className="driver" alt="Driver's seat" />
          <img src={door} className="door" alt="Exit doors" />
          <div className="left-seats">
            <Seat number={1} />
            <Seat number={2} />
            <Seat number={3} />
            <Seat number={4} />
            <Seat number={6} />
            <Seat number={7} />
          </div>
          <div className="right-seats">
            <Seat number={5} />
            <Seat number={8} />
          </div>
          <div className="back-seats">
            <Seat number={9} />
            <Seat number={10} />
            <Seat number={11} />
            <Seat number={12} />
            <Seat number={13} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Seats;
