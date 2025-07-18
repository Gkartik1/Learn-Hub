// src/pages/Roadmaps.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit2, FiLink, FiChevronDown, FiChevronRight } from "react-icons/fi";
import confetti from "canvas-confetti";
import "../styles/Roadmaps.css";

// --- Initial Data Structure (Expanded with XP and resources) ---
const initialRoadmaps = [
  {
    id: 1, title: "Frontend Mastery 2025", xp: 1500, children: [
      { id: 11, title: "HTML Basics", completed: true, xp: 50, resource: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { id: 12, title: "CSS Fundamentals", completed: false, xp: 100, resource: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      {
        id: 13, title: "JavaScript Deep Dive", completed: false, xp: 500, children: [
          { id: 131, title: "ES6+ Features", completed: false, xp: 200, resource: "https://www.javascript.info/" },
          { id: 132, title: "DOM Manipulation", completed: false, xp: 150 },
          { id: 133, title: "Asynchronous JS (Promises, Async/Await)", completed: false, xp: 150 },
        ],
      },
      { id: 14, title: "React & The Modern Frontend", completed: false, xp: 750, children: [
          { id: 141, title: "React Basics (Components, Props, State)", completed: false, xp: 300 },
          { id: 142, title: "State Management (Context, Redux)", completed: false, xp: 250 },
          { id: 143, title: "Testing with Jest & RTL", completed: false, xp: 200 },
      ] },
    ],
  },
  {
    id: 2, title: "Backend Engineering", xp: 1200, children: [
      { id: 21, title: "Node.js & Express.js", completed: false, xp: 400 },
      { id: 22, title: "Databases (SQL & NoSQL)", completed: false, xp: 400 },
      { id: 23, title: "Authentication & Authorization", completed: false, xp: 200 },
      { id: 24, title: "API Design (REST & GraphQL)", completed: false, xp: 200 },
    ],
  },
];

// --- Main Roadmaps Component ---
const Roadmaps = () => {
  const { user } = useAuth(); // Assuming user object has { role: 'admin' } or 'student'
  const isAdmin = user?.role === "admin";

  const [roadmaps, setRoadmaps] = useState(() => {
    try {
      const saved = localStorage.getItem("learnhub-roadmaps");
      return saved ? JSON.parse(saved) : initialRoadmaps;
    } catch {
      return initialRoadmaps;
    }
  });
  const [expandedNodes, setExpandedNodes] = useState(() => new Set(roadmaps.map(r => r.id)));
  const [searchTerm, setSearchTerm] = useState("");

  // --- State Persistence ---
  useEffect(() => {
    localStorage.setItem("learnhub-roadmaps", JSON.stringify(roadmaps));
  }, [roadmaps]);

  // --- Core Tree Logic ---
  const findNodeAndParents = (id, nodes = roadmaps, parents = []) => {
    for (const node of nodes) {
      if (node.id === id) return { node, parents };
      if (node.children) {
        const found = findNodeAndParents(id, node.children, [...parents, node]);
        if (found) return found;
      }
    }
    return null;
  };

  const updateNode = (id, updates) => {
    const update = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) return { ...node, ...updates };
        if (node.children) return { ...node, children: update(node.children) };
        return node;
      });
    setRoadmaps(update(roadmaps));
  };
  
  const addNode = (parentId, newNode) => {
     const add = (nodes) =>
      nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, children: [...(node.children || []), newNode] };
        }
        if (node.children) return { ...node, children: add(node.children) };
        return node;
      });
     setRoadmaps(add(roadmaps));
     setExpandedNodes(prev => new Set(prev).add(parentId));
  }

  const deleteNode = (idToDelete) => {
    const remove = (nodes) => nodes.filter(node => node.id !== idToDelete).map(node => {
        if(node.children) return {...node, children: remove(node.children)}
        return node;
    });
    setRoadmaps(remove(roadmaps));
  }
  
  const toggleComplete = useCallback((id) => {
    const result = findNodeAndParents(id);
    if (!result) return;
    const { node } = result;
    const newCompleted = !node.completed;

    if(newCompleted) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }});
    }

    const markChildren = (nodes, completed) => nodes.map(n => ({...n, completed, children: n.children ? markChildren(n.children, completed) : []}));
    
    updateNode(id, { completed: newCompleted, children: node.children ? markChildren(node.children, newCompleted) : []});

  }, [roadmaps]);

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // --- Recursive Progress Calculation ---
  const calculateProgress = useMemo(() => {
    const memo = new Map();
    const calc = (node) => {
      if (memo.has(node.id)) return memo.get(node.id);
      if (!node.children || node.children.length === 0) return { completed: node.completed ? node.xp : 0, total: node.xp };

      const childrenProgress = node.children.reduce((acc, child) => {
        const { completed, total } = calc(child);
        return { completed: acc.completed + completed, total: acc.total + total };
      }, { completed: 0, total: 0 });

      memo.set(node.id, childrenProgress);
      return childrenProgress;
    };
    return calc;
  }, [roadmaps]);
  
  const getOverallProgress = (node) => {
      const {completed, total} = calculateProgress(node);
      return total === 0 ? 0 : Math.round((completed / total) * 100);
  }

  // --- User-Facing Stats ---
  const dashboardStats = useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    let totalXp = 0;
    let earnedXp = 0;

    const traverse = (nodes) => {
      for (const node of nodes) {
        if (!node.children || node.children.length === 0) { // Count only leaf nodes as "topics"
            totalTopics++;
            if(node.completed) completedTopics++;
        }
        totalXp += node.xp;
        if (node.completed) earnedXp += node.xp;
        if (node.children) traverse(node.children);
      }
    };
    traverse(roadmaps);
    return { totalTopics, completedTopics, totalXp, earnedXp };
  }, [roadmaps]);

  // --- Search & Filter ---
  const filteredRoadmaps = useMemo(() => {
    if (!searchTerm) return roadmaps;
    const filter = (nodes) => {
      return nodes.reduce((acc, node) => {
        const match = node.title.toLowerCase().includes(searchTerm.toLowerCase());
        const filteredChildren = node.children ? filter(node.children) : [];
        if (match || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
        return acc;
      }, []);
    };
    return filter(roadmaps);
  }, [roadmaps, searchTerm]);


  return (
    <div className="page roadmaps-page">
      <header className="roadmaps-header">
        <h1>Your Learning Roadmaps</h1>
        <p>Follow these paths to master new skills and track your progress.</p>
      </header>
      
      {/* --- Progress Dashboard --- */}
      <motion.div className="progress-dashboard" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="dashboard-stat">
          <span className="stat-value">{dashboardStats.completedTopics} / {dashboardStats.totalTopics}</span>
          <span className="stat-label">Topics Completed</span>
        </div>
        <div className="dashboard-stat">
          <span className="stat-value">{dashboardStats.earnedXp.toLocaleString()} / {dashboardStats.totalXp.toLocaleString()}</span>
          <span className="stat-label">Total XP Earned</span>
        </div>
      </motion.div>

      <div className="roadmaps-controls">
        <input
          type="search"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {isAdmin && <AdminPanel setRoadmaps={setRoadmaps} />}
      </div>

      <AnimatePresence>
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapContainer key={roadmap.id} roadmap={roadmap} getOverallProgress={getOverallProgress}>
            {roadmap.children.map((node) => (
              <RoadmapNode
                key={node.id}
                node={node}
                isExpanded={expandedNodes.has(node.id)}
                toggleExpand={toggleExpand}
                toggleComplete={toggleComplete}
                isAdmin={isAdmin}
                addNode={addNode}
                deleteNode={deleteNode}
                updateNode={updateNode}
                calculateProgress={calculateProgress}
              />
            ))}
          </RoadmapContainer>
        ))}
      </AnimatePresence>
    </div>
  );
};


// --- Sub-components (can be moved to separate files in a larger project) ---

const RoadmapContainer = ({ roadmap, children, getOverallProgress }) => {
    const progress = getOverallProgress(roadmap);
    return (
        <motion.section className="roadmap-container" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="roadmap-main-header">
                <h2>{roadmap.title}</h2>
                <div className="overall-progress">
                    <span>{progress}% Complete</span>
                    <div className="progress-bar-container">
                        <motion.div className="progress-bar" style={{ width: `${progress}%` }}></motion.div>
                    </div>
                </div>
            </header>
            <div className="roadmap-timeline">
                {children}
            </div>
        </motion.section>
    )
}

const RoadmapNode = ({ node, isExpanded, toggleExpand, toggleComplete, isAdmin, addNode, deleteNode, updateNode, calculateProgress }) => {
  const hasChildren = node.children && node.children.length > 0;
  const {completed: completedXp, total: totalXp} = calculateProgress(node);
  const progressPercent = totalXp === 0 ? (node.completed ? 100 : 0) : Math.round((completedXp / totalXp) * 100);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);

  const handleUpdate = () => {
    if(editedTitle.trim()) {
        updateNode(node.id, { title: editedTitle.trim() });
        setIsEditing(false);
    }
  }
  
  return (
    <motion.div className={`roadmap-node-wrapper ${hasChildren ? "has-children" : ""}`} layout="position">
      <div className="node-line"></div>
      <motion.div className={`node-content ${node.completed ? "completed" : ""}`} layout>
        <div className="node-header">
          {hasChildren && (
            <button className="expand-btn" onClick={() => toggleExpand(node.id)}>
              {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          )}
          <input id={`cb-${node.id}`} type="checkbox" checked={node.completed} onChange={() => toggleComplete(node.id)} />
          <label htmlFor={`cb-${node.id}`} className="node-title">
            {isEditing ? (
                 <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={e => setEditedTitle(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                    autoFocus
                    className="title-edit-input"
                 />
            ) : (
                <span>{node.title}</span>
            )}
            
            <span className="node-xp">{node.xp} XP</span>
          </label>
          <div className="node-actions">
            {node.resource && <a href={node.resource} target="_blank" rel="noopener noreferrer" className="action-btn" aria-label="Open resource"><FiLink /></a>}
            {isAdmin && <>
                <button className="action-btn" onClick={() => setIsEditing(!isEditing)} aria-label="Edit topic"><FiEdit2 /></button>
                <button className="action-btn" onClick={() => deleteNode(node.id)} aria-label="Delete topic"><FiTrash2 /></button>
                <button className="action-btn" onClick={() => {
                    const title = prompt("Enter new sub-topic title:");
                    if(title) addNode(node.id, { id: Date.now(), title, completed: false, xp: 50 });
                }} aria-label="Add sub-topic"><FiPlus /></button>
            </>}
          </div>
          <div className="progress-display">{progressPercent}%</div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            className="node-children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {node.children.map((child) => (
              <RoadmapNode key={child.id} node={child} isExpanded={expandedNodes.has(child.id)} {...{toggleExpand, toggleComplete, isAdmin, addNode, deleteNode, updateNode, calculateProgress}} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const AdminPanel = ({ setRoadmaps }) => {
    const [title, setTitle] = useState('');
    const addRoadmap = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        setRoadmaps(prev => [...prev, { id: Date.now(), title, xp: 0, children: []}]);
        setTitle('');
    }
    return (
        <form onSubmit={addRoadmap} className="admin-form">
            <input 
                type="text"
                placeholder="New roadmap title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button type="submit">Add Roadmap</button>
        </form>
    )
}


export default Roadmaps;