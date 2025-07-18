import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBookmark, FaDownload, FaStar } from "react-icons/fa";
import "../styles/DashboardStudent.css";

const dummyMaterials = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn React fundamentals with this video series.",
    url: "/materials/1",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript advanced concepts.",
    url: "/materials/2",
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    description: "Master CSS Grid with practical examples.",
    url: "/materials/3",
  },
];

const dummyRoadmapProgress = [
  { id: 1, title: "HTML Basics", completed: true },
  { id: 2, title: "CSS Fundamentals", completed: true },
  { id: 3, title: "JavaScript Basics", completed: false },
  { id: 4, title: "React Basics", completed: false },
];

const dummyAnnouncements = [
  {
    id: 1,
    title: "New Roadmap Released!",
    date: "2025-07-10",
    content: "Check out the new AI/ML roadmap to boost your skills.",
  },
  {
    id: 2,
    title: "Maintenance Scheduled",
    date: "2025-07-15",
    content: "Platform maintenance on July 20th from 1 AM to 4 AM UTC.",
  },
];

const dummyBookmarks = [
  { id: 1, title: "React Basics", url: "/materials/1" },
  { id: 3, title: "CSS Grid Layout", url: "/materials/3" },
];

const DashboardStudent = () => {
  const [bookmarks, setBookmarks] = useState(dummyBookmarks);
  const [dailyStreak, setDailyStreak] = useState(5); // Example streak count

  const toggleBookmark = (material) => {
    setBookmarks((prev) => {
      if (prev.find((b) => b.id === material.id)) {
        return prev.filter((b) => b.id !== material.id);
      } else {
        return [...prev, material];
      }
    });
  };

  return (
    <div className="page dashboard-student">
      <h2>👋 Welcome Back, Student!</h2>
      <p>Your personalized learning home.</p>

      {/* Progress Tracker */}
      <section className="progress-tracker-section">
        <h3>Your Learning Progress</h3>
        <div className="progress-bar-container" aria-label="Learning progress">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: "50%" }} // Example progress
            transition={{ duration: 1.5 }}
          />
        </div>
        <p>50% completed</p>
      </section>

      {/* Daily Streak */}
      <section className="daily-streak">
        <FaStar className="streak-icon" aria-hidden="true" />
        <p>🔥 Daily Streak: {dailyStreak} days</p>
      </section>

      {/* Recently Uploaded Materials */}
      <section className="recent-materials">
        <h3>Recently Uploaded Materials</h3>
        <div className="materials-grid">
          {dummyMaterials.map((mat) => (
            <motion.div
              key={mat.id}
              className="material-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h4>{mat.title}</h4>
              <p>{mat.description}</p>
              <div className="material-actions">
                <a href={mat.url} download className="btn download-btn" aria-label={`Download ${mat.title}`}>
                  <FaDownload /> Download
                </a>
                <button
                  className={`btn bookmark-btn ${
                    bookmarks.find((b) => b.id === mat.id) ? "bookmarked" : ""
                  }`}
                  onClick={() => toggleBookmark(mat)}
                  aria-pressed={bookmarks.find((b) => b.id === mat.id) ? "true" : "false"}
                  aria-label={bookmarks.find((b) => b.id === mat.id) ? "Remove bookmark" : "Bookmark"}
                >
                  <FaBookmark /> {bookmarks.find((b) => b.id === mat.id) ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roadmap Progress */}
      <section className="roadmap-progress">
        <h3>Your Roadmap Progress</h3>
        <ul className="roadmap-list" aria-label="Roadmap progress list">
          {dummyRoadmapProgress.map((topic) => (
            <li key={topic.id} className={topic.completed ? "completed" : ""}>
              <input type="checkbox" checked={topic.completed} readOnly />
              <span>{topic.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Announcements */}
      <section className="announcements-section">
        <h3>Announcements</h3>
        <ul className="announcement-list">
          {dummyAnnouncements.map(({ id, title, date, content }) => (
            <li key={id}>
              <h4>{title}</h4>
              <small>{new Date(date).toLocaleDateString()}</small>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Bookmarked Resources */}
      <section className="bookmarked-resources">
        <h3>Your Bookmarked Resources</h3>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <ul>
            {bookmarks.map((bm) => (
              <li key={bm.id}>
                <a href={bm.url}>{bm.title}</a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardStudent;