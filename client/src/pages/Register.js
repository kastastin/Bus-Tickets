import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";

import "../resources/css/auth.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    name: { value: "", span: "Name" },
    email: { value: "", span: "Email" },
    password: { value: "", span: "Password" },
  });

  const formHandler = async function (values) {
    const email = fields.email.value;
    if (email && !/^\S{4,}@\S{2,}\.\S{2,}$/.test(email)) {
      message.error("Mail is entered in an incorrect format");
    } else {
      try {
        dispatch(DisplayLoader());
        const response = await axios.post("/api/users/sign-up", values);
        dispatch(HideLoader());

        !response.data.success
          ? message.error(response.data.message)
          : message.success(response.data.message) && navigate("/log-in");
      } catch (error) {
        dispatch(HideLoader());
        message.error(error.message);
      }
    }
  };

  const updateField = function (e, field) {
    setFields((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value: e.target.value,
      },
    }));
  };

  const getInputStyle = function (field) {
    const spanStyle = {
      color: "white",
      fontSize: "0.75rem",
      transform: "translateY(-2rem)",
    };

    return field.value.length ? (
      <>
        <span style={spanStyle}>{field.span}</span>
        <i style={{ height: "2.7rem" }} />
      </>
    ) : (
      <>
        <span>{field.span}</span>
        <i />
      </>
    );
  };

  return (
    <div className="auth">
      <div className="container">
        <span className="border-line"></span>
        <Form onFinish={formHandler}>
          <h2>Sign up</h2>
          <div className="input-container">
            <Form.Item noStyle name="name">
              <Input
                type="text"
                required="required"
                value={fields.name.value}
                onChange={(e) => updateField(e, "name")}
                minLength={3}
                maxLength={20}
              />
            </Form.Item>
            {getInputStyle(fields.name)}
          </div>
          <div className="input-container">
            <Form.Item noStyle name="email">
              <Input
                type="text"
                required="required"
                value={fields.email.value}
                onChange={(e) => updateField(e, "email")}
                minLength={8}
                maxLength={30}
              />
            </Form.Item>
            {getInputStyle(fields.email)}
          </div>
          <div className="input-container">
            <Form.Item noStyle name="password">
              <Input
                type="password"
                required="required"
                value={fields.password.value}
                onChange={(e) => updateField(e, "password")}
                minLength={8}
                maxLength={30}
              />
            </Form.Item>
            {getInputStyle(fields.password)}
          </div>
          <div className="footer">
            <button type="submit">Sign Up</button>
            <Link to="/log-in" className="link-to">
              Log in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
