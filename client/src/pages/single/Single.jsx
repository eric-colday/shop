import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import Navbar from "../../components/navbar/Navbar";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";

export default function Single() {
  return (
    <>
      <Announcement />
      <Navbar />
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
      <Contact />
      <Footer />
    </>
  );
}
