import React from "react";

import Seat from "./Seat";
import "../../../resources/css/BusTypes/miniBus.css";
import door from "../../../resources/icons/door.svg";
import steer from "../../../resources/icons/steer.svg";

function MiniBus() {
  return (
    <div className="bus-wrapper mini">
      <img src={steer} className="driver-mini" alt="Driver's seat" />
      <img src={door} className="door-mini" alt="Exit doors" />
      <div className="front-seats-mini">
        <Seat number={1} />
        <Seat number={2} />
        <Seat number={3} />
      </div>
      <div className="left-seats-mini">
        <Seat number={4} />
        <Seat number={5} />
        <Seat number={6} />
        <Seat number={7} />
        <Seat number={9} />
        <Seat number={10} />
      </div>
      <div className="right-seats-mini">
        <Seat number={8} />
        <Seat number={11} />
      </div>
      <div className="back-seats-mini">
        <Seat number={12} />
        <Seat number={13} />
        <Seat number={14} />
        <Seat number={15} />
        <Seat number={16} />
      </div>
    </div>
  );
}

export default MiniBus;
