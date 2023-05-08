import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

import "../../resources/css/busInfo.css";

function BusInfo() {
  const busType = JSON.parse(localStorage.getItem("busType")) || {
    type: "mini",
    seats: 16,
  };

  const address = JSON.parse(localStorage.getItem("address"));

  const [busData, setBusData] = useState({
    departure: {
      town: address.departure.town,
      coords: address.departure.coords,
      date: new Date().toISOString().slice(0, 16),
    },
    arrival: {
      town: address.arrival.town,
      coords: address.arrival.coords,
      date: "",
    },
    seats: busType.seats,
    type: busType.type,
    price: "",
    number: "",
    driverName: "",
    driverContact: "",
  });

  const [dateTimeDeparture, setDateTimeDeparture] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateTimeArrival, setDateTimeArrival] = useState(dateTimeDeparture);

  const [isDateCorrect, setIsDateCorrect] = useState(false);
  const [isPriceCorrect, setIsPriceCorrect] = useState(false);
  const [isNumberCorrect, setIsNumberCorrect] = useState(false);
  const [isDriverNameCorrect, setIsDriverNameCorrect] = useState(false);
  const [isDriverContactCorrect, setIsDriverContactCorrect] = useState(false);

  const isPositiveNumber = function (value) {
    const regex = /^[0-9]\d*$/;
    return !regex.test(value);
  };

  useEffect(() => {
    localStorage.setItem("busData", JSON.stringify(busData));

    if (
      new Date(dateTimeDeparture).getTime() >=
      new Date(dateTimeArrival).getTime()
    ) {
      localStorage.removeItem("busData");
      setIsDateCorrect(false);
    } else {
      setIsDateCorrect(true);
    }

    if (isPositiveNumber(busData.price)) {
      localStorage.removeItem("busData");
      setIsPriceCorrect(false);
    } else {
      setIsPriceCorrect(true);
    }

    if (busData.number.length < 4) {
      localStorage.removeItem("busData");
      setIsNumberCorrect(false);
    } else {
      setIsNumberCorrect(true);
    }

    if (busData.driverName.length < 3) {
      localStorage.removeItem("busData");
      setIsDriverNameCorrect(false);
    } else {
      setIsDriverNameCorrect(true);
    }

    if (busData.driverContact.length !== 12) {
      localStorage.removeItem("busData");
      setIsDriverContactCorrect(false);
    } else {
      setIsDriverContactCorrect(true);
    }
  }, [busData, dateTimeDeparture, dateTimeArrival]);

  const getBorderStyle = function (isValid) {
    return {
      border: `2px solid ${isValid ? "#444" : "var(--secondary)"}`,
    };
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
              setBusData((prevBusData) => ({
                ...prevBusData,
                departure: {
                  ...prevBusData.departure,
                  date: e.target.value,
                },
              }));
            }}
            min={dateTimeDeparture}
          />
        </div>
        <div className="arrival-date-wrapper">
          <div className="title">Date</div>
          <input
            style={getBorderStyle(isDateCorrect)}
            type="datetime-local"
            value={dateTimeArrival}
            onChange={(e) => {
              setDateTimeArrival(e.target.value);
              setBusData((prevBusData) => ({
                ...prevBusData,
                arrival: {
                  ...prevBusData.arrival,
                  date: e.target.value,
                },
              }));
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
        {/*  */}
        <div className="price">
          <div className="title">Price:</div>
          <input
            style={getBorderStyle(isPriceCorrect)}
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setBusData((prevData) => ({
                ...prevData,
                price: value,
              }));
            }}
            placeholder="100"
          />
        </div>
        {/*  */}
        <div className="bus-number">
          <div className="title">Bus Number:</div>
          <input
            style={getBorderStyle(isNumberCorrect)}
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setBusData((prevData) => ({
                ...prevData,
                number: value,
              }));
            }}
            placeholder="AA8965BK (min 4 signs)"
          />
        </div>
        <div className="driver-name">
          <div className="title">Driver's name:</div>
          <input
            style={getBorderStyle(isDriverNameCorrect)}
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setBusData((prevData) => ({
                ...prevData,
                driverName: value,
              }));
            }}
            placeholder="Bob (min 3 signs)"
          />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver's contacts:</div>
          <IMaskInput
            style={getBorderStyle(isDriverContactCorrect)}
            mask="+{38} (000) 000-00-00"
            unmask="typed"
            onAccept={(value, mask) => {
              const phone = mask._unmaskedValue;
              setBusData((prevData) => ({
                ...prevData,
                driverContact: phone,
              }));
            }}
            placeholder="+38 (050) 320-10-30"
          />
        </div>
      </div>
    </div>
  );
}

export default BusInfo;
