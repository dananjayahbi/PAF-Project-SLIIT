import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/create",
          values
        );
        const { data } = response;
        if (data) {
          message.success("Signed up successfully");
          window.location.href = "/login";
        } else {
          message.error("Invalid data");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        message.error("An error occurred while signing up");
      }
      setLoading(false);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.error("Failed:", errorInfo);
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
              <h2 style={{ textAlign: "center", marginBottom: 20 }}>Sign up</h2>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input your first name!" },
                  ]}
                >
                  <Input style={{width: "270px"}} />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input style={{width: "270px"}} />
                </Form.Item>
                
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input style={{width: "270px", marginLeft: "5px"}} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input style={{width: "270px", marginLeft: "35px"}} />
                </Form.Item>
  
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password style={{width : "270px", marginLeft: "10px"}} />
                </Form.Item>
  
                <Form.Item style={{display: "flex", justifyContent: "center"}}>
                  <Button type="primary" style={{width: "300px"}} htmlType="submit" loading={loading}>
                    sign up
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center" }}>
                <a href="/signup">Sign up</a> | <a href="/reset">Reset Password</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
}

export default Register