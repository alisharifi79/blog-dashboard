import React from 'react';
import PostList from '../../components/PostList/PostList';
import styles from './Dashboard.module.css';

const Dashboard = () => {

  return (
    <div className={`container bg-white ${styles.dashboard}`}>
      <PostList />
    </div>
  );
};

export default Dashboard;