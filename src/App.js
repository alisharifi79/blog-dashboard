import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewArticle from "./pages/NewArticle/NewArticle";

const MainLayout = ({ children, username }) => (
  <>
    <Header username={username} />
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-3">{children}</main>
    </div>
  </>
);

const AuthLayout = ({ children }) => (
  <main className="vh-100 d-flex align-items-center justify-content-center bg-white">
    {children}
  </main>
);

function App() {
  const username = "John Doe";

  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Main Pages */}
        <Route
          path="/"
          element={
            <MainLayout username={username}>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/new-article"
          element={
            <MainLayout username={username}>
              <NewArticle />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
