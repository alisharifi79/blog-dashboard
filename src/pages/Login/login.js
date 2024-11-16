import React, { useState } from "react";
import styles from "./Login.module.css";
import MyToast from "../../components/MyToast/MyToast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (email === "test@example.com" && password === "password") {
        setToast({
          visible: true,
          title: "Login Successful!",
          message: "Welcome back!",
          type: "success",
        });
      } else {
        setToast({
          visible: true,
          title: "Login Failed!",
          message: "Username and/or Password is invalid",
          type: "error",
        });
      }

      setTimeout(
        () => setToast({ visible: false, title: "", message: "", type: "" }),
        3000
      );
    }
  };

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
