import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user,setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{

    const token = localStorage.getItem("token");

    axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    .then(res=>{
      setUser(res.data);
    });

  },[]);

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  if(!user) return <div>Loading...</div>

  return(

    <div className="profile-page">

      <div className="profile-card">

        <div className="avatar">
          👤
        </div>

        <h2>{user.fullName}</h2>

        <div className="profile-info">

          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

        </div>

        <div className="profile-buttons">

          <button onClick={()=>navigate("/orders")}>
            📦 Đơn hàng của tôi
          </button>

          <button onClick={()=>navigate("/cart")}>
            🛒 Giỏ hàng
          </button>

          <button className="logout" onClick={handleLogout}>
            Đăng xuất
          </button>

        </div>

      </div>

    </div>

  )

}

export default Profile;