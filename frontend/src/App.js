import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { domen } from "./index";
import { useNavigate } from "react-router-dom";
import Admin from "./components/admin/Admin";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Teacher from "./components/Teacher/Teacher";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Hedader Init
      let headers = {
        token,
      };
      // Blocked Pages
      if (blockedPages.includes(location.pathname)) {
        //  Navigating back fake token users in dashboard pages
        axios.get(domen + "/me", { headers }).then(res=>setChecking(true)).catch((err) => {
          navigate("/");
          localStorage.removeItem("token");
          setChecking(true);
        });
      }
      // case for admins or teachers who already signed in before
      else if (location.pathname == "/") {
        axios
          .get(domen + "/me", { headers })
          .then((res) => {
            navigate('/admin/dashboard');
            setChecking(true);
          })
          // Navigating back fake token users in login page
          .catch((err) => {
            localStorage.removeItem("token");
          });
      }
    } else {
      if (blockedPages.includes(location.pathname)) {
        navigate("/");
      }
      setChecking(true)
    }
  }, [location.pathname]);
  const blockedPages = ["/admin/dashboard","/admin/dashboard/teachers"];
  return checking ? (
    <Routes>
      <Route path="/admin/dashboard" element={<Admin />}>
        <Route path="/admin/dashboard/teachers" element={<Teacher />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<NotFoundPage />}/>
    </Routes>
  ) : (
   <Routes>
    <Route path="/*" element={<NotFoundPage />}/>
   </Routes>
  );
}

export default App;
