import axios from "axios";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";

import "../resources/css/auth.css";

function Login() {
  const dispatch = useDispatch();

  const onFinish = async function (values) {
    try {
      dispatch(DisplayLoader());
      const response = await axios.post("/api/users/log-in", values);
      dispatch(HideLoader);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.reload();
      } else {
        message.error(response.data.message);
        dispatch(HideLoader());
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <span className="border-line"></span>
        <Form onFinish={onFinish}>
          <h2>Log in</h2>
          <div className="input-container">
            <Form.Item noStyle name="email">
              <Input type="email" required="required" />
            </Form.Item>
            <span>Email</span>
            <i></i>
          </div>
          <div className="input-container">
            <Form.Item noStyle name="password">
              <Input type="password" required="required" />
            </Form.Item>
            <span>Password</span>
            <i></i>
          </div>
          <div className="footer">
            <button type="submit">Log in</button>
            <Link to="/sign-up" className="link-to">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
