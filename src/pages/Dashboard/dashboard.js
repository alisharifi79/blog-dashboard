import React, { useState, useEffect } from 'react';
import PostList from '../../components/PostList/PostList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchedPosts = [
      { id: 1, title: 'Article 1', author: '@author_1', tags: 'tag1, tag2', excerpt: 'First 20 words of article body for Article 1', created: 'June 11, 2019' },
      { id: 2, title: 'Article 2', author: '@author_2', tags: 'tag3, tag4', excerpt: 'First 20 words of article body for Article 2', created: 'July 20, 2020' },
      { id: 3, title: 'Article 3', author: '@author_3', tags: 'tag5, tag6', excerpt: 'First 20 words of article body for Article 3', created: 'August 5, 2021' },
      { id: 4, title: 'Article 4', author: '@author_4', tags: 'tag7, tag8', excerpt: 'First 20 words of article body for Article 4', created: 'September 12, 2022' },
      { id: 5, title: 'Article 5', author: '@author_5', tags: 'tag9, tag10', excerpt: 'First 20 words of article body for Article 5', created: 'October 15, 2018' },
      { id: 6, title: 'Article 6', author: '@author_6', tags: 'tag11, tag12', excerpt: 'First 20 words of article body for Article 6', created: 'November 23, 2017' },
      { id: 7, title: 'Article 7', author: '@author_7', tags: 'tag13, tag14', excerpt: 'First 20 words of article body for Article 7', created: 'December 3, 2016' },
      { id: 8, title: 'Article 8', author: '@author_8', tags: 'tag15, tag16', excerpt: 'First 20 words of article body for Article 8', created: 'January 19, 2015' },
      { id: 9, title: 'Article 9', author: '@author_9', tags: 'tag17, tag18', excerpt: 'First 20 words of article body for Article 9', created: 'February 28, 2014' },
      { id: 10, title: 'Article 10', author: '@author_10', tags: 'tag19, tag20', excerpt: 'First 20 words of article body for Article 10', created: 'March 10, 2013' },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <div className={`container bg-white ${styles.dashboard}`}>
      <PostList posts={posts} />
    </div>
  );
};

export default Dashboard;