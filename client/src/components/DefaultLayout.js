import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../resources/layout.css";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [isReduced, setIsReduced] = useState(false);

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
      <div className="sidebar">
        <div className="sidebar-header">
          <p className="logo">BS</p>
          <p className="role">
            Name: {user?.name} <br />
            Role: {user?.isAdmin ? "Admin" : "User"}
          </p>
        </div>
        <div className="d-flex flex-column gap-3">
          {currentMenu.map((menuItem, index) => {
            return (
              <div
                className={`menu-item ${
                  currentPath === menuItem.path && "menu-item__active"
                }`}
                key={index}
              >
                <i className={menuItem.img}></i>
                {!isReduced && (
                  <span
                    onClick={() => {
                      if (menuItem.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/log-in");
                      } else {
                        navigate(menuItem.path);
                      }
                    }}
                  >
                    {menuItem.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {isReduced ? (
            <i
              className="ri-skip-right-line"
              onClick={() => setIsReduced(false)}
            ></i>
          ) : (
            <i
              className="ri-skip-left-line"
              onClick={() => setIsReduced(true)}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
