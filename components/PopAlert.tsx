import React, { useEffect } from "react";

interface ModalProps {
  message: string;
  type: "success" | "error"; // New prop to determine the type of message
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the modal after 3 seconds
    }, 3000); // 3 seconds delay for disappearing

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [onClose]);

  const circleColor = type === "success" ? "#28a745" : "#dc3545"; // Green for success, red for error

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#ff8552",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "50px",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Circle with color change */}
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: circleColor, // Dynamic color
          marginRight: "10px",
        }}
      />
      {message}
    </div>
  );
};

export default Modal;
