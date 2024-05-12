import "./feed.css";
import { useEffect, useState } from "react";
import { Card, Avatar, Row, Col, Image, Dropdown, Menu, message } from "antd";
import { MoreOutlined, HeartOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Share from "../share/Share";
import React from "react";
import CommentsModal from "../post/CommentsModal";
import UpdatePostModal from "../post/UpdatePostModal";
import DeletePostModal from "../post/DeletePostModal";

const { Meta } = Card;

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [fileUrlsMap, setFileUrlsMap] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
  
    const likeHandler = async (id, likes) => {
      let likesAmount = likes;
      let newLikes = isLiked ? likesAmount - 1 : likesAmount + 1;
  
      try {
        await axios.put(`http://localhost:8080/api/fitnesspost/${id}`, {
          likes: newLikes,
        });
      } catch (error) {
        console.error("Error updating likes: ", error);
      }
  
      setIsLiked(!isLiked);
      fetchPosts();
    };
  
    const showCommentModal = (post) => {
      setSelectedPost(post);
      setCommentModalVisible(true);
    };
  
    const handleCommentModalCancel = () => {
      setCommentModalVisible(false);
      fetchPosts();
    };
  
    const showUpdateModal = (post) => {
      setCurrentPost(post);
      setUpdateModalVisible(true);
    };
  
    const handleUpdateModalCancel = () => {
      setUpdateModalVisible(false);
      setCurrentPost(null);
    };
  
    const showDeleteModal = (post) => {
      setCurrentPost(post);
      setDeleteModalVisible(true);
    };
  
    const handleDeleteModalCancel = () => {
      setDeleteModalVisible(false);
      setCurrentPost(null);
    };
  
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/fitnesspost/all"
        );
        const allPosts = response.data;
  
        const user = JSON.parse(localStorage.getItem("user"));
  
        const filteredPosts = allPosts.filter((post) => post.user.id === user.id);
        setPosts(filteredPosts);
  
        const fileResponse = await axios.post(
          "http://localhost:8080/api/files",
          filteredPosts.map((post) => [...post.image, ...post.video]).flat()
        );
  
        const urlsMap = {};
  
        filteredPosts.forEach((post, postIndex) => {
          const postMedia = post.image.concat(post.video);
          const postUrls = [];
          postMedia.forEach((mediaFileName, index) => {
            const fileContent =
              fileResponse.data[postMedia.length * postIndex + index];
            const byteCharacters = atob(fileContent);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
              type: "application/octet-stream",
            });
            const url = URL.createObjectURL(blob);
            postUrls.push(url);
          });
          urlsMap[postIndex] = postUrls;
        });
  
        setFileUrlsMap(urlsMap);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    return (
      <div className="feed">
        <div className="feedWrapper">
          <Share />
          <div style={{ marginTop: "20px" }}>
            {posts.map((post, index) => (
              <Card
                key={post.id}
                style={{
                  marginBottom: 20,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={
                    <div
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>{post.user.username}</span>
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => console.log("Share button Clicked!")}
                            >
                              Share
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() => showUpdateModal(post)}
                            >
                              <span>Edit</span>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              onClick={() => showDeleteModal(post)}
                            >
                              Delete
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <MoreOutlined />
                        </a>
                      </Dropdown>
                    </div>
                  }
                  description={
                    <p style={{ fontSize: "15px", color: "#3b3b3b" }}>
                      {post.caption}
                    </p>
                  }
                  style={{ marginBottom: 12 }}
                />
                <Row gutter={[16, 16]}>
                  {/* First media item in first column */}
                  <Col span={12}>
                    <div
                      style={{
                        height: "450px",
                        width: "330px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Image
                        src={fileUrlsMap[index] && fileUrlsMap[index][0]}
                        style={{
                          width: "330px",
                          height: "450px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                  {/* Other media items in second column */}
                  <Col
                    span={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Row gutter={[16, 16]}>
                      {fileUrlsMap[index] &&
                        fileUrlsMap[index].slice(1).map((url, i) => (
                          <Col
                            key={i}
                            span={24}
                            style={{ marginBottom: 0, marginLeft: "30px" }}
                          >
                            <div
                              style={{
                                height: "217px",
                                width: "270px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <Image
                                src={url}
                                style={{
                                  width: "270px",
                                  height: "217px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </Col>
                        ))}
                      {/* Render videos similarly if needed */}
                    </Row>
                    <Row>
                      <div style={{ marginTop: "20px", marginLeft: "-310px", display: "flex"}}>
                        <div
                          style={{
                            display: "flex",
                            marginRight: "20px",
                            float: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => likeHandler(post.id, post.likes)}
                        >
                          {isLiked ? (
                            <HeartOutlined
                              style={{ color: "red", marginRight: "5px" }}
                            />
                          ) : (
                            <HeartOutlined style={{ marginRight: "5px" }} />
                          )}
                          {isLiked ? (
                            <span style={{ color: "red" }}>
                              Liked ({post.likes})
                            </span>
                          ) : (
                            <span>Likes ({post.likes})</span>
                          )}
                        </div>
                        <div style={{float:"right"}}>
                          <span
                            style={{
                              marginLeft: "auto",
                              color: "#6b778c",
                              cursor: "pointer",
                              display: "flex",
                              float: "right"
                            }}
                            onClick={() => showCommentModal(post)}
                          >
                            Show comments
                          </span>
                        </div>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
          <CommentsModal
            visible={commentModalVisible}
            onCancel={handleCommentModalCancel}
            post={selectedPost}
          />
          {/* Render UpdatePostModal if currentPost exists */}
          {currentPost && (
            <UpdatePostModal
              post={currentPost}
              visible={updateModalVisible}
              onCancel={handleUpdateModalCancel}
            />
          )}
          {currentPost && (
            <DeletePostModal
              postId={currentPost.id}
              visible={deleteModalVisible}
              onCancel={handleDeleteModalCancel}
            />
          )}
        </div>
      </div>
    );
}

export default HomeFeed