import React from "react";

import seatIcon from "../../../resources/icons/seat.svg";
import chosenSeatIcon from "../../../resources/icons/chosen-seat.svg";
import reservedSeatIcon from "../../../resources/icons/reserved-seat.svg";

function Seat({ bus, number, chosenSeats, setChosenSeats }) {
  return (
    <div
      className="seat-wrapper"
      title={number}
      onMouseEnter={(e) => {
        const src = e.target.src;
        if (!src.includes("reserved")) e.target.src = chosenSeatIcon;
      }}
      onMouseLeave={(e) => {
        const src = e.target.src;
        if (chosenSeats) {
          !src.includes("reserved") &&
            !chosenSeats.includes(number) &&
            (e.target.src = seatIcon);
        }
      }}
      onClick={(e) => {
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
          bus
            ? bus.reservedSeats.includes(number)
              ? reservedSeatIcon
              : seatIcon
            : seatIcon
        }
        alt="Passenger seat"
      />
      <span className="number">{number}</span>
    </div>
  );
}

export default Seat;
