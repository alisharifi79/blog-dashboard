import React from "react";
import Post from "../Post/Post";
import styles from "./PostList.module.css";

const PostList = ({ posts }) => {
  return (
    <div className={`${styles.container} bg-white p-4`}>
      <h2 className="fs-1 mb-4 text-dark">All Posts</h2>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Excerpt</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <Post key={post.id} post={post} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
