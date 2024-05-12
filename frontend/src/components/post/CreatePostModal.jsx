import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Image } from "antd";
import axios from "axios";

const CreatePostModal = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const removeFileExtension = (fileName) => {
    const index = fileName.lastIndexOf(".");
    return index === -1 ? fileName : fileName.substring(0, index);
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { images, videos } = response.data;
      const userData = JSON.parse(localStorage.getItem("user"));

      const postData = {
        caption: values.title,
        image: images.map(removeFileExtension),
        video: videos.map(removeFileExtension),
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          userImage: userData.image,
        },
        comments: {},
        likes: 0,
      };

      await axios.post(
        "http://localhost:8080/api/fitnesspost/create",
        postData
      );

      onClose();
      message.success("Post created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

return (
    <Modal
        title="Create Post"
        visible={true}
        onCancel={onClose}
        footer={[
            <Button key="cancel" onClick={onClose}>
                Cancel
            </Button>,
            <Button
                key="create"
                type="primary"
                loading={loading}
                onClick={handleCreatePost}
                disabled={fileList.length === 0 || fileList.length > 3} // Disable the button if no media files selected or more than 3 files selected
            >
                Create
            </Button>,
        ]}
    >
        <Form form={form}>
            <Form.Item
                name="title"
                label="Caption"
                rules={[{ required: true, message: "Please enter a caption" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Media">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                    fileList={fileList}
                    multiple
                    listType="picture-card"
                    maxCount={3} // Limit the number of files that can be uploaded to 3
                >
                    <Button>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </Modal>
);
};

export default CreatePostModal;
