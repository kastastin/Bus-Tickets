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

  const checkFiltersEmpties = function (obj) {
    return Object.values(obj).some((value) => value !== "");
  };

  const getBusesList = async () => {
    try {
      if (!checkFiltersEmpties(filters)) dispatch(DisplayLoader());
      const response = await axios.post(
        "/api/buses/get-buses",
        {},
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );
      if (!checkFiltersEmpties(filters)) dispatch(HideLoader());

      let { data } = response.data;

      if (response.data.success) {
        data = data.filter(
          (bus) =>
            bus.departureTown
              .toLowerCase()
              .includes(filters.departure.toLowerCase()) &&
            bus.arrivalTown
              .toLowerCase()
              .includes(filters.arrival.toLowerCase())
        );

        setBuses(data);
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
  }, [filters]);

  // Pagination settings
  const busesPerPage = 4;
  const totalBuses = buses.length;
  const slicedBuses = buses.slice(
    (currentPage - 1) * busesPerPage,
    currentPage * busesPerPage
  );

  return (
    <div className="home">
      <div className="filter-wrapper">
        <div className="departure-filter">
          <input
            type="text"
            value={filters.departure}
            onChange={(e) =>
              setFilters({ ...filters, departure: e.target.value })
            }
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
            placeholder="Arrival In..."
          />
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
