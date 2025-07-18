// src/pages/Community.jsx

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiMessageSquare, FiSearch, FiChevronDown, FiPlus } from "react-icons/fi";
import "../styles/Community.css";

// --- MOCK DATA FOR A STRUCTURED FORUM ---
const initialData = {
  members: [
    { id: 1, name: "Riya Singh", role: "Student", avatar: "https://i.pravatar.cc/150?u=a1", contributions: 28 },
    { id: 2, name: "Mohit Sharma", role: "Mentor", avatar: "https://i.pravatar.cc/150?u=a2", contributions: 45 },
    { id: 3, name: "Anjali Patel", role: "Student", avatar: "https://i.pravatar.cc/150?u=a3", contributions: 15 },
    { id: 4, name: "Suman Das", role: "Mentor", avatar: "https://i.pravatar.cc/150?u=a4", contributions: 32 },
  ],
  threads: [
    { id: 1, category: 'career-advice', authorId: 2, title: "How to Build a Resume That Stands Out to Recruiters?", excerpt: "Let's discuss key strategies for crafting a resume that not only passes ATS scans but also catches the eye of hiring managers. What are your top tips?", replies: 15, views: 256, lastUpdated: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, category: 'dsa-prep', authorId: 4, title: "Best Approach for Dynamic Programming Problems?", excerpt: "I've been struggling with DP problems. What's a good framework for thinking about them? Tabulation vs. Memoization, when to use which?", replies: 22, views: 312, lastUpdated: new Date(Date.now() - 172800000).toISOString() },
    { id: 3, category: 'frontend', authorId: 1, title: "Is learning a CSS framework like Tailwind necessary?", excerpt: "I'm comfortable with vanilla CSS, but I see Tailwind everywhere. Is it worth the time to learn it for job prospects? What are the pros and cons?", replies: 8, views: 150, lastUpdated: new Date(Date.now() - 259200000).toISOString() },
  ],
};

const categories = ["All", "General", "Frontend", "Backend", "DSA Prep", "Career Advice"];
const sortOptions = ["Latest", "Trending", "Most Replies"];

// --- MAIN COMMUNITY COMPONENT ---
const Community = () => {
  const { user } = useAuth();
  const mockUser = { id: 99, name: user?.name || "New User", avatar: 'https://i.pravatar.cc/150?u=a99' };
  
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('community-data-corp')) || initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    localStorage.setItem('community-data-corp', JSON.stringify(data));
  }, [data]);

  const topContributors = useMemo(() => {
      return [...data.members].sort((a,b) => b.contributions - a.contributions).slice(0, 3);
  }, [data.members]);

  const filteredAndSortedThreads = useMemo(() => {
    let threads = [...data.threads];
    // Filter
    if (category !== "All") {
      threads = threads.filter(t => t.category.toLowerCase().replace(' ', '-') === category.toLowerCase().replace(' ', '-'));
    }
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      threads = threads.filter(t => t.title.toLowerCase().includes(searchLower) || t.excerpt.toLowerCase().includes(searchLower));
    }
    // Sort
    if (sortBy === "Most Replies") {
      threads.sort((a, b) => b.replies - a.replies);
    } else if (sortBy === "Trending") {
      threads.sort((a, b) => b.views - a.views);
    } else { // Latest
      threads.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    }
    return threads;
  }, [data.threads, category, searchTerm, sortBy]);

  const handleAddThread = (title, content, category) => {
    const newThread = {
        id: Date.now(),
        category,
        authorId: mockUser.id,
        title,
        excerpt: content.substring(0, 150) + "...",
        replies: 0,
        views: 0,
        lastUpdated: new Date().toISOString()
    };
    setData(prev => ({...prev, threads: [newThread, ...prev.threads]}));
  };

  return (
    <div className="page community-page-corp">
      <header className="community-header">
        <h1>Community Hub</h1>
        <p>Connect, discuss, and collaborate with fellow learners and mentors.</p>
      </header>

      <div className="community-layout-corp">
        {/* --- MAIN CONTENT COLUMN --- */}
        <main className="community-main-content">
          <NewDiscussionForm onAddThread={handleAddThread} />
          <div className="thread-controls">
              <div className="filter-group">
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                      {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
              </div>
              <div className="search-box">
                  <FiSearch/>
                  <input type="search" placeholder="Search discussions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
          </div>
          <motion.div className="threads-list-corp" variants={{ visible: { transition: { staggerChildren: 0.1 }}}} initial="hidden" animate="visible">
            {filteredAndSortedThreads.length > 0 ? (
                filteredAndSortedThreads.map(thread => <ThreadItem key={thread.id} thread={thread} author={data.members.find(m => m.id === thread.authorId)} />)
            ) : (
                <p className="no-results-corp">No discussions found. Be the first to start one!</p>
            )}
          </motion.div>
        </main>

        {/* --- SIDEBAR COLUMN --- */}
        <aside className="community-sidebar-corp">
          <div className="sidebar-widget">
            <h4>Community Stats</h4>
            <div className="stats-list">
              <div><span>{data.members.length}</span> Members</div>
              <div><span>{data.threads.length}</span> Discussions</div>
              <div><span>{data.threads.reduce((acc, t) => acc + t.replies, 0)}</span> Replies</div>
            </div>
          </div>
          <div className="sidebar-widget">
            <h4>Top Contributors</h4>
            <ul className="contributors-list">
              {topContributors.map(member => (
                <li key={member.id}>
                  <img src={member.avatar} alt={member.name} />
                  <div>
                    <strong>{member.name}</strong>
                    <small>{member.contributions} contributions</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- Helper Components ---
const NewDiscussionForm = ({ onAddThread }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !content.trim()) return;
        onAddThread(title, content, category);
        setTitle('');
        setContent('');
    }

    return (
        <div className={`new-discussion-container ${isOpen ? 'open' : ''}`}>
            <button className="discussion-toggle" onClick={() => setIsOpen(!isOpen)}>
                <FiPlus /> Start a New Discussion <FiChevronDown className="chevron" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.form onSubmit={handleSubmit} initial={{opacity:0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height: 0}}>
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <textarea placeholder="What's on your mind? You can use Markdown for formatting." value={content} onChange={e => setContent(e.target.value)} rows={5} required />
                        <div className="form-footer">
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <button type="submit">Post Discussion</button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

const ThreadItem = ({ thread, author }) => (
    <motion.div className="thread-item-corp" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <img src={author?.avatar} alt={author?.name} className="thread-avatar" />
        <div className="thread-content">
            <a href="#" className="thread-title">{thread.title}</a>
            <p className="thread-excerpt">{thread.excerpt}</p>
            <div className="thread-meta">
                <span>{thread.replies} replies</span>
                <span>•</span>
                <span>{thread.views} views</span>
                <span>•</span>
                <span>Last activity {new Date(thread.lastUpdated).toLocaleDateString()}</span>
                <span className="thread-tag">{thread.category}</span>
            </div>
        </div>
    </motion.div>
);

export default Community;