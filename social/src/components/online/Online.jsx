import "./online.css";

export default function Online({friend}) {
  const PF = "http://localhost:5500/images/"; 

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF + friend.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend.username}</span>  
    </li>
  );
}
