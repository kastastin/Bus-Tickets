import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Pagination, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { isEmpty } from "../../src/helpers/cheker";
import { HideLoader, DisplayLoader } from "../../src/redux/loadersSlice";
import BusContainer from "../components/BusContainer";

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ departure: "", arrival: "" });

  const checkFiltersEmpties = function (obj, value = "default") {
    const isValueEmpty = "" && Object.values(obj).some((value) => value !== "");

    switch (value) {
      case "departure":
        return obj.departure !== isValueEmpty;

      case "arrival":
        return obj.arrival !== isValueEmpty;

      case "both":
        return obj.departure !== "" && obj.arrival !== "";

      default:
        return Object.values(obj).some((value) => value !== "");
    }
  };

  const getBusesList = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axios.post(
        "/api/buses/get-buses",
        {},
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      dispatch(HideLoader());

      const { data } = response.data;

      if (response.data.success) {
        let filteredBuses = data;

        const getFilteredBus = function (type) {
          const checkDepartureTown = function (data) {
            return data.departureTown
              .toLowerCase()
              .includes(filters.departure.toLowerCase());
          };

          const checkArrivalTown = function (data) {
            return data.arrivalTown
              .toLowerCase()
              .includes(filters.arrival.toLowerCase());
          };

          if (type === "arrival")
            return data.filter((bus) => checkArrivalTown(bus));

          if (type === "departure")
            return data.filter((bus) => checkDepartureTown(bus));

          return data.filter(
            (bus) => checkDepartureTown(bus) && checkArrivalTown(bus)
          );
        };

        if (checkFiltersEmpties(filters)) {
          if (checkFiltersEmpties(filters, "both")) {
            filteredBuses = getFilteredBus();
          } else {
            if (checkFiltersEmpties(filters, "departure")) {
              filteredBuses = getFilteredBus("departure");
            }
            if (checkFiltersEmpties(filters, "arrival")) {
              filteredBuses = getFilteredBus("arrival");
            }
          }
        }

        setBuses(filteredBuses);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBusesList();
    // eslint-disable-next-line
  }, []);

  // Pagination settings
  const busesPerPage = 4;
  const totalBuses = buses.length;
  const slicedBuses = buses.slice(
    (currentPage - 1) * busesPerPage,
    currentPage * busesPerPage
  );

  const enterHandler = function (e) {
    if (e.key === "Enter") getBusesList();
  };

  return (
    <div className="home">
      <div className="filter-wrapper">
        <div className="filter-inputs">
          <div className="departure-filter">
            <input
              type="text"
              value={filters.departure}
              onChange={(e) =>
                setFilters({ ...filters, departure: e.target.value })
              }
              onKeyDown={enterHandler}
              placeholder="Departure From..."
            />
          </div>
          <div className="arrival-filter">
            <input
              type="text"
              value={filters.arrival}
              onChange={(e) =>
                setFilters({ ...filters, arrival: e.target.value })
              }
              onKeyDown={enterHandler}
              placeholder="Arrival In..."
            />
          </div>
        </div>
        <div className="filter-buttons">
          {checkFiltersEmpties(filters) && (
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filters
            </button>
          )}
          <button onClick={getBusesList}>Use Filters</button>
        </div>
      </div>
      <div className="buses-wrapper">
        {isEmpty(buses) && <p className="no-buses">No Active Buses</p>}
        <Row gutter={[15, 15]}>
          {slicedBuses.map((busData) => {
            return (
              <Col lg={24} md={24} sm={24} key={busData._id}>
                <BusContainer busData={busData} />
              </Col>
            );
          })}
        </Row>
      </div>
      <Pagination
        className="home-pagination"
        current={currentPage}
        total={totalBuses}
        pageSize={busesPerPage}
        prevIcon={<LeftOutlined style={{ color: "var(--primary)" }} />}
        nextIcon={<RightOutlined style={{ color: "var(--primary)" }} />}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Home;
