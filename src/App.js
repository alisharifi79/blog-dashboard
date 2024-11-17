import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewArticle from "./pages/NewArticle/NewArticle";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import EditArticle from "./pages/EditArticle/EditArticle";
import { ToastProvider } from "./context/ToastContext";

const MainLayout = ({ children }) => {
  const { auth } = useAuth();

  return (
    <>
      <Header username={auth.user?.username} />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-3 main-container">{children}</main>
      </div>
    </>
  );
};

const AuthLayout = ({ children }) => (
  <main className="vh-100 d-flex align-items-center justify-content-center bg-white">
    {children}
  </main>
);

function App() {
  return (
    <ToastProvider>
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
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/new-article"
            element={
              <MainLayout>
                <NewArticle />
              </MainLayout>
            }
          />
          <Route
            path="/edit-article/:slug"
            element={
              <MainLayout>
                <EditArticle />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
