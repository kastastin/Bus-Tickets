import React from "react";

import "../../resources/css/busInfo.css";

function BusInfo() {
  const address = JSON.parse(localStorage.getItem("address"));
  const busType = JSON.parse(localStorage.getItem("busType")) || {
    type: "mini",
    seats: 16,
  };

  return (
    <div className="bus-info-wrapper">
      <div className="arrow">
        <i className="ri-arrow-right-double-fill"></i>
      </div>
      <div className="addresses">
        <div className="departure-wrapper">
          <div className="title">Departure From</div>
          <input type="text" value={address.departure.town} disabled />
        </div>

        <div className="arrival-wrapper">
          <div className="title">Arrival In</div>
          <input type="text" value={address.arrival.town} disabled />
        </div>
      </div>
      <div className="dates">
        <div className="departure-date-wrapper">
          <div className="title">Date</div>
          <input type="datetime-local" />
        </div>
        <div className="arrival-date-wrapper">
          <div className="title">Date</div>
          <input type="datetime-local" />
        </div>
      </div>
      <div className="bottom-part">
        <div className="seats">
          <div className="title">Seats:</div>
          <input type="text" value={busType.seats} disabled />
        </div>
        <div className="type">
          <div className="title">Types:</div>
          <input type="text" value={busType.type} disabled />
        </div>
        <div className="bus-number">
          <div className="title">Bus Number:</div>
          <input type="text" />
        </div>
        <div className="driver-name">
          <div className="title">Driver's name:</div>
          <input type="text" />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver's contacts:</div>
          <input type="tel" />
        </div>
      </div>
      {/* <div className="bus-layout">
        <div className="type">
          <div className="title">Type:</div>
          <input type="text" value={busType.type} disabled />
        </div>
        <div className="seats">
          <div className="title">Seats:</div>
          <input type="number" value={busType.seats} disabled />
        </div>
      </div>
      <div className="driver">
        <div className="driver-name">
          <div className="title">Driver's name:</div>
          <input type="text" />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver's contacts:</div>
          <input type="tel" />
        </div>
      </div>
      <div className="bus-number">
        <div className="title">Bus Number:</div>
        <input type="text" />
      </div> */}
    </div>
  );
}

export default BusInfo;
