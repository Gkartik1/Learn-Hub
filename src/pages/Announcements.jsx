// src/pages/Announcements.jsx

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBullhorn, FaTrash, FaSearch, FaThumbtack, FaExclamationTriangle, FaBold, FaItalic, FaListUl } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/Announcements.css";

// --- Expanded Data Structure ---
const initialAnnouncements = [
  { id: 1, title: "Platform Maintenance", date: "2025-07-20T10:00:00Z", content: "LearnHub will undergo scheduled maintenance on July 20th from 1 AM to 4 AM UTC. During this time, the platform may be unavailable.", tags: ["Maintenance", "Platform"], isPinned: true, isImportant: true, reactions: { '👍': 12, '🎉': 2, '💡': 5 } },
  { id: 2, title: "New Roadmaps Added!", date: "2025-07-10T18:00:00Z", content: "We have added new roadmaps for <b>AI/ML</b> and <b>Cybersecurity</b> tracks. Check them out in the Roadmaps section!", tags: ["New Features", "Roadmaps"], isPinned: false, isImportant: false, reactions: { '👍': 56, '🎉': 25, '💡': 12 } },
  { id: 3, title: "Community Meetup: July Edition", date: "2025-07-05T12:00:00Z", content: "Join our monthly virtual meetup on July 25th. Network with mentors and peers, and get your questions answered live.", tags: ["Community", "Event"], isPinned: false, isImportant: false, reactions: { '👍': 34, '🎉': 41, '💡': 8 } },
  { id: 4, title: "Beta Testers for Mobile App", date: "2025-06-28T09:00:00Z", content: "We are looking for beta testers for our upcoming mobile app. Interested students can sign up from their profile page.", tags: ["Mobile", "Beta"], isPinned: false, isImportant: false, reactions: { '👍': 78, '🎉': 15, '💡': 33 } },
];

const ANNOUNCEMENTS_PER_PAGE = 3;

// --- Main Announcements Component ---
const Announcements = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [announcements, setAnnouncements] = useState(() => JSON.parse(localStorage.getItem("learnhub-announcements")) || initialAnnouncements);
  const [userReactions, setUserReactions] = useState(() => JSON.parse(localStorage.getItem("learnhub-userReactions")) || {});
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(ANNOUNCEMENTS_PER_PAGE);

  // --- State Persistence ---
  useEffect(() => {
    localStorage.setItem("learnhub-announcements", JSON.stringify(announcements));
    localStorage.setItem("learnhub-userReactions", JSON.stringify(userReactions));
  }, [announcements, userReactions]);

  const sortedAnnouncements = useMemo(() => {
    return announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [announcements]);

  const filteredAnnouncements = useMemo(() => {
    const pinned = sortedAnnouncements.filter(a => a.isPinned);
    const regular = sortedAnnouncements.filter(a => !a.isPinned);
    
    if (!searchTerm.trim()) return { pinned, regular };

    const searchLower = searchTerm.toLowerCase();
    const filterFn = a =>
        a.title.toLowerCase().includes(searchLower) ||
        a.content.toLowerCase().includes(searchLower) ||
        a.tags.some(tag => tag.toLowerCase().includes(searchLower));

    return { pinned: pinned.filter(filterFn), regular: regular.filter(filterFn) };
  }, [searchTerm, sortedAnnouncements]);

  const handleReaction = (announcementId, emoji) => {
    const userReactionKey = `${announcementId}-${emoji}`;
    const hasReacted = userReactions[userReactionKey];

    setAnnouncements(announcements.map(a => {
      if (a.id === announcementId) {
        const currentCount = a.reactions[emoji] || 0;
        return { ...a, reactions: { ...a.reactions, [emoji]: currentCount + (hasReacted ? -1 : 1) } };
      }
      return a;
    }));
    setUserReactions({ ...userReactions, [userReactionKey]: !hasReacted });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };
  
  const handlePinToggle = (id) => {
      setAnnouncements(announcements.map(a => a.id === id ? {...a, isPinned: !a.isPinned} : a));
  };


  return (
    <div className="page announcements-page">
      <header className="announcements-header">
        <h1><FaBullhorn /> Latest Announcements</h1>
        <p>Stay updated with the latest news, events, and platform updates from the LearnHub team.</p>
      </header>
      
      <div className="search-bar">
        <FaSearch aria-hidden="true" />
        <input type="search" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {isAdmin && <AdminForm setAnnouncements={setAnnouncements} />}
      
      {/* Pinned Announcements Section */}
      {filteredAnnouncements.pinned.length > 0 && (
          <div className="pinned-section">
            <h2>Pinned Announcements</h2>
            <div className="announcement-grid">
                {filteredAnnouncements.pinned.map(announcement => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} {...{isAdmin, userReactions, handleReaction, handleDelete, handlePinToggle}} />
                ))}
            </div>
          </div>
      )}

      {/* Main Announcement Feed */}
      <div className="announcement-feed">
        <h2>Recent Updates</h2>
        <AnimatePresence>
            {filteredAnnouncements.regular.slice(0, visibleCount).map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} {...{isAdmin, userReactions, handleReaction, handleDelete, handlePinToggle}} />
            ))}
        </AnimatePresence>
        
        {visibleCount < filteredAnnouncements.regular.length && (
            <button className="load-more-btn" onClick={() => setVisibleCount(c => c + ANNOUNCEMENTS_PER_PAGE)}>
                Load More
            </button>
        )}
        
        {filteredAnnouncements.pinned.length === 0 && filteredAnnouncements.regular.length === 0 && (
            <p className="no-results">No announcements found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

// --- Helper Components ---

const AdminForm = ({ setAnnouncements }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isImportant, setIsImportant] = useState(false);
    const contentRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");

    const execCmd = (command) => {
        document.execCommand(command, false, null);
        contentRef.current.focus();
    };
    
    const handleAdd = (e) => {
        e.preventDefault();
        const contentText = contentRef.current?.innerHTML || "";
        if (!title.trim() || !contentText.trim() || contentText === "<br>") return setErrorMsg("Title and content are required.");
        
        const newAnnouncement = {
            id: Date.now(), title: title.trim(), date: new Date().toISOString(), content: contentText,
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            isPinned: false, isImportant, reactions: {},
        };
        setAnnouncements(prev => [newAnnouncement, ...prev]);
        setTitle(""); setContent(""); setTags(""); setIsImportant(false); setErrorMsg("");
        if (contentRef.current) contentRef.current.innerHTML = "";
    };

    return (
        <motion.form className="add-announcement-form" onSubmit={handleAdd}>
            <h3>Add New Announcement</h3>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            <input type="text" placeholder="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="wysiwyg-toolbar">
                <button type="button" onClick={() => execCmd('bold')}><FaBold /></button>
                <button type="button" onClick={() => execCmd('italic')}><FaItalic /></button>
                <button type="button" onClick={() => execCmd('insertUnorderedList')}><FaListUl /></button>
            </div>
            <div className="contenteditable" contentEditable role="textbox" ref={contentRef} onInput={(e) => setContent(e.currentTarget.innerHTML)} />
            <div className="form-footer">
                <input type="text" placeholder="Tags (comma, separated)" value={tags} onChange={e => setTags(e.target.value)} className="tags-input"/>
                <label><input type="checkbox" checked={isImportant} onChange={e => setIsImportant(e.target.checked)} /> Mark as Important</label>
                <button type="submit" className="submit-btn">Post Announcement</button>
            </div>
        </motion.form>
    );
};

const AnnouncementCard = ({ announcement, isAdmin, userReactions, handleReaction, handleDelete, handlePinToggle }) => (
    <motion.div
      className={`announcement-card ${announcement.isImportant ? 'important' : ''} ${announcement.isPinned ? 'pinned' : ''}`}
      layout initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
    >
      {announcement.isImportant && <div className="important-banner"><FaExclamationTriangle/> Important</div>}
      <div className="announcement-header">
        <h3>{announcement.title}</h3>
        <div className="header-meta">
            <small>{new Date(announcement.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</small>
            {isAdmin && (
              <>
                <button onClick={() => handlePinToggle(announcement.id)} className="action-btn pin-btn" aria-label="Pin"><FaThumbtack /></button>
                <button onClick={() => handleDelete(announcement.id)} className="action-btn delete-btn" aria-label="Delete"><FaTrash /></button>
              </>
            )}
        </div>
      </div>
      <div className="announcement-content" dangerouslySetInnerHTML={{ __html: announcement.content }} />
      <div className="announcement-footer">
        <div className="tags">
            {announcement.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="reactions">
          {['👍', '🎉', '💡'].map(emoji => (
            <button
              key={emoji}
              className={`reaction-btn ${userReactions[`${announcement.id}-${emoji}`] ? 'active' : ''}`}
              onClick={() => handleReaction(announcement.id, emoji)}
            >
              <span className="emoji">{emoji}</span>
              <span className="count">{announcement.reactions[emoji] || 0}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
);


export default Announcements;