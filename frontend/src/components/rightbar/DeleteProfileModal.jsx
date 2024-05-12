import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

const DeleteProfileModal = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);

  // get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/users/${user.id}`);
      localStorage.removeItem("user");

      //redirect to the login page
      window.location.href = "/login";

      onDelete();
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Delete Profile"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          loading={loading}
          onClick={handleDelete}
        >
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete your profile?</p>
    </Modal>
  );
};

export default DeleteProfileModal;
