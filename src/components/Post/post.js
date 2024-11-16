import React, { useState } from "react";
import styles from "./Post.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";

const Post = ({ post, index }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    closeDropdown();
  };

  const handleDeleteConfirm = () => {
    console.log("Post deleted:", post.title);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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
              className={`btn btn-sm dropdown-toggle ${styles.dropdownButton}`}
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <span className="fs-5 me-3">... </span>
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
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            )}
          </div>
        </td>
      </tr>
      <DeleteModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        postTitle={post.title}
      />
    </>
  );
};

export default Post;
