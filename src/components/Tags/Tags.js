import React, { useState, useEffect } from "react";
import styles from "./Tags.module.css";
import { useToast } from "../../context/ToastContext";

const Tags = ({ selectedTags, setSelectedTags }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const addNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag)) {
      const updatedTags = [...availableTags, newTag].sort();
      setAvailableTags(updatedTags);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    } else {
      showToast("Error!", "Tag already exist", "error");
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
    const fetchTags = async () => {
      setLoading(true);

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
        showToast("Error", error.message || "Failed to fetch tags", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [showToast]);

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
        {loading ? (
          <div className="d-flex col-12 justify-content-center align-items-center p-3">
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
    </div>
  );
};

export default Tags;
