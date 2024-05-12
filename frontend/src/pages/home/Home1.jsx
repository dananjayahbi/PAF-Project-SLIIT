import Topbar from "../../components/topbar/Topbar1";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/feed1";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home1() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
