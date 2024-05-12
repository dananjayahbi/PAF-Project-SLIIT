import React, { useState } from "react";
import { MoreOutlined, HeartOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Modal } from "antd";
import CommentsModal from "./CommentsModal";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  // Handle likes here
  // Todo: Add the like to the database relevant user object
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const showCommentModal = () => {
    setCommentModalVisible(true);
  };

  const handleCommentModalCancel = () => {
    setCommentModalVisible(false);
  };

  // Function to convert date to the specified format
  const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("en-GB", { month: "long" });
    const year = new Date(date).getFullYear();

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  };

  // Function to get day suffix
  const getDaySuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  };

const menu = (
    <Menu>
        <Menu.Item key="1" onClick={() => console.log("Share button Clicked!")}>Share</Menu.Item>
    </Menu>
);

  return (
    <div
      style={{
        margin: "20px 0",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <Avatar src={post.user.profileImg} size={40} />
        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {post.user.username}
        </span>
        <span style={{ marginLeft: "auto", color: "#6b778c" }}>
          {formatDate(post.date)}
        </span>
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow
          trigger={["click"]}
        >
          <MoreOutlined style={{ marginLeft: "10px", cursor: "pointer" }} />
        </Dropdown>
      </div>
      <div>
        <p style={{ marginBottom: "10px" }}>{post.dscription}</p>
        <img
          src={post.photo}
          alt="post"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
            cursor: "pointer",
          }}
          onClick={likeHandler}
        >
          {isLiked ? (
            <HeartOutlined style={{ color: "red", marginRight: "5px" }} />
          ) : (
            <HeartOutlined style={{ marginRight: "5px" }} />
          )}
          {isLiked ? (
            <span style={{ color: "red" }}>Liked</span>
          ) : (
            <span>Like</span>
          )}
        </div>
        <span
          style={{ marginLeft: "auto", color: "#6b778c", cursor: "pointer" }}
          onClick={showCommentModal}
        >
          {like} people like it
        </span>
      </div>
      <div
        style={{ marginTop: "10px", color: "#6b778c", cursor: "pointer" }}
        onClick={showCommentModal}
      >
        {post.comments.length} comments
      </div>
      <CommentsModal
        visible={commentModalVisible}
        onCancel={handleCommentModalCancel}
        post={post}
      />
    </div>
  );
};

export default Post;
