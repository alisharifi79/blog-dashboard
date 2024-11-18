import React, { useState } from "react";
import styles from "./Post.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Post = ({ post, index, showToast, onDelete, viewMode = "table" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth.token;

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

  const handleEditClick = () => {
    navigate(`/edit-article/${post.slug}`, { state: { post } });
  };

  const handleDeleteConfirm = async () => {
    const baseUrl = "http://5.34.201.164:3000/api";
    const url = `${baseUrl}/articles/${post.slug}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      showToast("Success", "Article deleted successfully", "success");
      setShowDeleteModal(false);
      onDelete();
    } catch (error) {
      showToast("Error", "Error deleting article", "error");
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      {viewMode === "table" ? (
        <tr className="align-middle">
          <td>{index}</td>
          <td>{post.title}</td>
          <td>@{post.author.username}</td>
          <td>
            <div className="d-flex flex-wrap">
              {post.tagList.map((tag, idx) => (
                <div
                  key={idx}
                  className="card text-gray bg-light mx-1 my-1 px-2 rounded fs-6"
                >
                  #{tag}
                </div>
              ))}
            </div>
          </td>
          <td>
            {post.body.split(" ").slice(0, 20).join(" ")}
            {post.body.split(" ").length > 20 ? "..." : ""}
          </td>
          <td>{new Date(post.createdAt).toLocaleDateString()}</td>
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
                  className={`dropdown-menu dropdown-menu-start show ${styles.dropdownMenu}`}
                  onMouseLeave={closeDropdown}
                >
                  <li>
                    <button className="dropdown-item" onClick={handleEditClick}>
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
      ) : (
        <div className={`${styles.card}`}>
          <h3 className="mb-2">{post.title}</h3>
          <p className={`${styles.author} mb-1 text-gray`}>
            <b>Author:</b> {post.author.username}
          </p>
          <div className="d-flex flex-wrap">
            {post.tagList.map((tag, idx) => (
              <div
                key={idx}
                className="card text-gray bg-light mx-1 my-1 px-2 rounded fs-6"
              >
                #{tag}
              </div>
            ))}
          </div>
          <p className={`${styles.excerpt} mb-1`}>
            {post.body.split(" ").slice(0, 20).join(" ")}
            {post.body.split(" ").length > 20 ? "..." : ""}
          </p>
          <div className="actions d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm mx-1"
              onClick={handleEditClick}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              className="btn btn-danger btn-sm mx-1"
              onClick={handleDeleteClick}
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      )}
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
