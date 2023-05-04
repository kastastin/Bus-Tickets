import React from "react";

import seat from "../../../resources/icons/seat.svg";
import reservedSeat from "../../../resources/icons/reserved-seat.svg";

function Seat({ number }) {
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
}

export default Seat;
