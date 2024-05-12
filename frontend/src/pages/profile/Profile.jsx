import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import userAvatar from "../../assets/images/120259208.png";

export default function Profile() {
  // get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/persons/back.jpg"
                alt=""
              />
              <img
                className="profileUserImg"
                src={userAvatar}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName" style={{fontFamily: "sans-serif"}}>{user?.firstName +" "+ user?.lastName}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
