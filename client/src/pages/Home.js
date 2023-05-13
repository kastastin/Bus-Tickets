import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Pagination, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { isEmpty } from "../../src/helpers/cheker";
import { axiosInstance } from "../../src/helpers/axiosInstance";
import { HideLoader, DisplayLoader } from "../../src/redux/alertsSlice";
import BusContainer from "../components/BusContainer";

function Home() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);

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

  return (
    <div className="home">
      <div></div>
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
