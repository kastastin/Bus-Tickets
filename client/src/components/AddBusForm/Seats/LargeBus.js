import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/largeBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function LargeBus() {
  return (
    <div className="bus-wrapper large">
      <img src={steer} className="driver-large" alt="Driver's seat" />
      <img src={door} id="door-large-1" alt="Exit doors" />
      <img src={door} id="door-large-2" alt="Exit doors" />

      <div className="left-seats-large">
        <Seat number={4} />
        <Seat number={5} />
        <Seat number={6} />
        <Seat number={7} />
        <Seat number={10} />
        <Seat number={11} />
        <Seat number={14} />
        <Seat number={15} />
        <Seat number={18} />
        <Seat number={19} />
        <Seat number={22} />
        <Seat number={23} />
        <Seat number={26} />
        <Seat number={27} />
      </div>

      <div className="front-seat-large">
        <Seat number={1} />
      </div>

      <div className="right-front-seats-large">
        <Seat number={2} />
        <Seat number={3} />
      </div>

      <div className="right-middle-seats-large">
        <Seat number={8} />
        <Seat number={9} />
        <Seat number={12} />
        <Seat number={13} />
        <Seat number={16} />
        <Seat number={17} />
        <Seat number={20} />
        <Seat number={21} />
        <Seat number={24} />
        <Seat number={25} />
      </div>

      <div className="back-seats-large">
        <Seat number={28} />
        <Seat number={29} />
        <Seat number={30} />
        <Seat number={31} />
        <Seat number={32} />
      </div>
    </div>
  );
}

export default LargeBus;
