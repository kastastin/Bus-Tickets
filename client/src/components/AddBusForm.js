import React from "react";
import { message } from "antd";
import { Col, Form, Input, Modal, Row } from "antd";
import { useDispatch } from "react-redux";


import { DisplayLoader, HideLoader } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import "../resources/addBusForm.css";

function AddBusForm({ isFormActive, setIsFormActive, type = "add" }) {
  const dispatch = useDispatch();

  const formHandler = async (formData) => {
    try {
      dispatch(DisplayLoader());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", formData);
      } else {
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      dispatch(HideLoader());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoader());
    }
  };

  return (
    <Modal
      width={800}
      // centered
      style={{
        top: "4.5rem",
      }}
      maskStyle={{ height: "100vh" }}
      title="Add New Bus"
      footer={false}
      open={isFormActive}
      onCancel={() => {
        setIsFormActive(false);
      }}
    >
      <Form layout="vertical" onFinish={formHandler}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item name="name" label="Bus Name">
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item name="number" label="Bus Number">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item name="capacity" label="Capacity">
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item name="from" label="From">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item name="to" label="To">
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item name="travelDate" label="Travel Date">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item name="departure" label="Departure">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item name="arrival" label="Arrival">
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item name="type" label="Bus Type">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item name="price" label="Price">
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="btns">
          <button type="submit">Add</button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddBusForm;
