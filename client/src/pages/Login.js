import axios from "axios";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";

import "../resources/css/auth.css";

function Login() {
  const dispatch = useDispatch();

  const displayError = function (text) {
    dispatch(HideLoader());
    message.error(text);
  };

  const formHandler = async function (values) {
    try {
      dispatch(DisplayLoader());
      const response = await axios.post("/api/users/log-in", values);
      dispatch(HideLoader);

      if (!response.data.success) {
        displayError(response.data.message);
      } else {
        localStorage.setItem("token", response.data.data);
        window.location.reload();
      }
    } catch (error) {
      displayError(error.message);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <span className="border-line"></span>
        <Form onFinish={formHandler}>
          <h2>Log in</h2>
          <div className="input-container">
            <Form.Item noStyle name="email">
              <Input type="text" required="required" />
            </Form.Item>
            <span>Email</span>
            <i />
          </div>
          <div className="input-container">
            <Form.Item noStyle name="password">
              <Input type="password" required="required" />
            </Form.Item>
            <span>Password</span>
            <i />
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
