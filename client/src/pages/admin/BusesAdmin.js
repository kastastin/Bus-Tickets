import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { HideLoader, DisplayLoader } from "../../redux/loadersSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getDateAndTime } from "../../helpers/formatChanger";
import { isEmpty } from "../../helpers/cheker";
import Modal from "../../components/Modal/Modal";

import "../../resources/css/table.css";

function BusesAdmin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const [buses, setBuses] = useState([]);
  const [pageSize, setPageSize] = useState();
  const [chosenBus, setChosenBuses] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEdit, setisModalEdit] = useState(false);

  const displayError = function (error) {
    dispatch(HideLoader());
    message.error(error);
  };

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
      displayError(error.message);
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
      displayError(error.message);
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

  const showError = (text) => message.error(text);

  const clickHandler = function (value) {
    if (window.innerWidth > 991) {
      // Check existed bus data (value)
      if (!isEmpty(value)) setChosenBuses(value);

      setIsModalActive(true);
      setisModalEdit(!isEmpty(value));
    } else {
      showError("Your screen is too small. Try using another device!");
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
              // Check reserved seats in bus
              !isEmpty(record) && !isEmpty(record.reservedSeats)
                ? showError(
                    "There are already reserved seats. You can't delete bus!"
                  )
                : removeBus(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
      {!user?.isAdmin && <Navigate to="/" />}
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
    </>
  );
}

export default BusesAdmin;
