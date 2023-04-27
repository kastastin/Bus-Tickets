import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

import logo from "../resources/logo.svg";
import "../resources/layout.css";

function DefaultLayout({ children }) {
  message.config({ top: 2 });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const menu = {
    user: [
      { name: "Home", img: "ri-home-4-line", path: "/" },
      { name: "Bookings", img: "ri-file-list-2-line", path: "/bookings" },
      { name: "Logout", img: "ri-logout-circle-line", path: "/logout" },
    ],
    admin: [
      { name: "Home", img: "ri-home-4-line", path: "/admin" },
      { name: "Buses", img: "ri-bus-2-line", path: "/admin/buses" },
      { name: "Users", img: "ri-user-3-line", path: "/admin/users" },
      { name: "Bookings", img: "ri-file-list-2-line", path: "/admin/bookings" },
      { name: "Logout", img: "ri-logout-circle-line", path: "/logout" },
    ],
  };

  const currentPath = window.location.pathname;
  const currentMenu = user?.isAdmin ? menu.admin : menu.user;

  return (
    <div className="layout-container">
      <header className={user?.isAdmin && "admin-header"}>
        <div className="logo">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="Bus Tickets Logo" />
            <h1>Bus Tickets</h1>
          </div>
        </div>
        <nav>
          {currentMenu.map((menuItem, index) => {
            return (
              <div
                className={`nav-item ${
                  currentPath === menuItem.path && "nav-item__active"
                }`}
                onClick={() => {
                  if (menuItem.path === "/logout") {
                    localStorage.removeItem("token");
                    navigate("/log-in");
                  } else {
                    navigate(menuItem.path);
                  }
                }}
                key={index}
              >
                <i className={`${menuItem.img} nav-img`}></i>
                <p className="nav-item-name">{menuItem.name}</p>
              </div>
            );
          })}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default DefaultLayout;