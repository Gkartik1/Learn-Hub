import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaMedal, FaTrophy } from "react-icons/fa";
import "../styles/ProgressTracker.css";

const badges = [
  { id: 1, name: "Beginner", icon: <FaStar />, description: "Completed first module" },
  { id: 2, name: "Achiever", icon: <FaMedal />, description: "Completed 5 modules" },
  { id: 3, name: "Champion", icon: <FaTrophy />, description: "Completed entire roadmap" },
];

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(7);
  const [earnedBadges, setEarnedBadges] = useState([1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="progress-tracker" aria-label="Learning progress tracker">
      <h3>Your Learning Progress</h3>
      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <p>{progress}% completed</p>

      <div className="daily-streak" aria-label="Daily learning streak">
        <FaStar className="streak-icon" aria-hidden="true" />
        <span>{streak} day{streak > 1 ? "s" : ""} streak</span>
      </div>

      <div className="badges-section" aria-label="Earned badges">
        <h4>Badges Earned</h4>
        <div className="badges-grid">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`badge ${earnedBadges.includes(badge.id) ? "earned" : "locked"}`}
              tabIndex={0}
              aria-label={`${badge.name} badge: ${badge.description}`}
              title={badge.description}
            >
              {badge.icon}
              <span>{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;