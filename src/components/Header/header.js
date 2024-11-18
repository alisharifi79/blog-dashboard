import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ username }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`navbar ${styles.header}`}>
      <div className="container-fluid">
        <div className={`d-inline-flex align-items-center`}>
          <h1 className={`navbar-brand text-white mb-0 ${styles.title}`}>
            Arvan Challenge
          </h1>
          <div className={`me-3 text-white ${styles.welcomeText}`}>
            <b className="d-block d-lg-inline">Welcome</b>
            <span className="d-block d-lg-inline ms-lg-2">
              {username || "{username}"}
            </span>
          </div>
        </div>
        <div className={`d-flex align-items-center me-3 ${styles.userSection}`}>
          <button className="btn btn-outline-info" onClick={handleLogout}>
            <span className={`${styles.logoutText}`}>Logout</span>
            <i
              className={`fa-solid fa-arrow-right-from-bracket ${styles.logoutIcon}`}
            ></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
