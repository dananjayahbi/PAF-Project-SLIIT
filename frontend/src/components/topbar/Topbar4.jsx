import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Settings,
} from "@material-ui/icons";
import userAvatar from "../../assets/images/my-profile.jpg";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <a href="/" style={{ textDecoration: "none" }}>
          <span className="logo" style={{ color: "#fff" }}>
            FitnessHub
          </span>
        </a>
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
            <span className="topbarLink">Home</span>
          </a>
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <span className="topbarLink">Timeline</span>
          </a>
        </div>
        <div className="topbarIcons">
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>{" "}
            </div>
          </a>
          <a style={{ textDecoration: "none", color: "#fff" }} href="#">
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>{" "}
            </div>
          </a>
          <a style={{ textDecoration: "none", color: "#fff" }} href="/AllWorkout">
            <div className="topbarIconItem">
                <Settings />
            </div>
          </a>
        </div>
        <img
          onClick={() => (window.location.href = "/profile")}
          src={userAvatar}
          alt=""
          className="topbarImg"
        />
      </div>
    </div>
  );
}
