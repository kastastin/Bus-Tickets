import axios from "axios";
import { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";

import "../resources/css/auth.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const formHandler = async function (values) {
    if (email && !/^\S{4,}@\S{2,}\.\S{2,}$/.test(email)) {
      message.error("Mail is entered in an incorrect format");
    } else {
      try {
        dispatch(DisplayLoader());
        const response = await axios.post("/api/users/sign-up", values);
        dispatch(HideLoader());

        if (response.data.success) {
          navigate("/log-in");
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoader());
        message.error(error.message);
      }
    }
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
                minLength={3}
                maxLength={20}
              />
            </Form.Item>
            <span>Username</span>
            <i></i>
          </div>
          <div className="input-container">
            <Form.Item noStyle name="email">
              <Input
                type="email"
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                minLength={8}
                maxLength={30}
              />
            </Form.Item>
            <span>Email</span>
            <i></i>
          </div>
          <div className="input-container">
            <Form.Item noStyle name="password">
              <Input
                type="password"
                required="required"
                minLength={8}
                maxLength={20}
              />
            </Form.Item>
            <span>Password</span>
            <i></i>
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
