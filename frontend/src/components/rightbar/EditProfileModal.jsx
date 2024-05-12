import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const EditProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const response = await fetch(`http://localhost:8080/api/users/updateuser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // If update is successful, fetch the updated user data
        const updatedUserResponse = await fetch(`http://localhost:8080/api/users/getuser/${user.id}`);
        const updatedUserData = await updatedUserResponse.json();

        // Update local storage and state with the new user data
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setUser(updatedUserData);
        
        // Close the modal
        onCancel();
        window.location.reload();
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Edit Profile"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.username,
          email: user?.email,
        }}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
