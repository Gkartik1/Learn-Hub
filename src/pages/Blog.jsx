// src/pages/Blog.jsx

import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // useParams is key for this to work
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiMessageCircle, FiBookmark, FiHeart, FiArrowLeft } from "react-icons/fi";
import "../styles/Blog.css";

// --- MOCK DATA ---
const initialBlogs = [
  { id: 1, title: "Breaking into Web Development in 2025", author: "Suman Das", authorAvatar: "https://i.pravatar.cc/150?u=a4", date: "2025-07-15T10:00:00Z", tags: ["Web Dev", "Beginner", "Career"], readingTime: 7, excerpt: "Discover the essential steps, tools, and learning paths to kickstart your career in web development today. From HTML to modern frameworks, we cover it all.", content: "<p>Discover the essential steps, tools, and learning paths to kickstart your career in web development today. From HTML to modern frameworks, we cover it all.</p><p>The journey starts with a solid foundation in <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. These are the three core pillars of the web. Don't rush this stage!</p><h3>Key Takeaways:</h3><ul><li>Master the fundamentals before jumping to frameworks.</li><li>Build real projects to solidify your knowledge.</li><li>Join a community like LearnHub to stay motivated.</li></ul>", coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", claps: 128, comments: [{ id: 1, user: "Riya", text: "Great post! Very helpful." }] },
  { id: 2, title: "DSA Tips from a Final Year Student", author: "Mansi Gupta", authorAvatar: "https://i.pravatar.cc/150?u=a5", date: "2025-07-10T12:30:00Z", tags: ["DSA", "Interviews"], readingTime: 5, excerpt: "Mastering Data Structures and Algorithms is key for top tech interviews. Here are 5 practical strategies that helped me succeed.", content: "<p>Mastering Data Structures and Algorithms is key for top tech interviews. Here are 5 practical strategies that helped me succeed.</p><p>Focus on consistency over intensity. Solving 2-3 problems every single day is more effective than cramming 20 problems on a weekend.</p>", coverImage: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", claps: 256, comments: [] },
  { id: 3, title: "Why You Should Learn Go in 2025", author: "Mohit Sharma", authorAvatar: "https://i.pravatar.cc/150?u=a2", date: "2025-07-08T09:00:00Z", tags: ["Backend", "GoLang"], readingTime: 6, excerpt: "Go is quickly becoming a top choice for backend development due to its performance and simplicity. Let's explore why it might be your next favorite language.", content: "<p>Go is quickly becoming a top choice for backend development due to its performance and simplicity. Let's explore why it might be your next favorite language.</p>", coverImage: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", claps: 98, comments: [] },
];

// --- Main Controller Component ---
const Blog = () => {
    const { postId } = useParams(); // This hook detects if there's an ID in the URL

    // If there is a postId, show the single post view.
    // Otherwise, show the main list of all blog posts.
    return postId ? <BlogPostView postId={postId} /> : <BlogListView />;
}


// --- View for the Main Blog Page (List of all posts) ---
const BlogListView = () => {
  const [blogs, setBlogs] = useState(() => JSON.parse(localStorage.getItem("learnhub-blogs")) || initialBlogs);
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeTag === "All") return blogs.sort((a,b) => new Date(b.date) - new Date(a.date));
    return blogs.filter(blog => blog.tags.includes(activeTag)).sort((a,b) => new Date(b.date) - new Date(a.date));
  }, [blogs, activeTag]);

  const featuredBlog = filteredBlogs[0];
  const regularBlogs = filteredBlogs.slice(1);

  return (
    <div className="page blog-page-v2">
      <header className="blog-header">
        <h1>The LearnHub Blog</h1>
        <p>Stories, tutorials, and career advice from our thriving community of learners and mentors.</p>
      </header>

      <div className="filter-tags">
        {allTags.map(tag => (
          <button key={tag} className={`tag-pill ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <div className="blog-layout">
        <AnimatePresence>
          {featuredBlog && (
            <motion.div layout="position" transition={{ duration: 0.5 }}>
              <ArticleCard article={featuredBlog} isFeatured={true} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div className="blog-grid" layout>
          {regularBlogs.map(blog => (
            <ArticleCard key={blog.id} article={blog} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- View for a Single Blog Post ---
const BlogPostView = ({ postId }) => {
  const [allBlogs, setAllBlogs] = useState(() => JSON.parse(localStorage.getItem("learnhub-blogs")) || initialBlogs);
  const [userInteractions, setUserInteractions] = useState(() => JSON.parse(localStorage.getItem("learnhub-blog-interactions")) || { claps: {}, bookmarks: {} });

  const post = useMemo(() => {
      const p = allBlogs.find(b => b.id === parseInt(postId));
      if (!p) return null;
      return {...p, hasClapped: !!userInteractions.claps[p.id], isBookmarked: !!userInteractions.bookmarks[p.id]}
  }, [postId, allBlogs, userInteractions]);

  useEffect(() => {
    localStorage.setItem("learnhub-blogs", JSON.stringify(allBlogs));
    localStorage.setItem("learnhub-blog-interactions", JSON.stringify(userInteractions));
  }, [allBlogs, userInteractions]);

  const handleInteraction = (blogId, type) => {
    setUserInteractions(prev => {
      const newInteractions = { ...prev };
      const hasInteracted = newInteractions[type][blogId];
      if (type === 'claps') {
        setAllBlogs(allBlogs.map(b => b.id === blogId ? { ...b, claps: hasInteracted ? b.claps - 1 : b.claps + 1 } : b));
      }
      newInteractions[type] = { ...newInteractions[type], [blogId]: !hasInteracted };
      return newInteractions;
    });
  };

  const handleAddComment = (blogId, text) => {
    const newComment = { id: Date.now(), user: 'You', text };
    setAllBlogs(allBlogs.map(blog => blog.id === blogId ? { ...blog, comments: [...blog.comments, newComment] } : blog));
  };

  if (!post) {
    return (
      <div className="page blog-post-page">
        <div className="post-not-found">
          <h2>Post not found</h2>
          <Link to="/blog" className="back-link">Back to all posts</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="page blog-post-page" initial={{opacity:0}} animate={{opacity:1}}>
      <div className="post-container">
        <Link to="/blog" className="back-link"><FiArrowLeft /> Back to all posts</Link>
        <div className="tags">
            {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <img src={post.authorAvatar} alt={post.author} className="author-avatar" />
          <div><strong>{post.author}</strong><span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readingTime} min read</span></div>
        </div>
        <div className="post-actions">
            <button className={`action-btn clap-btn ${post.hasClapped ? 'active' : ''}`} onClick={() => handleInteraction(post.id, 'claps')}><FiHeart /> {post.claps}</button>
            <button className={`action-btn bookmark-btn ${post.isBookmarked ? 'active' : ''}`} onClick={() => handleInteraction(post.id, 'bookmarks')}><FiBookmark /></button>
        </div>
        <img src={post.coverImage} alt={post.title} className="post-cover-image" />
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        <CommentSection comments={post.comments} onAddComment={(text) => handleAddComment(post.id, text)} />
      </div>
    </motion.div>
  );
};


// --- Reusable Helper Components ---

const ArticleCard = ({ article, isFeatured = false }) => (
    <motion.div className={`article-card ${isFeatured ? 'featured' : ''}`} layout variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      <Link to={`/blog/${article.id}`} className="card-link-wrapper">
        <div className="card-image-container"><img src={article.coverImage} alt={article.title} /></div>
        <div className="card-content">
          <div className="tags">{article.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}</div>
          <h3 className="card-title">{article.title}</h3>
          {isFeatured && <p className="card-excerpt">{article.excerpt}</p>}
          <div className="card-meta">
            <img src={article.authorAvatar} alt={article.author} className="author-avatar" />
            <div><strong>{article.author}</strong><span>{new Date(article.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} · {article.readingTime} min read</span></div>
          </div>
        </div>
      </Link>
      <div className="card-footer">
        <div className="footer-actions">
          <span className="action-btn-static"><FiHeart /> {article.claps}</span>
          <span className="action-btn-static"><FiMessageCircle /> {article.comments?.length || 0}</span>
        </div>
        <span className="action-btn-static"><FiBookmark /></span>
      </div>
    </motion.div>
);

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      <div className="comment-list">
        {comments.length > 0 ? comments.map(comment => (
          <div key={comment.id} className="comment"><strong>{comment.user}</strong><p>{comment.text}</p></div>
        )) : <p>Be the first to share your thoughts.</p>}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default Blog;