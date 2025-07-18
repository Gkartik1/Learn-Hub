import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Materials.css";

const dummyMaterials = [
  {
    id: 1,
    title: "React Basics",
    subject: "Frontend",
    format: "Video",
    description: "Learn React fundamentals with this video series.",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    subject: "Programming",
    format: "PDF",
    description: "Deep dive into JavaScript advanced concepts.",
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    subject: "Frontend",
    format: "Article",
    description: "Master CSS Grid with practical examples.",
  },
  {
    id: 4,
    title: "Node.js Crash Course",
    subject: "Backend",
    format: "Video",
    description: "Get started with Node.js backend development.",
  },
];

const subjects = ["All", "Frontend", "Backend", "Programming"];
const formats = ["All", "Video", "PDF", "Article"];

const Materials = () => {
  const { user } = useAuth();
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // or 'list'
  const [bookmarked, setBookmarked] = useState(new Set());

  const filteredMaterials = useMemo(() => {
    return dummyMaterials.filter((mat) => {
      const subjectMatch = subjectFilter === "All" || mat.subject === subjectFilter;
      const formatMatch = formatFilter === "All" || mat.format === formatFilter;
      const searchMatch =
        mat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.description.toLowerCase().includes(searchTerm.toLowerCase());
      return subjectMatch && formatMatch && searchMatch;
    });
  }, [subjectFilter, formatFilter, searchTerm]);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Admin check
  const isAdminOrMentor = user && (user.role === "admin" || user.role === "mentor");

  return (
    <div className="page materials-page">
      <h2>📚 Study Materials</h2>

      <div className="filters">
        <input
          type="search"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search materials"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          aria-label="Filter by subject"
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
        <select
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
          aria-label="Filter by format"
        >
          {formats.map((fmt) => (
            <option key={fmt} value={fmt}>
              {fmt}
            </option>
          ))}
        </select>
        <div className="view-toggle" role="group" aria-label="Toggle view mode">
          <button
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            title="Grid View"
          >
            🔲
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            title="List View"
          >
            📋
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="materials-grid">
          {filteredMaterials.map((mat) => (
            <div key={mat.id} className="material-card">
              <h3>{mat.title}</h3>
              <p>{mat.description}</p>
              <p>
                <strong>Subject:</strong> {mat.subject} | <strong>Format:</strong>{" "}
                {mat.format}
              </p>
              <div className="material-actions">
                <a href={mat.url} download className="btn download-btn" aria-label={`Download ${mat.title}`}>
                  Download
                </a>
                <button
                  className={`btn bookmark-btn ${
                    bookmarked.has(mat.id) ? "bookmarked" : ""
                  }`}
                  onClick={() => toggleBookmark(mat.id)}
                  aria-pressed={bookmarked.has(mat.id)}
                  aria-label={bookmarked.has(mat.id) ? "Remove bookmark" : "Bookmark"}
                >
                  {bookmarked.has(mat.id) ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="materials-list">
          {filteredMaterials.map((mat) => (
            <li key={mat.id} className="material-list-item">
              <div>
                <h3>{mat.title}</h3>
                <p>{mat.description}</p>
                <p>
                  <strong>Subject:</strong> {mat.subject} | <strong>Format:</strong>{" "}
                  {mat.format}
                </p>
              </div>
              <button
                className={`btn bookmark-btn ${
                  bookmarked.has(mat.id) ? "bookmarked" : ""
                }`}
                onClick={() => toggleBookmark(mat.id)}
                aria-pressed={bookmarked.has(mat.id)}
                aria-label={bookmarked.has(mat.id) ? "Remove bookmark" : "Bookmark"}
              >
                {bookmarked.has(mat.id) ? "★" : "☆"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {isAdminOrMentor && (
        <section className="admin-controls">
          <h3>Admin Controls</h3>
          <button>Upload New Material</button>
          <button>Delete Selected</button>
        </section>
      )}
    </div>
  );
};

export default Materials;