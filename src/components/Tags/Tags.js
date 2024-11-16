import React, { useState, useEffect } from "react";
import styles from "./Tags.module.css";

const Tags = ({ selectedTags, setSelectedTags }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsFromApi = ["React", "JavaScript", "Node", "CSS", "HTML"];
      const sortedTags = tagsFromApi.sort();
      setAvailableTags(sortedTags);
    };
    fetchTags();
    if (availableTags && availableTags.length > 0) {
      setLoading(false);
    }
  }, [availableTags]);

  const addNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag)) {
      const updatedTags = [...availableTags, newTag].sort();
      setAvailableTags(updatedTags);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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
    </div>
  );
};

export default Tags;
