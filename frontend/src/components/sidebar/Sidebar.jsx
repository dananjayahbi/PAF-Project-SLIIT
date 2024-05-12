import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  Chat,
  Group,
  Bookmark,
  HelpOutline,
  Event,
  School,
  AccessAlarmOutlined,
  WorkOutline,
  RestaurantOutlined,
} from "@material-ui/icons";
import { Users } from "../../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";



export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">          
          <li className="sidebarListItem">
            <AccessAlarmOutlined className="sidebarIcon" />
            <Link to="/status-main" className="sidebarLink">
              <span className="sidebarListItemText">Workout Status</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <Link to="/workout" className="sidebarLink">
              <span className="sidebarListItemText">Workout Plans</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <RestaurantOutlined className="sidebarIcon" />
            <Link to="/meal" className="sidebarLink">
              <span className="sidebarListItemText">Meal Plans</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to="/#" className="sidebarLink">
              <span className="sidebarListItemText">Message</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <Link to="/#" className="sidebarLink">
              <span className="sidebarListItemText">Group</span>
            </Link>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h4 className="sidebarTitle">Close Friends</h4>
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
