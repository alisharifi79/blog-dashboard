import React, { useEffect, useState } from "react";
import styles from "./EditArticle.module.css";
import Tags from "../../components/Tags/Tags";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

function EditArticle() {
  const { state } = useLocation();
  const { post } = state || {};
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");
  const { showToast } = useToast();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
  });
  const token = auth.token;

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        body: post.body,
      });
      setSelectedTags(post.tagList || []);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const articleData = {
      article: {
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: selectedTags,
      },
    };

    const baseUrl = "http://5.34.201.164:3000/api";
    const url = `${baseUrl}/articles/${post.slug}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update article");
      }

      showToast("Well done!", "Article updated successfully", "success");

      navigate("/");
    } catch (error) {
      showToast(
        "Error",
        "Failed to update article. Please try again.",
        "error"
      );
      setError("Failed to update article. Please try again.");
    }
  };

  return (
    <div className={`container mt-4 px-4 ${styles.editArticle}`}>
      <h1 className={`text-start ${styles.title}`}>Edit Article</h1>
      <div className="row">
        <div className="col-12 col-lg-9 py-4 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-2 mb-lg-3">
              <label htmlFor="body" className="form-label">
                Body
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="form-control"
                rows="5"
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="d-none d-lg-block">
              <button
                type="submit"
                className={`btn btn-primary fs-6 px-3 ${styles.submitBtn}`}
              >
                Submit
              </button>
            </div>
            <div className="col-12 d-block d-lg-none mt-0">
              <Tags
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
            <div className="col-12 d-block d-lg-none mt-3 text-center">
              <button
                type="submit"
                className={`btn btn-primary fs-6 px-5 ${styles.submitBtn}`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-3 d-none d-lg-block mt-0 mt-lg-0">
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
      </div>
    </div>
  );
}

export default EditArticle;
