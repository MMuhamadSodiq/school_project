import { Outlet, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import "./Admin.css";
const Admin = () => {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="admin">
      <div className="sidebar">
        <div className="menu">Menu</div>
        <div className="item">
          <FaUserGraduate size={30} />
          <div className="text" onClick={()=>navigate("/admin/dashboard/teachers")}>O'qituvchi</div>
        </div>
        <div className="item">
          <BsCalendarEvent size={30} />
          <div className="text">Tadbirlar</div>
        </div>
        <div className="item">
          <FaUser size={30} />
          <div className="text">O'quvchilar</div>
        </div>
      </div>
      <div className="right">
        <div className="header">
          <h2>Admin Panel</h2>
          <button className="btn btn-danger" onClick={logout}>
            Chiqish
          </button>
        </div>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
