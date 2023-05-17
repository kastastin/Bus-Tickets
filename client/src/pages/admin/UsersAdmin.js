import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { HideLoader, DisplayLoader } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";

import "../../resources/css/table.css";

function UsersAdmin() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);

  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState();

  const getUsersList = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/users/get-users", {});
      dispatch(HideLoader());

      response.data.success
        ? setUsers(response.data.data)
        : message.error(response.data.message);
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const editUser = async (editedUser) => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post(
        "/api/users/edit-user",
        editedUser
      );
      dispatch(HideLoader());

      if (response.data.success) {
        getUsersList();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPageSize(10);
    if (window.innerWidth < 1440) setPageSize(7);
    if (window.innerWidth < 1024) setPageSize(4);
    if (window.innerWidth < 768) setPageSize(3);
    if (window.innerWidth < 375) setPageSize(2);
  }, []);

  const clickHandlerBlock = function (e, chosenUser) {
    const blockUser = e.target.className.includes("unfollow");
    currentUser._id === chosenUser._id
      ? message.error(`You can't block yourself`)
      : editUser({ ...chosenUser, isBlocked: blockUser });
  };

  const clickHandlerAdmin = function (e, chosenUser) {
    const makeUserAdmin = e.target.className.includes("line");
    currentUser._id === chosenUser._id
      ? message.error(`You can't do it to yourself`)
      : editUser({ ...chosenUser, isAdmin: makeUserAdmin });
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (text, record, index) => index + 1,
      responsive: ["md"],
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Block",
      dataIndex: "isBlocked",
      align: "center",
      render: (text) => (text ? "True" : "False"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      align: "center",
      render: (text) => <span>{text ? "True" : "False"}</span>,
    },
    {
      title: "Block / Admin",
      dataIndex: "action",
      align: "center",
      width: "15%",
      render: (action, record) => (
        <div className="table-actions-wrapper">
          <i
            className={`ri-user-${
              record.isBlocked ? "follow" : "unfollow"
            }-line`}
            onClick={(e) => clickHandlerBlock(e, record)}
          ></i>
          <i
            className={`ri-user-star-${record.isAdmin ? "fill" : "line"}`}
            onClick={(e) => clickHandlerAdmin(e, record)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="title">Users List</h2>
      </div>

      <Table
        columns={columns}
        scroll={{ x: true }}
        dataSource={users.map((user) => ({ ...user, key: user._id }))}
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

export default UsersAdmin;
