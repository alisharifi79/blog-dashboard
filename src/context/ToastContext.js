import React, { createContext, useState, useContext } from "react";
import MyToast from "../components/MyToast/MyToast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  const showToast = (title, message, type) => {
    setToast({ visible: true, title, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && (
        <div className="toast-container position-fixed bottom-0 end-0 m-3">
          <MyToast
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
