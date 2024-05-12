// UpdatePostModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message, Image } from "antd";
import axios from "axios";

function UpdatePostModal({ post, visible, onCancel, onUpdate }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    setCurrentImages(
      post.image.map((imageName) => ({
        uid: imageName,
        name: imageName,
        status: "done",
        url: `http://localhost:8080/api/files/${imageName}`,
      }))
    );
  }, [post.image]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleDeleteMedia = (file) => {
    setDeletedImages((prevImages) => [...prevImages, file.uid]);
    setCurrentImages((prevImages) =>
      prevImages.filter((image) => image.uid !== file.uid)
    );
  };

  const handleUpdatePost = async () => {
    try {
      setLoading(true);
  
      // Delete selected images if any
      if (deletedImages.length > 0) {
        await axios.delete("http://localhost:8080/api/files", {
          data: deletedImages,
        });
      }
  
      // Upload new images if any
      if (fileList.length > 0) {
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
  
        const newImageNames = response.data.images;
  
        console.log("New image names:", newImageNames);
  
        if (!Array.isArray(newImageNames)) {
          throw new Error("Invalid response from server");
        }
  
        // Combine current images and new images
        const updatedImages = [
          ...currentImages.filter(
            (image) => !deletedImages.includes(image.uid)
          ),
          ...newImageNames.map((imageName) => ({
            uid: imageName,
            name: imageName,
            status: "done",
            url: `http://localhost:8080/api/files/${imageName}`,
          })),
        ];
  
        // Update post details
        await axios.put(`http://localhost:8080/api/fitnesspost/${post.id}`, {
          caption: form.getFieldValue("caption"),
          image: updatedImages.map((image) => image.name),
        });
      } else {
        // If there are no new images, only update the caption
        await axios.put(`http://localhost:8080/api/fitnesspost/${post.id}`, {
          caption: form.getFieldValue("caption"),
          image: currentImages // Use the existing images
            .filter((image) => !deletedImages.includes(image.uid))
            .map((image) => image.name),
        });
      }
  
      message.success("Post updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error updating post: ", error);
      message.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Modal
      visible={visible}
      title="Update Post"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdatePost}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} initialValues={{ caption: post.caption }}>
        <Form.Item
          name="caption"
          label="Caption"
          rules={[{ required: true, message: "Please enter a caption" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Current Media">
          {currentImages.map((image) => (
            <div key={image.uid}>
              <Image src={image.url} width={100} />
              <Button danger onClick={() => handleDeleteMedia(image)}>
                Delete
              </Button>
            </div>
          ))}
        </Form.Item>
        <Form.Item label="New Media">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            listType="picture"
            multiple
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;
