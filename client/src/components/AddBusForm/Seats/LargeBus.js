import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/largeBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function LargeBus({ bus, chosenSeats, setChosenSeats }) {
  return (
    <div className="bus-wrapper large">
      <img src={steer} className="driver-large" alt="Driver's seat" />
      <img src={door} id="door-large-1" alt="Exit doors" />
      <img src={door} id="door-large-2" alt="Exit doors" />

      <div className="front-seat-large">
        <Seat
          number={1}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>

      <div className="right-front-seats-large">
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

      <div className="right-middle-seats-large">
        <Seat
          number={8}
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
          number={16}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={17}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={20}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={21}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={24}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={25}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>

      <div className="left-seats-large">
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
          number={10}
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
          number={18}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={19}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={22}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={23}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={26}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={27}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>

      <div className="back-seats-large">
        <Seat
          number={28}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={29}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={30}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={31}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
        <Seat
          number={32}
          bus={bus}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
    </div>
  );
}

export default LargeBus;
