import axios from "axios";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "../resources/auth.css";

function Login() {
  const navigate = useNavigate();

  const onFinish = async function (values) {
    try {
      const response = await axios.post("/api/users/log-in", values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
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
              <Input type="email" name="email" required="required" />
            </Form.Item>
            <span>Email</span>
            <i></i>
          </div>
          <div className="input-container">
            <Form.Item noStyle name="password">
              <Input type="password" name="password" required="required" />
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
