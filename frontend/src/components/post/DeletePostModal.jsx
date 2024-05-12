import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

function DeletePostModal({ postId, visible, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/fitnesspost/getpost/${postId}`);
        const { image, video } = response.data;
        const allMedia = [...image, ...video]; // Combine image and video arrays
        setDeletedImages(allMedia);
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      setLoading(true);

      // Delete selected images
      if (deletedImages.length > 0) {
        await axios.delete("http://localhost:8080/api/files", {
          data: deletedImages,
        });
      }

      // Delete the post from the database
      await axios.delete(`http://localhost:8080/api/fitnesspost/${postId}`);

      message.success("Post deleted successfully");
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post: ", error);
      message.error("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Delete Post"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          loading={loading}
          onClick={handleDeletePost}
        >
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this post?</p>
    </Modal>
  );
}

export default DeletePostModal;
