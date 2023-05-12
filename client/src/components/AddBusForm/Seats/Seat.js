import React from "react";

import seat from "../../../resources/icons/seat.svg";
import reservedSeat from "../../../resources/icons/reserved-seat.svg";

function Seat({ bus, number, chosenSeats, setChosenSeats }) {
  return (
    <div
      className="seat-wrapper"
      title={number}
      onMouseEnter={(e) => {
        bus && (e.target.src = reservedSeat);
      }}
      onMouseLeave={(e) => {
        e.target.src = chosenSeats
          ? chosenSeats.includes(number)
            ? reservedSeat
            : seat
          : seat;
      }}
      onClick={() => {
        if (chosenSeats) {
          if (!chosenSeats.includes(number)) {
            setChosenSeats([...chosenSeats, number]);
          } else {
            setChosenSeats(chosenSeats.filter((seat) => seat !== number));
          }
        }
      }}
    >
      <img
        src={
          chosenSeats
            ? chosenSeats.includes(number)
              ? reservedSeat
              : seat
            : seat
        }
        alt="Passenger seat"
      />
      <span className="number">{number}</span>
    </div>
  );
}

export default Seat;
