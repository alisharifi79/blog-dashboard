import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`${styles.burgerButton} ${isOpen ? styles.hidden : ""}`}
        onClick={toggleSidebar}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed} d-flex flex-column py-2`}
      >
        <button className={styles.closeButton} onClick={closeSidebar}>
          <i class="fa-solid fa-xmark"></i>
        </button>
        <span className="text-white fs-3 mb-4 mt-1 px-3">Post</span>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? styles.active : ""} d-block text-white text-decoration-none px-4 py-2`
                }
              >
                All Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-article"
                className={({ isActive }) =>
                  `${isActive ? styles.active : ""} d-block text-white text-decoration-none px-4 py-2`
                }
              >
                New Article
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      {isOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
    </>
  );
};

export default Sidebar;
