import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Register = () => {
  const { login, auth } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!username) {
      valid = false;
      newErrors.username = "Required field";
    }

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
          username,
        },
      };

      try {
        const baseUrl = "http://5.34.201.164:3000/api";
        const url = `${baseUrl}/users`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          showToast(
            "Registration Failed",
            errorData.errors
              ? Object.values(errorData.errors).join(", ")
              : "Invalid registration details",
            "error"
          );
          return;
        }

        const data = await response.json();

        if (data?.user && data.user.token) {
          login(data.user, data.user.token);
          showToast("Registration Successful!", "Welcome to the platform!", "success");
          navigate("/");
        } else {
          showToast("Error", "Invalid response from server.", "error");
        }
      } catch (error) {
        showToast("Error", "Network or server error. Please try again.", "error");
      }
    }
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100`}>
      <div className={`p-5 shadow-sm ${styles.card}`}>
        <h2 className={`text-center mb-4 ${styles.header}`}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-gray">
              User
            </label>
            <input
              type="text"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
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
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-gray fw-bold text-decoration-none">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
