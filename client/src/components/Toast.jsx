{/* Toast notification component */}

import React, { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';

const Toast = ({ type = 'info', title, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <AiOutlineCheckCircle className="toast-icon" style={{ color: '#10b981' }} />;
      case 'error':
        return <AiOutlineCloseCircle className="toast-icon" style={{ color: 'var(--color-red)' }} />;
      default:
        return <AiOutlineInfoCircle className="toast-icon" style={{ color: 'var(--color-primary)' }} />;
    }
  };

  return (
    <div className={`toast ${type}`}>
      {getIcon()}
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Toast;
