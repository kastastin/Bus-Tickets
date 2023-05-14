import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Pagination, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { isEmpty } from "../../src/helpers/cheker";
import { axiosInstance } from "../../src/helpers/axiosInstance";
import { isObjectValuesEmpty } from "../../src/helpers/cheker";
import { HideLoader, DisplayLoader } from "../../src/redux/alertsSlice";
import BusContainer from "../components/BusContainer";

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({ departure: "", arrival: "" });

  const getBusesList = async () => {
    try {
      dispatch(DisplayLoader());
      const response = await axiosInstance.post("/api/buses/get-buses", {});
      dispatch(HideLoader());

      const { data } = response.data;

      if (response.data.success) {
        let filteredBuses = data;

        const getFilteredBus = function (type) {
          if (type === "arrival")
            return data.filter((bus) =>
              bus.arrivalTown
                .toLowerCase()
                .includes(filters.arrival.toLowerCase())
            );

          if (type === "departure")
            return data.filter((bus) =>
              bus.departureTown
                .toLowerCase()
                .includes(filters.departure.toLowerCase())
            );

          return data.filter(
            (bus) =>
              bus.departureTown
                .toLowerCase()
                .includes(filters.departure.toLowerCase()) &&
              bus.arrivalTown
                .toLowerCase()
                .includes(filters.arrival.toLowerCase())
          );
        };

        if (isObjectValuesEmpty(filters)) {
          if (isObjectValuesEmpty(filters, "both")) {
            filteredBuses = getFilteredBus();
          } else {
            if (isObjectValuesEmpty(filters, "departure")) {
              filteredBuses = getFilteredBus("departure");
            }
            if (isObjectValuesEmpty(filters, "arrival")) {
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalBuses = buses.length;
  const busesPerPage = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          {isObjectValuesEmpty(filters) && (
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
        <Row gutter={[16, 16]}>
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
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
