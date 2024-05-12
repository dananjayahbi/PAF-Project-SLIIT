import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Search, Chat, Person, Notifications } from "@material-ui/icons";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import userAvatar from "../../assets/images/my-profile.jpg";
import "./topbar.css";
import { Link } from 'react-router-dom';

export default function Topbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => window.location.href = "/profile"}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
       <a href="/" style={{textDecoration: "none"}}><span className="logo" style={{ color: "#fff" }}>FitnessHub</span></a> 
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <a style={{textDecoration: "none", color: "#fff"}} href="/"><span className="topbarLink">Home</span></a>
          </a>
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <span className="topbarLink">Timeline</span>
          </a>
        </div>
        <div className="topbarIcons">
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
          </a>
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </a>
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <img src={userAvatar} alt="" className="topbarImg" />
        </Dropdown>
      </div>
    </div>
  );
}
