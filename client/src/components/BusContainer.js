import React from "react";

import { getDateAndTime } from "../../src/helpers/formatChanger";
import "../resources/css/busContainer.css";

function BusContainer({ busData }) {
  return (
    <div className="bus-wrapper">
      <div className="direction">
        <div>
          <div className="title">Departure From</div>
          <div className="data">{busData.departureTown}</div>
          <div className="date">{getDateAndTime(busData.departureDate)}</div>
        </div>
      </div>
      <i className="ri-arrow-right-double-fill arrow"></i>
      <div className="direction">
        <div>
          <div className="title">Arrival In</div>
          <div className="data">{busData.arrivalTown}</div>
          <div className="date">{getDateAndTime(busData.departureDate)}</div>
        </div>
      </div>
    </div>
  );
}

export default BusContainer;
