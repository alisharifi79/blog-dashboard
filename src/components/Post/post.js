import React, { useState } from "react";
import styles from "./Post.module.css";

const Post = ({ post, index }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <tr className="align-middle">
      <td>{index}</td>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.tags}</td>
      <td>{post.excerpt}</td>
      <td>{post.created}</td>
      <td className="position-relative">
        <div className="dropdown">
          <button
            className={`btn btn-primary btn-sm dropdown-toggle ${styles.dropdownButton}`}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            Actions
          </button>
          {isDropdownOpen && (
            <ul
              className={`dropdown-menu dropdown-menu-end show ${styles.dropdownMenu}`}
              onMouseLeave={closeDropdown}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => console.log("Edit post")}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => console.log("Delete post")}
                >
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Post;
