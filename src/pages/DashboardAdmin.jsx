import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaUsers, FaBullhorn, FaTimes } from "react-icons/fa";
import "../styles/DashboardAdmin.css";

const initialStats = {
  totalStudents: 10234,
  totalMentors: 512,
  totalMaterials: 1345,
  totalAdmins: 12,
};

const initialActivities = [
  {
    id: 1,
    description: "New study material 'React Basics' uploaded by Admin.",
    timestamp: "2025-07-10T14:30:00Z",
  },
  {
    id: 2,
    description: "User 'Riya Singh' promoted to Mentor.",
    timestamp: "2025-07-09T10:15:00Z",
  },
  {
    id: 3,
    description: "Announcement 'Platform Maintenance' posted.",
    timestamp: "2025-07-08T08:00:00Z",
  },
];

const DashboardAdmin = () => {
  const [stats] = useState(initialStats);
  const [activities, setActivities] = useState(initialActivities);

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  // Upload Material form state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  // Roadmap form state
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [roadmaps, setRoadmaps] = useState([
    { id: 1, title: "Frontend Developer", description: "Learn React, CSS, HTML" },
    { id: 2, title: "Backend Developer", description: "Learn Node.js, Databases" },
  ]);

  // Announcement form state
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  // Helpers
  const formatDate = (iso) => new Date(iso).toLocaleString();

  // Handlers
  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }
    // Simulate upload
    setUploadMessage("Uploading...");
    setTimeout(() => {
      setUploadMessage(`File "${uploadFile.name}" uploaded successfully!`);
      setUploadFile(null);
      setShowUploadModal(false);
      setActivities((prev) => [
        {
          id: Date.now(),
          description: `New study material '${uploadFile.name}' uploaded by Admin.`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }, 2000);
  };

  const handleRoadmapSubmit = (e) => {
    e.preventDefault();
    if (!roadmapTitle.trim()) return;
    setRoadmaps((prev) => [
      ...prev,
      { id: Date.now(), title: roadmapTitle, description: roadmapDescription },
    ]);
    setRoadmapTitle("");
    setRoadmapDescription("");
    setShowRoadmapModal(false);
    setActivities((prev) => [
      {
        id: Date.now(),
        description: `New roadmap '${roadmapTitle}' created.`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) return;
    setAnnouncementTitle("");
    setAnnouncementContent("");
    setShowAnnouncementModal(false);
    setActivities((prev) => [
      {
        id: Date.now(),
        description: `Announcement '${announcementTitle}' posted.`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="page dashboard-admin">
      <h2>🛠️ Master Control Room</h2>

      {/* Stats */}
      <div className="stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            tabIndex={0}
            aria-label={`${key.replace(/([A-Z])/g, " $1")}: ${value.toLocaleString()}`}
          >
            <h3>{value.toLocaleString()}</h3>
            <p>{key.replace(/([A-Z])/g, " $1")}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="quick-actions" aria-label="Quick actions">
        <button
          className="action-btn"
          onClick={() => setShowUploadModal(true)}
          aria-haspopup="dialog"
          aria-controls="upload-modal"
        >
          <FaUpload /> Upload Materials
        </button>
        <button
          className="action-btn"
          onClick={() => setShowRoadmapModal(true)}
          aria-haspopup="dialog"
          aria-controls="roadmap-modal"
        >
          <FaBullhorn /> Manage Roadmaps
        </button>
        <button
          className="action-btn"
          onClick={() => setShowAnnouncementModal(true)}
          aria-haspopup="dialog"
          aria-controls="announcement-modal"
        >
          <FaBullhorn /> Post Announcements
        </button>
      </section>

      {/* Activity Feed */}
      <section className="activity-feed" aria-label="Recent activity feed">
        <h3>Recent Activity</h3>
        <ul>
          {activities.map(({ id, description, timestamp }) => (
            <li key={id} tabIndex={0}>
              <p>{description}</p>
              <time dateTime={timestamp}>{formatDate(timestamp)}</time>
            </li>
          ))}
        </ul>
      </section>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
            aria-modal="true"
            role="dialog"
            aria-labelledby="upload-modal-title"
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="upload-modal-title">Upload Study Material</h3>
              <form onSubmit={handleUploadSubmit}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  aria-label="Select file to upload"
                  required
                />
                {uploadFile && <p>Selected file: {uploadFile.name}</p>}
                {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
                <button type="submit" disabled={uploadMessage === "Uploading..."}>
                  {uploadMessage === "Uploading..." ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowUploadModal(false)}
                  aria-label="Close upload modal"
                >
                  Close
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {showRoadmapModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRoadmapModal(false)}
            aria-modal="true"
            role="dialog"
            aria-labelledby="roadmap-modal-title"
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="roadmap-modal-title">Create New Roadmap</h3>
              <form onSubmit={handleRoadmapSubmit}>
                <label>
                  Title
                  <input
                    type="text"
                    value={roadmapTitle}
                    onChange={(e) => setRoadmapTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={roadmapDescription}
                    onChange={(e) => setRoadmapDescription(e.target.value)}
                    rows={4}
                  />
                </label>
                <button type="submit">Create Roadmap</button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowRoadmapModal(false)}
                  aria-label="Close roadmap modal"
                >
                  Close
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement Modal */}
      <AnimatePresence>
        {showAnnouncementModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnnouncementModal(false)}
            aria-modal="true"
            role="dialog"
            aria-labelledby="announcement-modal-title"
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="announcement-modal-title">Post Announcement</h3>
              <form onSubmit={handleAnnouncementSubmit}>
                <label>
                  Title
                  <input
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Content
                  <textarea
                    value={announcementContent}
                    onChange={(e) => setAnnouncementContent(e.target.value)}
                    rows={5}
                    required
                  />
                </label>
                <button type="submit">Post Announcement</button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowAnnouncementModal(false)}
                  aria-label="Close announcement modal"
                >
                  Close
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardAdmin;