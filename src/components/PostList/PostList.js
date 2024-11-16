import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import styles from "./PostList.module.css";
import { Pagination } from "react-bootstrap";

const PostList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentPosts, setCurrentPosts] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    setCurrentPosts(posts.slice(0, postsPerPage));
    setLoading(false);
  }, [posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentPosts(
      posts.slice((page - 1) * postsPerPage, page * postsPerPage)
    );
  };

  return (
    <div className={`${styles.container} bg-white p-4`}>
      <h2 className="fs-1 mb-4 text-dark">All Posts</h2>
      <table className="table table-hover">
        <thead className={`${styles.thead} table-light`}>
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
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center p-3">
                <div className="d-flex justify-content-center align-items-center">
                  <span
                    className="spinner-border text-primary me-2"
                    role="status"
                  />
                </div>
              </td>
            </tr>
          ) : (
            currentPosts.map((post, index) => (
              <Post
                key={post.id}
                post={post}
                index={index + indexOfFirstPost + 1}
              />
            ))
          )}
        </tbody>
      </table>
      <Pagination className="d-flex justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PostList;
