import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";
import "../styles/Notifications.css";

const iconMap = {
  info: <FaInfoCircle />,
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
};

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [notifications, removeNotification]);

  return (
    <div className="notifications-container" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            className={`notification ${type}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            <div className="icon">{iconMap[type] || iconMap.info}</div>
            <div className="message">{message}</div>
            <button
              className="close-btn"
              onClick={() => removeNotification(id)}
              aria-label="Dismiss notification"
            >
              <FaTimes />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;