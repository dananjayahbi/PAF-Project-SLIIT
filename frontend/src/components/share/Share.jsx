import React, { useState } from "react";
import { Button, Row, Col, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreatePostModal from "../post/CreatePostModal";
import { Link } from 'react-router-dom';

const Share = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
      style={{
        marginBottom: 20,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="circle"
              size="large"
              style={{ fontSize: "14px", padding: "1px 0 0 0px" }}
              onClick={handleButtonClick}
            />
            <span style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              New Post
            </span>
            {isModalVisible && <CreatePostModal onClose={handleModalClose} />}
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/status">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="circle"
              size="large"
              style={{ fontSize: "14px", padding: "1px 0 0 0px", marginLeft: "16px",background:"#e5e500" }} 
            />
            </Link>
            <span style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              New Workout Status
            </span>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
            <Link to="/addmealplan">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="circle"
              size="large"
              style={{ fontSize: "14px", padding: "0px 0 0 0px",background:"green" }}
            />
            </Link> 
            <span style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              New Meal Plan
            </span>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}> 
          <Link to="/addworkout">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="circle"
              size="large"
              style={{ fontSize: "14px", padding: "1px 0 0 0px", marginLeft: "16px",background:"red" }}
            />
            </Link>
            <span style={{ fontFamily: "sans-serif", marginLeft: "8px" }}>
              New Workout Plan
            </span>
          </div>
        </Col>
      </Row>
      </Card>
    </div>
  );
};

export default Share;
