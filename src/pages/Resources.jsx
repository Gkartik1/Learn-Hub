// src/pages/Resources.jsx

import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiLink, FiArrowUp, FiBookmark, FiPlus, FiChevronDown, FiTrash2 } from "react-icons/fi";
import "../styles/Resources.css";

// --- Expanded Data Structure ---
const initialResources = [
  { id: 1, title: "FreeCodeCamp", url: "https://www.freecodecamp.org/", description: "Comprehensive free coding tutorials and projects.", category: "Tutorial", tags: ["JavaScript", "Web", "Beginner"], upvotes: 128 },
  { id: 2, title: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "Official documentation for web technologies.", category: "Documentation", tags: ["HTML", "CSS", "JavaScript"], upvotes: 256 },
  { id: 3, title: "LeetCode", url: "https://leetcode.com/", description: "Practice coding problems for interviews.", category: "Practice", tags: ["DSA", "Algorithms", "Interview"], upvotes: 192 },
  { id: 4, title: "CSS-Tricks", url: "https://css-tricks.com/", description: "A deep dive into everything CSS, from basics to advanced techniques.", category: "Blog", tags: ["CSS", "Frontend", "Design"], upvotes: 95 },
  { id: 5, title: "React Official Docs", url: "https://react.dev/", description: "The official, re-imagined documentation for React.", category: "Documentation", tags: ["React", "JavaScript", "Frontend"], upvotes: 210 },
  { id: 6, title: "Project Euler", url: "https://projecteuler.net/", description: "Challenging mathematical and computer programming problems.", category: "Practice", tags: ["Math", "Algorithms", "Advanced"], upvotes: 78 },
];

const categories = ["All", "Tutorial", "Documentation", "Practice", "Blog"];

// --- Helper Components (defined within the main file) ---

const FilterPills = ({ selected, setSelected }) => (
  <div className="filter-pills">
    {categories.map(cat => (
      <button key={cat} className={`pill ${selected === cat ? 'active' : ''}`} onClick={() => setSelected(cat)}>
        {selected === cat && (
          <motion.div className="active-pill-bg" layoutId="activePill" transition={{ duration: 0.3 }} />
        )}
        <span className="pill-text">{cat}</span>
      </button>
    ))}
  </div>
);

const ResourceCard = ({ resource, onUpvote, onBookmark, onRemove, isBookmarked, isAdmin }) => {
  const domain = new URL(resource.url).hostname;
  return (
    <motion.article
      className="resource-card"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-content">
        <div className="card-header">
          <img src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} alt={`${domain} favicon`} className="favicon" />
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
            <h3>{resource.title}</h3>
          </a>
        </div>
        <p className="description">{resource.description}</p>
        <div className="tags">
          {resource.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      </div>
      <div className="card-actions">
        <button className={`action-btn upvote-btn ${resource.isUpvoted ? 'active' : ''}`} onClick={() => onUpvote(resource.id)}>
          <FiArrowUp /> {resource.upvotes}
        </button>
        <div className="right-actions">
          <button className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`} onClick={() => onBookmark(resource.id)} aria-label="Bookmark">
            <FiBookmark />
          </button>
          {isAdmin && (
             <button className="action-btn remove-btn" onClick={() => onRemove(resource.id)} aria-label="Remove Resource">
                <FiTrash2 />
             </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const AdminForm = ({ setResources }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newResource, setNewResource] = useState({ title: "", url: "", description: "", category: "Tutorial", tags: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e) => setNewResource({ ...newResource, [e.target.name]: e.target.value });

    const handleAddResource = (e) => {
        e.preventDefault();
        if (!newResource.title.trim() || !newResource.url.trim()) return setErrorMsg("Title and URL are required.");
        if (!/^https?:\/\//i.test(newResource.url.trim())) return setErrorMsg("URL must start with http:// or https://");
        
        const tagsArray = newResource.tags.split(",").map(t => t.trim()).filter(Boolean);
        const resource = {
            id: Date.now(),
            ...newResource,
            tags: tagsArray,
            upvotes: 0,
        };
        setResources(prev => [resource, ...prev]);
        setNewResource({ title: "", url: "", description: "", category: "Tutorial", tags: "" });
        setErrorMsg("");
        setIsOpen(false);
    };

    return (
        <div className={`admin-accordion ${isOpen ? 'open' : ''}`}>
            <button className="accordion-toggle" onClick={() => setIsOpen(!isOpen)}>
                <FiPlus /> {isOpen ? 'Close Form' : 'Add New Resource'} <FiChevronDown className="chevron" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.form
                        className="add-resource-form"
                        onSubmit={handleAddResource}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {errorMsg && <p className="error-msg">{errorMsg}</p>}
                        <div className="form-grid">
                            <input type="text" name="title" placeholder="Resource Title" value={newResource.title} onChange={handleInputChange} required />
                            <input type="url" name="url" placeholder="Resource URL (https://...)" value={newResource.url} onChange={handleInputChange} required />
                            <textarea name="description" placeholder="Short Description" value={newResource.description} onChange={handleInputChange} rows={2} />
                            <select name="category" value={newResource.category} onChange={handleInputChange}>
                                {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input type="text" name="tags" placeholder="Tags (comma separated)" value={newResource.tags} onChange={handleInputChange} />
                            <button type="submit">Add Resource</button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Main Resources Page Component ---

const Resources = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const [resources, setResources] = useState(() => JSON.parse(localStorage.getItem("learnhub-resources")) || initialResources);
  const [upvoted, setUpvoted] = useState(() => JSON.parse(localStorage.getItem("learnhub-upvoted")) || {});
  const [bookmarked, setBookmarked] = useState(() => new Set(JSON.parse(localStorage.getItem("learnhub-bookmarked")) || []));
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
      localStorage.setItem("learnhub-resources", JSON.stringify(resources));
      localStorage.setItem("learnhub-upvoted", JSON.stringify(upvoted));
      localStorage.setItem("learnhub-bookmarked", JSON.stringify(Array.from(bookmarked)));
  }, [resources, upvoted, bookmarked]);

  const handleUpvote = (id) => {
    const hasUpvoted = upvoted[id];
    setResources(resources.map(res => res.id === id ? { ...res, upvotes: res.upvotes + (hasUpvoted ? -1 : 1) } : res));
    setUpvoted({...upvoted, [id]: !hasUpvoted });
  };
  
  const handleBookmark = (id) => {
    setBookmarked(prev => {
        const newSet = new Set(prev);
        if(newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        return newSet;
    });
  }

  const handleRemove = (id) => {
    if(window.confirm("Are you sure you want to delete this resource?")) {
        setResources(resources.filter(res => res.id !== id));
    }
  }

  const filteredResources = useMemo(() => {
    return resources
      .map(res => ({...res, isUpvoted: !!upvoted[res.id]}))
      .filter((res) => {
        const matchesCategory = categoryFilter === "All" || res.category === categoryFilter;
        const matchesSearch = searchTerm === "" ||
          res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.upvotes - a.upvotes);
  }, [searchTerm, categoryFilter, resources, upvoted]);


  return (
    <div className="page resources-page">
      <header className="resources-header">
        <h1>Curated Resources</h1>
        <p>Your community-driven library of handpicked tutorials, tools, and websites to boost your learning.</p>
      </header>

      {isAdmin && <AdminForm setResources={setResources} />}

      <div className="filters">
        <input type="search" placeholder="Search resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <FilterPills selected={categoryFilter} setSelected={setCategoryFilter} />
      </div>

      <AnimatePresence>
        {filteredResources.length > 0 ? (
          <motion.div className="resources-grid">
            {filteredResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onUpvote={handleUpvote}
                onBookmark={handleBookmark}
                onRemove={handleRemove}
                isBookmarked={bookmarked.has(res.id)}
                isAdmin={isAdmin}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p className="no-results" initial={{opacity: 0}} animate={{opacity: 1}}>No resources found. Try a different search or filter.</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;