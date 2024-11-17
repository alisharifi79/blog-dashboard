import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import MyToast from "../../components/MyToast/MyToast";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!email) {
      valid = false;
      newErrors.email = "Required field";
    }

    if (!password) {
      valid = false;
      newErrors.password = "Required field";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        user: {
          email,
          password,
        },
      };

      try {
        const baseUrl = "http://5.34.201.164:3000/api";
        const response = await fetch(`${baseUrl}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setToast({
            visible: true,
            title: "Login Failed!",
            message: errorData.errors
              ? Object.values(errorData.errors).join(", ")
              : "Invalid credentials",
            type: "error",
          });
          return;
        }

        const data = await response.json();
        login(data.user, data.user.token);
        setToast({
          visible: true,
          title: "Login Successful!",
          message: "Welcome back!",
          type: "success",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        console.error("Error during login:", error);
        setToast({
          visible: true,
          title: "Error!",
          message: "An error occurred while logging in. Please try again.",
          type: "error",
        });
      }
    }

    setTimeout(
      () => setToast({ visible: false, title: "", message: "", type: "" }),
      3000
    );
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100`}>
      <div className={`p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-center mb-4 ${styles.header}`}>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-gray">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-gray">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-gray fw-bold text-decoration-none"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
      {toast.visible && (
        <MyToast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ title: "", visible: false, message: "", type: "" })
          }
        />
      )}
    </div>
  );
};

export default Login;
