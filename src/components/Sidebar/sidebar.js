import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={`${styles.sidebar} d-flex flex-column py-2`}>
      <span className="text-white fs-3 mb-4 mt-1 px-3">Post</span>
      <nav>
        <ul className="list-unstyled">
          <li className="mb-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `${isActive ? styles.active : ''} d-block text-white text-decoration-none px-4 py-2`
              }>
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/new-article" 
              className={({ isActive }) => 
                `${isActive ? styles.active : ''} d-block text-white text-decoration-none px-4 py-2`
              }>
              New Article
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
