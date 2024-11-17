import React, { useCallback, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Post from "../Post/Post";
import { useToast } from "../../context/ToastContext";
import styles from "./PostList.module.css";
import { useAuth } from "../../context/AuthContext";

const PostList = () => {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const token = auth.token;

  const postsPerPage = 10;

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    const baseUrl = "http://5.34.201.164:3000/api";
    const url =
      currentPage === 1
        ? `${baseUrl}/articles`
        : `${baseUrl}/articles/page/${currentPage}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data.articles || []);
      setTotalPosts(data.articlesCount);
    } catch (error) {
      showToast("Error", error.message || "Failed to fetch posts", "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    setCurrentPosts(posts.slice(startIdx, endIdx));
  }, [posts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`${styles.container} bg-white p-4 pe-2`}>
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
          ) : currentPosts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-3">
                No posts available.
              </td>
            </tr>
          ) : (
            currentPosts.map((post, index) => (
              <Post
                key={post.slug}
                post={post}
                index={index + 1 + (currentPage - 1) * postsPerPage}
                showToast={showToast}
                onDelete={fetchPosts}
              />
            ))
          )}
        </tbody>
      </table>
      {posts.length > 0 && (
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
      )}
    </div>
  );
};

export default PostList;
