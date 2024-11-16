import React, { useState } from "react";
import styles from "./NewArticle.module.css";
import Tags from "../../components/Tags/Tags";

function NewArticle() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      ...formData,
      tags: selectedTags,
    };
    console.log("Form submitted:", articleData);
  };

  return (
    <div className={`container mt-2 ${styles.newArticle}`}>
      <h1 className={`text-start ${styles.title}`}>New Article</h1>
      <div className="d-inline-flex col-12">
      <form onSubmit={handleSubmit} className="col-9 py-4 bg-white">
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
        <div className="mb-3">
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
        <button
          type="submit"
          className={`btn btn-primary fs-6 px-3 ${styles.submitBtn}`}
        >
          Submit
        </button>
      </form>
       <div className="col-3 mx-4">
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
