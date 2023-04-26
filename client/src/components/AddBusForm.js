import React from "react";
import { Col, Form, Input, Modal, Row } from "antd";

function AddBusForm({ isFormActive, setIsFormActive }) {
  return (
    <Modal
      width={800}
      title="Add New Bus"
      footer={false}
      open={isFormActive}
      onCancel={() => {
        setIsFormActive(false);
      }}
    >
      <Form>
        <Row>
          <Col lg={24} xs={24}>
            <Form.Item name="name" label="Bus Name">
              <Input type="text"></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddBusForm;
