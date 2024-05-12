import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Image, Avatar, Spin } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import CommentsModal from '../post/CommentsModal';
import UpdatePostModal from '../post/UpdatePostModal';
import AvatarImage from '../../assets/images/my-profile.jpg';
import Share from "../share/Share";


const { Meta } = Card;

function Feed3() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/workoutplans/all');
        setWorkoutPlans(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:8080/api/workoutplans/${postId}/like`);
      fetchWorkoutPlans();
    } catch (error) {
      console.error('Error toggling like:', error);
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

  if (loading) return <Spin size="large" />;

  return (
    <div className="feed">
      <div className="feedWrapper">
      <Share />
        <div style={{ marginTop: '20px' }}>
          {workoutPlans.map((workoutPlan) => (
            <Card
              key={workoutPlan.id}
              style={{ marginBottom: 20, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
              actions={[
                <Button  icon={<LikeOutlined />} style={{marginLeft:-70}} onClick={() => handleLike(mealPlan.id)}>Like</Button>,
                <Button  icon={<MessageOutlined />} style={{marginLeft:-280}} onClick={() => handleComment(mealPlan)}>Comment</Button>,
                <Button type="primary" onClick={() => console.log("View button clicked!")}>
                  View
                </Button>,                
              ]}
            >
              {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {workoutPlan.author && workoutPlan.author.avatar && (
                  <Avatar src={workoutPlan.author.avatar} />
                )}
                {workoutPlan.author && workoutPlan.author.name && (
                  <span style={{ marginLeft: '10px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 500, fontSize: 17 }}>
                    {workoutPlan.author.name}
                  </span>
                )}
              </div> */}
               <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Avatar src={AvatarImage} style={{height:50,width:50}}/>
                <span style={{ marginLeft: "10px",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:500,fontSize:17}}>Ravindu Nirmal</span>
                </div>
              <Image
                alt={workoutPlan.title}
                src={workoutPlan.photos[0]}
                style={{ width: '100%',marginBottom:15, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px',marginTop:15 }}
              />
              <Meta
                title={<Typography.Title level={3}>{workoutPlan.title}</Typography.Title>}
                description={
                  <>
                  <br/>
                    <Typography.Paragraph>{workoutPlan.description}</Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>Exercises:</strong>{' '}
                      {workoutPlan.exercises.map((exercise, index) => (
                        <span key={index}>{exercise.name}, </span>
                      ))}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ backgroundColor: 'yellow' }}> {/* Add styling here */}
                      <strong>Routine:</strong>{' '}
                      {Object.entries(workoutPlan.routine).map(([day, activity], index) => (
                        <span key={index}>{day}: {activity}, </span>
                      ))}
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

export default Feed3;
