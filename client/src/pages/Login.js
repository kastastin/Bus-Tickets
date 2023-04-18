import { Form, Input } from "antd";
import { Link } from "react-router-dom";

import "../resources/auth.css";

function Login() {
  const onFinish = function (values) {
    console.log(values);
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
