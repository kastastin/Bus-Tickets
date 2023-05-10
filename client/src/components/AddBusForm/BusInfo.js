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

  useEffect(() => {
    // Date verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      date:
        new Date(localBus.departureDate).getTime() <
        new Date(localBus.arrivalDate).getTime(),
    }));

    // Price verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      price:
        parseInt(localBus.price) >= 0 &&
        parseInt(localBus.price) <= 5000 &&
        typeof parseInt(localBus.price) === "number" &&
        !isNaN(localBus.price),
    }));

    // Bus Number verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      number: localBus.number.length >= 4,
    }));

    // Driver Name verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      name: localBus.driverName.length >= 3,
    }));

    // Driver Contacts verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      contact: localBus.driverContacts.length === 12,
    }));
  }, [
    localBus.arrivalDate,
    localBus.departureDate,
    localBus.price,
    localBus.number,
    localBus.driverName,
    localBus.driverContacts,
    setIsDataCorrect,
  ]);

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
            title="From 1 to 5000"
            value={localBus.price}
            onChange={(e) => {
              setLocalBus((prevData) => ({
                ...prevData,
                price: e.target.value,
              }));
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
            value={localBus.number}
            onChange={(e) => {
              setLocalBus((prevData) => ({
                ...prevData,
                number: e.target.value,
              }));
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
            value={localBus.driverName}
            onChange={(e) => {
              setLocalBus((prevData) => ({
                ...prevData,
                driverName: e.target.value,
              }));
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
              value = localBus.driverContacts;
              const phone = mask._unmaskedValue;
              setLocalBus((prevData) => ({
                ...prevData,
                driverContacts: phone,
              }));
            }}
            placeholder={
              !!localBus.driverContacts
                ? getFormattedPhone(localBus.driverContacts)
                : "+38 (050) 320-10-30"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BusInfo;
