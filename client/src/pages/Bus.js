import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../src/helpers/axiosInstance";
import { HideLoader, DisplayLoader } from "../../src/redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import parsePhoneNumber from "libphonenumber-js";

import MiniBus from "../components/AddBusForm/Seats/MiniBus";
import StandardBus from "../components/AddBusForm/Seats/StandardBus";
import LargeBus from "../components/AddBusForm/Seats/LargeBus";
import { getDateAndTime } from "../../src/helpers/formatChanger";
import "../resources/css/bus.css";

function Bus() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  const displayError = function (error) {
    dispatch(HideLoader());
    message.error(error);
  };

  const getBus = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoader());

      response.data.success
        ? setBus(response.data.data)
        : message.error(response.data.message);
    } catch (error) {
      displayError(error.message);
    }
  };

  const getReservationSeats = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post(
        "/api/seats/get-seats-by-user-id",
        {}
      );
      dispatch(HideLoader());

      if (!response.data.success) {
        message.error(response.data.message);
      } else {
        const data = response.data.data
          .map((seats) => {
            return {
              key: seats._id,
              ...seats.bus,
              ...seats,
            };
          })
          .filter((data) => data.bus._id === params.id);

        setReservedSeats(data[0]?.seats);
      }
    } catch (error) {
      displayError(error.message);
    }
  };

  useEffect(() => {
    getBus();
    getReservationSeats();
    // eslint-disable-next-line
  }, []);

  const bookingSeat = async (transactionId) => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/seats/book-seat", {
        bus: bus._id,
        seats: chosenSeats,
        transactionId,
      });
      dispatch(HideLoader());

      response.data.success
        ? message.success(response.data.message)
        : message.error(response.data.message);

      navigate("/reservation");
    } catch (error) {
      displayError(error.message);
    }
  };

  const tokenHandler = async (token) => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/seats/stripe-payment", {
        token,
        price: bus.price * chosenSeats.length * 100,
      });
      dispatch(HideLoader());

      if (!response.data.success) {
        message.error(response.data.message);
      } else {
        message.success(response.data.message);
        bookingSeat(response.data.data.transactionId);
      }
    } catch (error) {
      displayError(error.message);
    }
  };

  const getChoosenBusType = function (type) {
    switch (type) {
      case "mini":
        return (
          <MiniBus
            bus={bus}
            chosenSeats={chosenSeats}
            setChosenSeats={setChosenSeats}
            reservedSeats={reservedSeats}
          />
        );
      case "standard":
        return (
          <StandardBus
            bus={bus}
            chosenSeats={chosenSeats}
            setChosenSeats={setChosenSeats}
            reservedSeats={reservedSeats}
          />
        );
      case "large":
        return (
          <LargeBus
            bus={bus}
            chosenSeats={chosenSeats}
            setChosenSeats={setChosenSeats}
            reservedSeats={reservedSeats}
          />
        );

      default:
    }
  };

  return (
    <div className="bus-book">
      {bus && (
        <>
          <div className="bus-book-info">
            <div className="destination">
              <div className="departure">
                <div>
                  <div className="title">Departure From</div>
                  <div className="data">{bus.departureTown}</div>
                  <div className="date">
                    {getDateAndTime(bus.departureDate)}
                  </div>
                </div>
              </div>
              <i className="ri-arrow-right-double-fill arrow"></i>
              <div className="arrival">
                <div>
                  <div className="title">Arrival In</div>
                  <div className="data">{bus.arrivalTown}</div>
                  <div className="date">{getDateAndTime(bus.arrivalDate)}</div>
                </div>
              </div>
            </div>
            <div className="additional-info">
              <div className="title-wrapper">
                <p>Price:</p>
                <p>Number:</p>
                <p>Driver name:</p>
                <p>Contacts:</p>
              </div>
              <div className="value-wrapper">
                <p>{bus.price}$</p>
                <p>{bus.number}</p>
                <p className="driver-name-bus">
                  {bus.driverName}
                  {bus.isDriverIdentified && (
                    <i
                      className="ri-pass-valid-line"
                      title="Driver identified"
                      style={{
                        color: "var(--primary)",
                        cursor: "default",
                      }}
                    />
                  )}
                </p>
                <p>
                  {parsePhoneNumber(
                    `+${bus.driverContacts}`
                  ).formatInternational()}
                </p>
              </div>
            </div>
            <div className="choose-seats">
              <div className="seats-wrapper">
                {!reservedSeats && !chosenSeats.at(0) && (
                  <div className="initial-seats">
                    <i className="ri-file-info-line"></i>
                    <div className="note">Сhoose a free seat in the bus</div>
                  </div>
                )}
                {chosenSeats.at(0) && (
                  <>
                    <div className="chosen-seats">
                      <div className="title">
                        Chosen Seat{chosenSeats.length > 1 && "s"}:
                      </div>
                      <div className="values">{chosenSeats.join(", ")}</div>
                    </div>
                    <StripeCheckout
                      stripeKey="pk_test_51McWMQHNTuuJuhvlFnLZPX8ZHwsGaPa15eXT9angOsRGGukWwdBDVhDduw7uoRkq7HOM7MFWpi5gvD2KrChlIZqM00R7Xm93Cy"
                      token={tokenHandler}
                      amount={bus.price * chosenSeats.length * 100}
                    >
                      <div className="pay">Pay</div>
                    </StripeCheckout>
                  </>
                )}
                {reservedSeats && (
                  <div className="your-reserved-seats">
                    <p className="title">Your reserved seats:</p>
                    <p className="value">{reservedSeats.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bus-book-seats">{getChoosenBusType(bus.type)}</div>
        </>
      )}
    </div>
  );
}

export default Bus;
