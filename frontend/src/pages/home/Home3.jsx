import Topbar3 from "../../components/topbar/Topbar4";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed3 from "../../components/feed/Feed3";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar3 />
      <div className="homeContainer">
        <Sidebar />
        <Feed3 />
        <Rightbar />
      </div>
    </>
  );
}
