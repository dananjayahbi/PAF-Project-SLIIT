import "./rightbar.css";
import React, { useEffect, useState } from "react";
import { Users } from "../../../dummyData";
import { Button } from "antd";
import Online from "../online/Online";
import EditProfileModal from "./EditProfileModal";
import DeleteProfileModal from "./DeleteProfileModal";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [editProfileModalVisible, setEditProfileVisible] = useState(false);
    const [deleteProfileModalVisible, setDeleteProfileVisible] = useState(false);

    // get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    const showEditProfileModal = () => {
      setEditProfileVisible(true);
    };

    const handleEditProfileModalCancel = () => {
      setEditProfileVisible(false);
    };

    const showDeleteProfileModal = () => {
      setDeleteProfileVisible(true);
    }

    const handleDeleteProfileModalCancel = () => {
      setDeleteProfileVisible(false);
    }

    return (
      <>
        <h4 className="rightbarTitle" style={{ fontFamily: "sans-serif" }}>
          User information
        </h4>
        <div className="rightbarInfo" style={{ fontFamily: "sans-serif" }}>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Username:</span>
            <span className="rightbarInfoValue">{user?.username}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{user?.email}</span>
          </div>
          <div>
            <Button type="primary" style={{ marginTop: "10px" }} onClick={showEditProfileModal}>
              Edit Profile
            </Button>
            <Button type="primary" danger style={{ marginTop: "10px", marginLeft: "5px" }} onClick={showDeleteProfileModal}>
              Delete Profile
            </Button>
          </div>
          <EditProfileModal
            visible={editProfileModalVisible}
            onCancel={handleEditProfileModalCancel}
          />
          <DeleteProfileModal
            visible={deleteProfileModalVisible}
            onCancel={handleDeleteProfileModalCancel}
          />
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}