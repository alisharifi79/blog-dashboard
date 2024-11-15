import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';

function App() {
  const username = "John Doe";

  return (
    <Router>
      <Header username={username} />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
