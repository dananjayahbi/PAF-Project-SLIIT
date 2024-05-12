import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, Image, Modal, Avatar } from "antd";
import Share from "../share/Share";
import CommentsModal from "../post/CommentsModal";
import UpdatePostModal from "../post/UpdatePostModal";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.png";

import { LikeOutlined, MessageOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Feed() {
  const [mealPlans, setMealPlans] = useState([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/status/all"
        );
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${postId}/like`);
      fetchMealPlans();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const handleCommentModalCancel = () => {
    setCommentModalVisible(false);
  };

  const showUpdateModal = (post) => {
    setCurrentPost(post);
    setUpdateModalVisible(true);
  };

  const handleUpdateModalCancel = () => {
    setUpdateModalVisible(false);
    setCurrentPost(null);
  };

  const handleViewModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <div style={{ marginTop: "20px" }}>
          {mealPlans.map((mealPlan) => (
            <Card
              key={mealPlan.id}
              style={{
                marginBottom: 20,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              actions={[
                <Button
                  icon={<LikeOutlined />}
                  style={{ marginLeft: -70 }}
                  onClick={() => handleLike(mealPlan.id)}
                >
                  {mealPlan.likes} Likes
                </Button>,
                <Button
                  icon={<MessageOutlined />}
                  style={{ marginLeft: -280 }}
                  onClick={() => handleComment(mealPlan)}
                >
                  Comment
                </Button>,
                <Button
                  type="primary"
                  onClick={() => handleViewModal(mealPlan)}
                >
                  View
                </Button>,
              ]}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={img1} style={{ height: 50, width: 50 }} />
                  <span
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontWeight: 500,
                      fontSize: 17,
                    }}
                  >
                    Ravindu Nirmal
                  </span>
                </div>
                <Typography.Title
                  level={3}
                  style={{ color: "black", fontSize: "17px", marginTop: 20 }}
                >
                  {mealPlan.date}
                </Typography.Title>
              </div>
              <Typography.Paragraph
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginLeft: "10px",
                  marginBottom:'10px',
                  marginTop:'10px',
                  fontWeight:'lighter'
                }}
              >
                {mealPlan.description}
              </Typography.Paragraph>
              <hr style={{ margin: '20px 0',opacity:'30%'}} /> 

              <Meta
                description={
                  <>
                    <div>
                      <Image src={img2} preview={false} width={30} height={24} />
                      <Typography.Paragraph
                        style={{
                          color: "black",
                          fontSize: "14px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        Distance Run : <strong>{mealPlan.distanceRun} Meters</strong>
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Image src={img3} preview={false} width={30} height={24} />
                      <Typography.Paragraph
                        style={{
                          color: "black",
                          fontSize: "14px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        Time for Run : <strong> {mealPlan.timeRun} Minutes</strong>
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Image src={img4} preview={false} width={30} height={24} />
                      <Typography.Paragraph
                        style={{
                          color: "black",
                          fontSize: "14px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        Number of Pushups : <strong>{mealPlan.pushups} </strong>
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Image src={img5} preview={false} width={30} height={24} />
                      <Typography.Paragraph
                        style={{
                          color: "black",
                          fontSize: "14px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        Time for Cardio :<strong> {mealPlan.cardio} Minutes</strong>
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Image src={img6} preview={false} width={30} height={24} />
                      <Typography.Paragraph
                        style={{
                          color: "black",
                          fontSize: "14px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        Time for weight Lifting :<strong> {mealPlan.weightLifted} Minutes</strong>
                      </Typography.Paragraph>
                    </div>
                  </>
                }
              />

<img src={img7} style={{ height:'150px',position: 'absolute', top: '55%', right: '25%', transform: 'translate(50%, -50%)' }} />
            </Card>
          ))}
        </div>
        <CommentsModal
          visible={commentModalVisible}
          onCancel={handleCommentModalCancel}
          post={selectedPost}
        />
        {currentPost && (
          <UpdatePostModal
            post={currentPost}
            visible={updateModalVisible}
            onCancel={handleUpdateModalCancel}
          />
        )}
        {selectedMealPlan && (
          <Modal
            title="Meal Plan Details"
            visible={viewModalVisible}
            onCancel={handleViewModalCancel}
            footer={[
              <Button key="back" onClick={handleViewModalCancel}>
                Close
              </Button>,
            ]}
          >
           
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Feed;
