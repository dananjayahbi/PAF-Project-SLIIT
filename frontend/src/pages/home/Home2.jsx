import Topbar2 from "../../components/topbar/Topbar2";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed2 from "../../components/feed/Feed2";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar2 />
      <div className="homeContainer">
        <Sidebar />
        <Feed2 />
        <Rightbar />
      </div>
    </>
  );
}
