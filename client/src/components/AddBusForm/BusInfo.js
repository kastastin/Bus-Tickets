import React, { useEffect } from "react";
import { IMaskInput } from "react-imask";

import { getFormattedPhone } from "../../helpers/formatChanger";
import "../../resources/css/busInfo.css";

function BusInfo({
  isModalEdit,
  localBus,
  setLocalBus,
  chosenBus,
  isDataCorrect,
  setIsDataCorrect,
}) {
  useEffect(() => {
    if (!!!localBus.departureDate) {
      setLocalBus((prevState) => ({
        ...prevState,
        departureDate: new Date().toISOString().slice(0, 16),
        arrivalDate: new Date().toISOString().slice(0, 16),
      }));
    }

    // eslint-disable-next-line
  }, []);

  const checkDate = function () {
    const isValid =
      new Date(localBus.departureDate).getTime() >=
      new Date(localBus.arrivalDate).getTime();

    setIsDataCorrect((prevState) => ({
      ...prevState,
      date: isValid,
    }));
  };

  const checkPrice = function (value) {
    const intValue = parseInt(localBus.price);
    const isValid =
      intValue >= 0 && Number.isInteger(intValue) && intValue <= 5000;

    setIsDataCorrect((prevState) => ({
      ...prevState,
      price: isValid,
    }));
  };

  const checkNumber = function (value) {
    const isValid = value.length >= 4;

    setIsDataCorrect((prevState) => ({
      ...prevState,
      number: isValid,
    }));
  };

  const checkName = function (value) {
    const isValid = value.length >= 3;

    setIsDataCorrect((prevState) => ({
      ...prevState,
      name: isValid,
    }));
  };

  const checkContact = function (value) {
    console.log(value.length);
    const isValid = value.length === 11; // 12

    setIsDataCorrect((prevState) => ({
      ...prevState,
      contact: isValid,
    }));
  };

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
          <input type="text" value={localBus.departureTown} disabled />
        </div>

        <div className="arrival-wrapper">
          <div className="title">Arrival In</div>
          <input type="text" value={localBus.arrivalTown} disabled />
        </div>
      </div>
      <div className="dates">
        <div className="departure-date-wrapper">
          <div className="title">Date</div>
          <input
            type="datetime-local"
            value={localBus.departureDate}
            onChange={(e) => {
              setLocalBus((prevState) => ({
                ...prevState,
                departureDate: e.target.value,
              }));

              checkDate();
            }}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <div className="arrival-date-wrapper">
          <div className="title">Date</div>
          <input
            style={getBorderStyle(isDataCorrect.date)}
            type="datetime-local"
            value={localBus.arrivalDate}
            onChange={(e) => {
              setLocalBus((prevState) => ({
                ...prevState,
                arrivalDate: e.target.value,
              }));

              checkDate();
            }}
            min={localBus.departureDate}
          />
        </div>
      </div>
      <div className="bottom-part">
        <div className="seats">
          <div className="title">Seats:</div>
          <input type="text" value={localBus.seats} disabled />
        </div>
        <div className="type">
          <div className="title">Types:</div>
          <input type="text" value={localBus.type} disabled />
        </div>
        <div className="price">
          <div className="title">Price:</div>
          <input
            style={getBorderStyle(isDataCorrect.price)}
            type="text"
            title="From 1 to 4999"
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = value;
              setLocalBus((prevData) => ({
                ...prevData,
                price: value,
              }));

              checkPrice(localBus.price);
            }}
            placeholder="100"
          />
        </div>
        <div className="bus-number">
          <div className="title">Bus Number:</div>
          <input
            style={getBorderStyle(isDataCorrect.number)}
            type="text"
            title="Min 4 characters"
            onChange={(e) => {
              const { value } = e.target;
              setLocalBus((prevData) => ({
                ...prevData,
                number: value,
              }));

              checkNumber(localBus.number);
            }}
            placeholder="AA8965BK"
          />
        </div>
        <div className="driver-name">
          <div className="title">Driver's name:</div>
          <input
            style={getBorderStyle(isDataCorrect.name)}
            type="text"
            title="Min 3 characters"
            onChange={(e) => {
              const { value } = e.target;
              setLocalBus((prevData) => ({
                ...prevData,
                driverName: value,
              }));

              checkName(localBus.driverName);
            }}
            placeholder="Bob"
          />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver's contacts:</div>
          <IMaskInput
            style={getBorderStyle(isDataCorrect.contact)}
            mask="+{38} (000) 000-00-00"
            unmask="typed"
            onAccept={(value, mask) => {
              const phone = mask._unmaskedValue;
              setLocalBus((prevData) => ({
                ...prevData,
                driverContacts: phone,
              }));

              checkContact(localBus.driverContacts);
            }}
            placeholder="+38 (050) 320-10-30"
          />
        </div>
      </div>
    </div>
  );
}

export default BusInfo;
