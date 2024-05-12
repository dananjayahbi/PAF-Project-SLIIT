import React from 'react';
import { Modal, Avatar, Form, Input, Button, List } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CommentsModal = ({ visible, onCancel, post }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // Handle the comment submission here and send it to the database
  const addComment = async (values) => {
    const { comment } = values;
  
    // Ensure post.comments is initialized as an array if it's null or undefined
    const commentsArray = Array.isArray(post.comments) ? post.comments : [];
  
    const newComment = {
      username: post.user.username,
      userId: post.user.id,
      comment: comment,
    };
  
    const updatedComments = [...commentsArray, newComment];
  
    try {
      await axios.put(`http://localhost:8080/api/fitnesspost/${post.id}`, { comments: updatedComments });
    } catch (error) {
      console.error("Error updating comments: ", error);
    }
  
    console.log(values);
    form.resetFields();
    onCancel();
  }
  

  return (
    <Modal
      visible={visible}
      title="Comments"
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      <List
        dataSource={Array.isArray(post.comments) ? post.comments : []}
        renderItem={(comment, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={""} alt={comment?.username} />}
              title={comment?.username}
              description={comment?.comment}
            />
          </List.Item>
        )}
      />
      <Form form={form} onFinish={addComment}>
        <Form.Item name="comment" rules={[{ required: true, message: 'Please input your comment!' }]}>
          <TextArea rows={4} placeholder="Write your comment..." />
        </Form.Item>
        <Form.Item>
          <Button style={{float: "right"}} htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentsModal;
