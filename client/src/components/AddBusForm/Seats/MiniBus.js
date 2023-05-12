import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/miniBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function MiniBus({ bus, chosenSeats, setChosenSeats }) {
  return (
    <div className="bus-wrapper mini">
      <img src={steer} className="driver-mini" alt="Driver's seat" />
      <img src={door} className="door-mini" alt="Exit doors" />
      <div className="front-seats-mini">
        <Seat
          number={1}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={2}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={3}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <div className="left-seats-mini">
        <Seat
          number={4}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={5}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={6}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={7}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={9}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={10}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <div className="right-seats-mini">
        <Seat
          number={8}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={11}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <div className="back-seats-mini">
        <Seat
          number={12}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={13}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={14}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={15}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={16}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
    </div>
  );
}

export default MiniBus;
