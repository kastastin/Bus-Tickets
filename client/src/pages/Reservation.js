import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

import { HideLoader, DisplayLoader } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { getDateAndTime } from "../helpers/formatChanger";
import logo from "../resources/logo.svg";
import "../resources/css/print.css";

function Reservation() {
  const dispatch = useDispatch();
  const printRef = useRef();
  const [pageSize, setPageSize] = useState();
  const [reservedSeats, setReservedSeats] = useState([]);
  const [chosenReservation, setChosenReservation] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const getReservationSeats = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post(
        "/api/seats/get-seats-by-user-id",
        {}
      );
      dispatch(HideLoader());

      const seats = response.data.data;
      response.data.success
        ? setReservedSeats(
            seats.map((seat) => {
              return {
                key: seat._id,
                ...seat.bus,
                ...seat,
              };
            })
          )
        : message.error(response.data.message);

      const seatsWithoutBus = seats.filter((seat) => seat.bus === null);

      seatsWithoutBus.forEach((seat) => removeSeats(seat._id));
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const removeSeats = async (seatsID) => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/seats/remove-seats", {
        _id: seatsID,
      });
      dispatch(HideLoader());

      response.data.success
        ? message.success(response.data.message)
        : message.error(response.data.message);

      getReservationSeats();
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReservationSeats();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPageSize(10);
    if (window.innerWidth < 1440) setPageSize(7);
    if (window.innerWidth < 1024) setPageSize(4);
    if (window.innerWidth < 768) setPageSize(3);
    if (window.innerWidth < 375) setPageSize(2);
  }, []);

  const reactPrintHandler = useReactToPrint({
    content: () => printRef.current,
  });

  const printHandler = function (reservation) {
    setChosenReservation(reservation);
    setIsModalActive(true);
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (text, record, index) => index + 1,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Departure From",
      dataIndex: "departureTown",
      align: "center",
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      align: "center",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Number",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      align: "center",
      render: (data) => data.join(", "),
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      render: (price, record) => {
        return `${price * record.seats.length}$`;
      },
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      align: "center",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Print",
      dataIndex: "action",
      align: "center",
      render: (action, record) => (
        <i
          className="ri-printer-fill print"
          onClick={() => printHandler(record)}
        ></i>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="title">Reservation List</h2>
      </div>

      <Modal
        title={`Print ticket with reserved seat${
          chosenReservation?.seats?.length > 1 ? "s" : ""
        }`}
        okText="Print"
        style={{
          top: "5rem",
        }}
        open={isModalActive}
        onOk={reactPrintHandler}
        onCancel={() => {
          setIsModalActive(false);
          setChosenReservation("null");
        }}
      >
        <div className="print-modal-wrapper" ref={printRef}>
          <div className="ticket-header">
            <img src={logo} alt="Bus Tickets Logo" />
            <p>Bus Tickets</p>
          </div>
          <div className="ticket-content">
            <div className="ticket-titles">
              <p>Email</p>
              <p>Departure From</p>
              <p>Departure Date</p>
              <p>Arrival In</p>
              <p>Arrival Date</p>
              <p>Bus Number</p>
              <p>Price</p>
              <p>Reserved</p>
            </div>
            <div className="ticket-values">
              <p>{chosenReservation?.user?.email}</p>
              <p>{chosenReservation?.departureTown}</p>
              <p>{getDateAndTime(chosenReservation?.departureDate)}</p>
              <p>{chosenReservation?.arrivalTown}</p>
              <p>{getDateAndTime(chosenReservation?.arrivalDate)}</p>
              <p>{chosenReservation?.number}</p>
              <p>
                {chosenReservation?.price * chosenReservation?.seats?.length}$
              </p>
              <p>{getDateAndTime(chosenReservation?.createdAt)}</p>
            </div>
          </div>
        </div>
      </Modal>

      <Table
        columns={columns}
        scroll={{ x: true }}
        dataSource={reservedSeats}
        pagination={{
          position: ["topLeft"],
          nextIcon: <RightOutlined style={{ color: "var(--primary)" }} />,
          prevIcon: <LeftOutlined style={{ color: "var(--primary)" }} />,
          pageSize: pageSize,
        }}
      />
    </div>
  );
}

export default Reservation;
