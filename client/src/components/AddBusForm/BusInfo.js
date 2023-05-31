import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import { loadStripe } from "@stripe/stripe-js";

import VerifyButton from "./VerifyButton";
import "react-phone-input-2/lib/style.css";
import "../../resources/css/busInfo.css";

const stripePromise = loadStripe(
  "pk_test_51McWMQHNTuuJuhvlFnLZPX8ZHwsGaPa15eXT9angOsRGGukWwdBDVhDduw7uoRkq7HOM7MFWpi5gvD2KrChlIZqM00R7Xm93Cy"
);

function BusInfo({
  buses,
  localBus,
  setLocalBus,
  isDataCorrect,
  setIsDataCorrect,
}) {
  const [existedNumbers, setExistedNumbers] = useState([]);

  useEffect(() => {
    if (!!!localBus.departureDate) {
      setLocalBus((prevState) => ({
        ...prevState,
        departureDate: new Date().toISOString().slice(0, 16),
        arrivalDate: new Date().toISOString().slice(0, 16),
      }));
    }

    setExistedNumbers(
      buses
        .filter((bus) => bus.number !== localBus.number)
        .map((bus) => bus.number)
    );
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
      number:
        localBus.number.length >= 4 &&
        !existedNumbers.some((num) => num === localBus.number),
    }));

    // Driver Name verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      name: localBus.driverName.length >= 3,
    }));

    // Driver Contacts verification
    setIsDataCorrect((prevState) => ({
      ...prevState,
      contact: isValidPhoneNumber(`+${localBus.driverContacts}`),
    }));
  }, [
    localBus.arrivalDate,
    localBus.departureDate,
    localBus.price,
    localBus.number,
    existedNumbers,
    localBus.driverName,
    localBus.driverContacts,
    setIsDataCorrect,
  ]);

  const getBorderStyle = function (isValid) {
    return { border: `2px solid ${isValid ? "#444" : "var(--secondary)"}` };
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
                arrivalDate: e.target.value,
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
            placeholder="Oleg"
          />
          <VerifyButton
            stripePromise={stripePromise}
            localBus={localBus}
            setLocalBus={setLocalBus}
          />
        </div>
        <div className="driver-contacts">
          <div className="title">Driver contacts:</div>
          <PhoneInput
            style={getBorderStyle(isDataCorrect.contact)}
            country={"ua"}
            value={localBus.driverContacts}
            onChange={(phone) => {
              setLocalBus((prevData) => ({
                ...prevData,
                driverContacts: phone,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BusInfo;
