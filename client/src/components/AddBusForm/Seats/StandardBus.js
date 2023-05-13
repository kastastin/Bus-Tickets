import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/standardBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function StandardBus({ bus, chosenSeats, setChosenSeats, reservedSeats }) {
  return (
    <div className="bus-wrapper standard">
      <img src={steer} className="driver-standard" alt="Driver's seat" />
      <img src={door} id="door-standard-1" alt="Exit doors" />
      <img src={door} id="door-standard-2" alt="Exit doors" />
      <div className="right-seats-front-standard">
        <Seat
          number={1}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={2}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
      </div>
      <div className="left-seats-standard">
        <Seat
          number={3}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={4}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={5}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={6}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={8}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={9}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={11}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={12}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={14}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={15}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={16}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={17}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
      </div>

      <div className="right-seats-middle-standard">
        <Seat
          number={7}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={10}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={13}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
      </div>

      <div className="right-seats-back-standard">
        <Seat
          number={18}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
      </div>

      <div className="back-seats-standard">
        <Seat
          number={19}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={20}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={21}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={22}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
        <Seat
          number={23}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
          reservedSeats={reservedSeats}
        />
      </div>
    </div>
  );
}

export default StandardBus;
