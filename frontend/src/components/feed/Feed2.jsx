import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Tag, Button, Image, Avatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Share from "../share/Share";
import CommentsModal from "../post/CommentsModal";
import UpdatePostModal from "../post/UpdatePostModal";
import MealImage from '../../assets/images/my-profile.jpg';
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Feed() {
  const [mealPlans, setMealPlans] = useState([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/mealplans/all"
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
                <Button  icon={<LikeOutlined />} style={{marginLeft:-70}} onClick={() => handleLike(mealPlan.id)}>Like</Button>,
                <Button  icon={<MessageOutlined />} style={{marginLeft:-280}} onClick={() => handleComment(mealPlan)}>Comment</Button>,
                <Button type="primary" onClick={() => console.log("View button clicked!")}>
                  View
                </Button>,
                
              ]}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Avatar src={MealImage} style={{height:50,width:50}}/>
                <span style={{ marginLeft: "10px",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:500,fontSize:17}}>Ravindu Nirmal</span>
              </div>
              <Image
                alt={mealPlan.title}
                src={mealPlan.photos[0]}
                style={{
                  width: "100%",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />
              <Meta
                title={
                  <Typography.Title level={3} style={{ color: "black", fontSize: "17px",marginTop:20 }}>
                    {mealPlan.title}
                  </Typography.Title>
                }
                description={
                  <>
                    <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                      {mealPlan.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                      <strong>Ingredients:</strong>{" "}
                      {mealPlan.ingredients && mealPlan.ingredients.join(", ")}
                    </Typography.Paragraph >
                    <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                      <strong>Dietary Preferences:</strong>
                      {mealPlan.dietaryPreferences &&
                        mealPlan.dietaryPreferences.map((pref) => (
                          <Tag key={pref}>{pref}</Tag>
                        ))}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                      <strong>Portion Sizes:</strong> {mealPlan.portionSizes}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ color: "black", fontSize: "14px" }}>
                      <strong>Nutritional Information:</strong>
                      <br />
                      <ul>
                        <li>
                          Calories:{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.calories}{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.caloriesUnit}
                        </li>
                        <li>
                          Carbohydrates:{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.carbohydrates}{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.carbohydratesUnit}
                        </li>
                        <li>
                          Proteins:{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.protein}{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.proteinUnit}
                        </li>
                        <li>
                          Fats:{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.fat}{" "}
                          {mealPlan.nutritionalInformation &&
                            mealPlan.nutritionalInformation.fatUnit}
                        </li>
                      </ul>
                    </Typography.Paragraph>
                  </>
                }
              />
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
      </div>
    </div>
  );
}

export default Feed;
