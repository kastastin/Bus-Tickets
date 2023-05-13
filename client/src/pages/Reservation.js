import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { HideLoader, DisplayLoader } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { getDateAndTime } from "../helpers/formatChanger";

function Reservation() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState();
  const [reservedSeats, setReservedSeats] = useState([]);

  const getReservationSeats = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post(
        "/api/seats/get-seats-by-user-id",
        {}
      );
      dispatch(HideLoader());

      response.data.success
        ? setReservedSeats(
            response.data.data.map((seats) => {
              return {
                key: seats._id,
                ...seats.bus,
                ...seats,
              };
            })
          )
        : message.error(response.data.message);
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

  const columns = [
    {
      title: "№",
      key: "index",
      render: (text, record, index) => index + 1,
      responsive: ["md"],
    },
    {
      title: "Departure From",
      dataIndex: "departureTown",
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Arrival In",
      dataIndex: "arrivalTown",
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (data) => {
        return data.join(", ");
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price, record) => {
        return `${price * record.seats.length}$`;
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (action, record) => (
    //     <div className="actions">
    //       <i
    //         className="ri-edit-2-fill"
    //         onClick={() => clickHandler(record)}
    //       ></i>
    //       <i
    //         className="ri-delete-bin-6-fill"
    //         onClick={() => {
    //           removeBus(record._id);
    //         }}
    //       ></i>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2 className="title">Reservation List</h2>
      </div>

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
