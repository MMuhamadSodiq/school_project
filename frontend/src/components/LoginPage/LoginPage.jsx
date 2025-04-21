import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { matchRoutes, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { domen } from "../..";
const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  function login(e) {
    e.preventDefault();
    axios
      .post(domen+"/login", {
        username:data.username,
        password:data.password
      })
      .then((res) => {
        localStorage.setItem("token",res.data)
        toast.success("muvafaqiyatli tizimga kirildi!")
        setTimeout(()=>{
          navigate(`/admin/dashboard`)
          setData({username:"",password:""})
        },1500)
      })
      .catch((e) => {
        toast.error("username yoki parol xato!")
        setData({username:"",password:""})
      });
  }
  return (
    <div className="login">
      <div className="container">
        <div className="row col-12 m-1">
          <div className="col-lg-3 col-md-2 "></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">ADMIN PANEL</div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={login}>
                  <div className="form-group">
                    <label className="form-control-label">USERNAME</label>
                    <input value={data.username} type="text" required onChange={(e)=>setData({...data,username:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input value={data.password} type="password" required onChange={(e)=>setData({...data,password:e.target.value})}/>
                  </div>
                  <div className="col-lg-12 loginbttm">
                      <button className="btn btn-primary">
                        Kirish
                      </button>
                  </div>
                  
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
