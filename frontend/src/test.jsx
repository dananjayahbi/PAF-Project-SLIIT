import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        values
      );
      const { data } = response;
      if (data.isloggedIn == true) {
        message.success("Logged in successfully");
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "/";
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      message.error("An error occurred while logging in");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Failed to login");
  };

  return (
    <Row>
      <Col span={12}>
        <div
          style={{
            height: "100vh",
            backgroundColor: "#f0f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url("https://images.pexels.com/photos/703014/pexels-photo-703014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
            backgroundSize: "cover",
          }}
        />
      </Col>
      <Col span={12}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 400,
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input style={{width: "270px"}} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password style={{width : "270px", marginLeft: "5px"}} />
              </Form.Item>

              <Form.Item style={{display: "flex", justifyContent: "center"}}>
                <Button type="primary" style={{width: "300px"}} htmlType="submit" loading={loading}>
                  login
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: "center" }}>
              <a href="/register">Sign up</a> | <a href="/reset">Reset Password</a>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
