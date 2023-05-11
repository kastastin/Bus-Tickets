import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../src/helpers/axiosInstance";
import { HideLoader, DisplayLoader } from "../../src/redux/alertsSlice";
import { useParams } from "react-router-dom";

import { getDateAndTime } from "../../src/helpers/formatChanger";
import { getFormattedPhone } from "../../src/helpers/formatChanger";
import "../resources/css/bus.css";
import MiniBus from "../components/AddBusForm/Seats/MiniBus";
import StandardBus from "../components/AddBusForm/Seats/StandardBus";
import LargeBus from "../components/AddBusForm/Seats/LargeBus";

function Bus() {
  const dispatch = useDispatch();
  const params = useParams();
  const [bus, setBus] = useState(null);

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
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
    // eslint-disable-next-line
  }, []);

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
                <p>{bus.driverName}</p>
                <p>{getFormattedPhone(bus.driverContacts)}</p>
              </div>
            </div>
            <div className="choose-seats">
              <div className="seats-wrapper">
                <i className="ri-file-info-line"></i>
                <div className="note">Сhoose a free seat in the bus</div>
              </div>
            </div>
          </div>
          <div className="bus-book-seats">
            {/* <MiniBus /> */}
            <StandardBus />
            {/* <LargeBus /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Bus;