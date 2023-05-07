import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

import "../../resources/css/busInfo.css";

function BusInfo() {
  const [isBusDataCorrect, setIsBusDataCorrect] = useState(false);

  const checkBusData = function () {
    function getAllValues(obj) {
      const values = [];
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          getAllValues(obj[key]);
        } else {
          values.push(obj[key]);
          // if (obj[key] !== "no-valid") {
          //   setIsBusDataCorrect(true);
          // } else {
          //   setIsBusDataCorrect(false);
          // }
        }
      }
      return values;
    }

    const values = getAllValues(busData);

    if (values.includes("no-valid")) {
      setIsBusDataCorrect(false);
    } else {
      setIsBusDataCorrect(true);
    }
  };

  const busType = JSON.parse(localStorage.getItem("busType")) || {
    type: "mini",
    seats: 16,
  };

  const address = JSON.parse(localStorage.getItem("address"));

  const busData = {
    departure: {
      town: address.departure.town,
      coords: address.departure.coords,
      date: "no-valid",
    },
    arrival: {
      town: address.arrival.town,
      coords: address.arrival.coords,
      date: "no-valid",
    },
    seats: busType.seats,
    type: busType.type,
    number: "no-valid",
    driverName: "no-valid",
    driverContact: "no-valid",
  };

  const [dateTimeDeparture, setDateTimeDeparture] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateTimeArrival, setDateTimeArrival] = useState(dateTimeDeparture);
  const [isDateCorrect, setIsDateCorrect] = useState(false);

  useEffect(() => {
    if (
      new Date(dateTimeDeparture).getTime() <
      new Date(dateTimeArrival).getTime()
    ) {
      busData.departure.date = dateTimeDeparture;
      busData.arrival.date = dateTimeArrival;
      setIsDateCorrect(true);
    } else {
      setIsDateCorrect(false);
      setDateTimeArrival(dateTimeDeparture);
      busData.departure.date = "no-valid";
      busData.arrival.date = "no-valid";
    }
  }, [dateTimeDeparture, dateTimeArrival, busData.departure, busData.arrival]);

  const inputBorder = {
    border: `2px solid ${isDateCorrect ? "#444" : "var(--secondary)"}`,
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
          <input
            type="datetime-local"
            value={dateTimeDeparture}
            onChange={(e) => {
              setDateTimeDeparture(e.target.value);
              checkBusData();
            }}
            min={dateTimeDeparture}
          />
        </div>
        <div className="arrival-date-wrapper">
          <div className="title">Date</div>
          <input
            style={inputBorder}
            type="datetime-local"
            value={dateTimeArrival}
            onChange={(e) => {
              setDateTimeArrival(e.target.value);
              checkBusData();
            }}
            min={dateTimeDeparture}
          />
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
          <input
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              busData.number = value.length > 3 ? value : "no-valid";
              checkBusData();
            }}
            placeholder="AA8965BK (min 4 signs)"
          />
        </div>
        <div className="driver-name">
          <div className="title">Driver's name:</div>
          <input
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              busData.driverName = value.length > 2 ? value : "no-valid";
              checkBusData();
            }}
            placeholder="Bob (min 3 signs)"
          />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver's contacts:</div>
          <IMaskInput
            mask="+{38} (000) 000-00-00"
            unmask="typed"
            onAccept={(value, mask) => {
              const phone = mask._unmaskedValue;
              busData.driverContact = phone.length === 12 ? phone : "no-valid";
              checkBusData();
            }}
            placeholder="+38 (050) 320-10-30"
          />
        </div>
      </div>
    </div>
  );
}

export default BusInfo;
