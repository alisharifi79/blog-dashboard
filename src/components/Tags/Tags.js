import React, { useState, useEffect } from "react";
import styles from "./Tags.module.css";
import MyToast from "../MyToast/MyToast";

const Tags = ({ selectedTags, setSelectedTags }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  const fetchTags = async () => {
    setLoading(true);
    setError(null);

    const baseUrl = "http://5.34.201.164:3000/api";
    const url = `${baseUrl}/tags`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.statusText}`);
      }

      const data = await response.json();
      setAvailableTags(data.tags.sort() || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({
      visible: true,
      message: message,
      type: type,
    });

    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const addNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag)) {
      const updatedTags = [...availableTags, newTag].sort();
      setAvailableTags(updatedTags);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    } else {
      showToast("Tag already exist!", "error");
    }
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className={`${styles.tagsContainer}`}>
      <h5>Tags</h5>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="New tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addNewTag();
            }
          }}
        />
        <button type="button" className="btn btn-secondary" onClick={addNewTag}>
          Add
        </button>
      </div>
      <div className={`list-group border shadow-sm p-2 ${styles.tagList}`}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center p-3">
            <span className="spinner-border text-primary me-2" role="status" />
          </div>
        ) : (
          availableTags.map((tag) => (
            <label key={tag} className={`list-group-item ${styles.listItem}`}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="form-check-input me-2 ms-1"
              />
              <span className={styles.checkboxLabel}>{tag}</span>
            </label>
          ))
        )}
      </div>
      {toast.visible && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <MyToast
            title=""
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, visible: false })}
          />
        </div>
      )}
    </div>
  );
};

export default Tags;
