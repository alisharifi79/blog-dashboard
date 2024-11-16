import React from "react";
import PropTypes from "prop-types";
import styles from "./MyToast.module.css";

const MyToast = ({ title, message, type, onClose }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between px-3 py-2 ${styles.toast} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      <div>
        <span className="fw-bold me-2">{title}</span>
        <span>{message}</span>
      </div>
      <button
        className={`btn-close text-gray ms-2 ${styles.closeButton}`}
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

MyToast.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  onClose: PropTypes.func,
};

export default MyToast;
