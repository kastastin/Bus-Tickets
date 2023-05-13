import React from "react";

import seatIcon from "../../../resources/icons/seat.svg";
import chosenSeatIcon from "../../../resources/icons/chosen-seat.svg";
import reservedSeatIcon from "../../../resources/icons/reserved-seat.svg";

function Seat({ bus, number, chosenSeats, setChosenSeats, reservedSeats }) {
  const onMouseEnterHandler = function (e) {
    const src = e.target.src;
    if (src && !src.includes("reserved")) e.target.src = chosenSeatIcon;
  };

  const onMouseLeaveHandler = function (e) {
    const src = e.target.src;
    const noChosenSeats = src && !src.includes("reserved");
    const isChosenSeat = chosenSeats && !chosenSeats.includes(number);

    if (noChosenSeats && isChosenSeat) e.target.src = seatIcon;
  };

  const onClickHandler = function () {
    const noChosenSeats = chosenSeats && !chosenSeats.includes(number);

    setChosenSeats(
      noChosenSeats
        ? [...chosenSeats, number]
        : chosenSeats.filter((seat) => seat !== number)
    );
  };

  const getSrc = function () {
    if (reservedSeats && reservedSeats.includes(number)) return chosenSeatIcon;
    if (bus && bus.reservedSeats.includes(number)) return reservedSeatIcon;

    return seatIcon;
  };

  const getType = function () {
    const isReservedSeats = !!reservedSeats;
    const isChosenSeats = !!!chosenSeats;

    const isSeatsActive = !isReservedSeats && !isChosenSeats;

    return isSeatsActive ? (
      <div
        className="seat-wrapper"
        title={number}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        onClick={onClickHandler}
      >
        <img src={getSrc()} alt="Passenger seat" />
        <span className="number">{number}</span>
      </div>
    ) : (
      <div className="seat-wrapper" title={number}>
        <img src={getSrc()} alt="Passenger seat" />
        <span className="number">{number}</span>
      </div>
    );
  };

  return <>{getType()}</>;
}

export default Seat;
