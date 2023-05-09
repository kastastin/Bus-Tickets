import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { HideLoader, DisplayLoader } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getDateAndTime } from "../../helpers/formatChanger";
import Modal from "../../components/Modal";
import "../../resources/css/buses.css";

function BusesAdmin() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [chosenBus, setChosenBuses] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getBusesList = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/buses/get-buses", {});
      dispatch(HideLoader());

      response.data.success
        ? setBuses(response.data.data)
        : message.error(response.data.message);
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
    if (window.innerWidth < 1280) setPageSize(5);
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
      title: "Price",
      dataIndex: "price",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="actions">
          <i
            className="ri-edit-2-fill"
            onClick={() => {
              if (window.innerWidth > 991) {
                setChosenBuses(record);
                setIsModalActive(true);
                setIsEdit(true);
              } else {
                message.error(
                  "Your screen is too small. Try using another device!"
                );
              }
            }}
          ></i>
          <i
            className="ri-delete-bin-6-fill"
            onClick={() => {
              console.log("Delete");
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2 className="title">Buses List</h2>
        <button
          onClick={() => {
            if (window.innerWidth > 991) {
              setIsModalActive(true);
              setIsEdit(false);
            } else {
              message.error(
                "Your screen is too small. Try using another device!"
              );
            }
          }}
        >
          Add New Bus
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={buses.map((bus) => ({ ...bus, key: bus._id }))}
        scroll={{ x: true }}
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
          isEdit={isEdit}
          chosenBus={chosenBus}
        />
      )}
    </div>
  );
}

export default BusesAdmin;
