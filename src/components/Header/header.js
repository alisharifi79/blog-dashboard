import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className={`navbar bg-dark ${styles.header}`}>
      <div className="container-fluid">
        <div className={`d-inline-flex align-items-center`}>
          <h1 className={`navbar-brand text-white mb-0 ${styles.title}`}>
            Arvan Challenge
          </h1>
          <span className="me-3 text-white">
            Welcome {username || "{username}"}
          </span>
        </div>
        <div className={`d-flex align-items-center me-3 ${styles.userSection}`}>
          <button
            className="btn btn-outline-info btn-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
