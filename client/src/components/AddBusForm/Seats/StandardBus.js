import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/standardBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function StandardBus() {
  return (
    <div className="bus-wrapper standard">
      <img src={steer} className="driver-standard" alt="Driver's seat" />
      <img src={door} id="door-standard-1" alt="Exit doors" />
      <img src={door} id="door-standard-2" alt="Exit doors" />
      <div className="right-seats-front-standard">
        <Seat number={1} />
        <Seat number={2} />
      </div>
      <div className="left-seats-standard">
        <Seat number={3} />
        <Seat number={4} />
        <Seat number={5} />
        <Seat number={6} />
        <Seat number={8} />
        <Seat number={9} />
        <Seat number={11} />
        <Seat number={12} />
        <Seat number={14} />
        <Seat number={15} />
        <Seat number={16} />
        <Seat number={17} />
      </div>

      <div className="right-seats-middle-standard">
        <Seat number={7} />
        <Seat number={10} />
        <Seat number={13} />
      </div>

      <div className="right-seats-back-standard">
        <Seat number={18} />
      </div>

      <div className="back-seats-standard">
        <Seat number={19} />
        <Seat number={20} />
        <Seat number={21} />
        <Seat number={22} />
        <Seat number={23} />
      </div>
    </div>
  );
}

export default StandardBus;
