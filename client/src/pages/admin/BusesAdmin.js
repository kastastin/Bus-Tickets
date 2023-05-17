import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { HideLoader, DisplayLoader } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getDateAndTime } from "../../helpers/formatChanger";
import { isEmpty } from "../../helpers/cheker";
import Modal from "../../components/Modal/Modal";

import "../../resources/css/table.css";

function BusesAdmin() {
  const dispatch = useDispatch();

  const [buses, setBuses] = useState([]);
  const [pageSize, setPageSize] = useState();
  const [chosenBus, setChosenBuses] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEdit, setisModalEdit] = useState(false);

  const getBusesList = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/buses/get-buses", {});
      dispatch(HideLoader());

      const buses = response.data.data;

      response.data.success
        ? setBuses(buses)
        : message.error(response.data.message);

      const oldBuses = buses.filter(
        (bus) => new Date(bus.departureDate) < new Date()
      );

      oldBuses.forEach((bus) => removeBus(bus._id));
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const removeBus = async (busID) => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/buses/remove-bus", {
        _id: busID,
      });
      dispatch(HideLoader());

      response.data.success
        ? message.success(response.data.message)
        : message.error(response.data.message);

      getBusesList();
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBusesList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPageSize(10);
    if (window.innerWidth < 1440) setPageSize(7);
    if (window.innerWidth < 1024) setPageSize(4);
    if (window.innerWidth < 768) setPageSize(3);
    if (window.innerWidth < 375) setPageSize(2);
  }, []);

  const clickHandler = function (value) {
    if (window.innerWidth > 991) {
      if (!isEmpty(value)) setChosenBuses(value);
      setIsModalActive(true);
      setisModalEdit(!isEmpty(value));
    } else {
      message.error("Your screen is too small. Try using another device!");
    }
  };

  const columns = [
    {
      title: "№",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1,
      responsive: ["md"],
    },
    {
      title: "Departure From",
      align: "center",
      dataIndex: "departureTown",
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      align: "center",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Arrival In",
      align: "center",
      dataIndex: "arrivalTown",
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      align: "center",
      render: (text) => <span>{getDateAndTime(text)}</span>,
    },
    {
      title: "Number",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      render: (text) => <span>{text}$</span>,
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (action, record) => (
        <div className="table-actions-wrapper">
          <i
            className="ri-edit-2-fill"
            onClick={() => clickHandler(record)}
          ></i>
          <i
            className="ri-delete-bin-6-fill"
            onClick={() => {
              removeBus(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="title">Buses List</h2>
        <button onClick={() => clickHandler({})}>Add New Bus</button>
      </div>

      <Table
        columns={columns}
        scroll={{ x: true }}
        dataSource={buses.map((bus) => ({ ...bus, key: bus._id }))}
        pagination={{
          position: ["topLeft"],
          nextIcon: <RightOutlined style={{ color: "var(--primary)" }} />,
          prevIcon: <LeftOutlined style={{ color: "var(--primary)" }} />,
          pageSize: pageSize,
        }}
      />

      {isModalActive && (
        <Modal
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
          isModalEdit={isModalEdit}
          chosenBus={chosenBus}
          buses={buses}
          getBuses={getBusesList}
        />
      )}
    </div>
  );
}

export default BusesAdmin;
