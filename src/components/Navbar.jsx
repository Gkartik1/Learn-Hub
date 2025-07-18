// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { mode, changeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const accountDropdownRef = useRef(null);
  const exploreDropdownRef = useRef(null);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) setAccountDropdownOpen(false);
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target)) setExploreDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setAccountDropdownOpen(false);
    setExploreDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeAllMenus();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query) {
      navigate(`/search?q=${query}`);
      setSearchOpen(false);
    }
  };

  const exploreLinks = [
    { to: "/Announcements", emoji: "📢", title: "Announcements", description: "Latest news and updates" },
    { to: "/Blog", emoji: "✍️", title: "Blog", description: "Articles and tutorials" },
    { to: "/Community", emoji: "💬", title: "Community", description: "Join the discussion" },
    { to: "/Resources", emoji: "📚", title: "Resources", description: "Helpful tools and links" },
    { to: "/materials", emoji: "📦", title: "Materials", description: "Browse course content" },
    { to: "/roadmaps", emoji: "🗺️", title: "Roadmaps", description: "Your learning path" },
  ];

  const mainNavLinks = [
    { to: "/dashboard", text: "Dashboard", roles: ["student"] },
    { to: "/admin", text: "Admin Panel", roles: ["admin"] },
    { to: "/payment", text: "Payment", roles: ["student", "admin"] },
  ];

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <nav className="navbar-container">
        <div className="nav-section nav-section-left">
          <Link to="/" className="logo" onClick={closeAllMenus}>LearnHub</Link>
        </div>

        <div className={`nav-section nav-section-center ${searchOpen ? "search-active" : ""}`}>
            <div className={`nav-links ${menuOpen ? "expanded" : ""}`}>
              <ul className="nav-links-list">
                <li className="nav-item-dropdown" ref={exploreDropdownRef}>
                  <button className="nav-link-button" onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)} aria-haspopup="true" aria-expanded={exploreDropdownOpen}>
                    <span className="button-content-wrapper">{t("Explore")} <span className="chevron-down">▼</span></span>
                  </button>
                  {exploreDropdownOpen && (
                    <div className="explore-menu">
                      {exploreLinks.map((link, index) => (
                        <NavLink key={link.to} to={link.to} className="explore-menu-item" onClick={closeAllMenus} style={{ animationDelay: `${index * 40}ms` }}>
                          <span className="explore-emoji">{link.emoji}</span>
                          <div className="explore-menu-item-text"><h4>{t(link.title)}</h4><p>{t(link.description)}</p></div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>

                {mainNavLinks.map(link => user && link.roles.includes(user.role) && (
                    <li key={link.to}>
                        <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={closeAllMenus}>
                            {/* THIS IS THE FIX: Added span wrapper */}
                            <span className="link-content-wrapper">{t(link.text)}</span>
                        </NavLink>
                    </li>
                ))}
              </ul>
            </div>
            
            <div className={`search-container ${searchOpen ? "open" : ""}`} ref={searchRef}>
               <form className="search-form" onSubmit={handleSearchSubmit}>
                  <input type="search" name="search" placeholder="Search courses, articles..." aria-label="Search" />
                  <button type="submit">Go</button>
               </form>
            </div>
        </div>
        
        <div className="nav-section nav-section-right">
          <button className="control-btn search-toggle-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle Search">
            {searchOpen ? '✕' : '🔍'}
          </button>

          <label className="theme-switch" htmlFor="theme-toggle" title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <input id="theme-toggle" type="checkbox" checked={mode === 'dark'} onChange={() => changeMode(mode === 'dark' ? 'light' : 'dark')} />
            <div className="slider"></div>
          </label>
          
          {user ? (
            <div className="nav-item-dropdown" ref={accountDropdownRef}>
              <button className="control-btn account-btn" onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} aria-haspopup="true" aria-expanded={accountDropdownOpen}>
                👤 {user.name}
              </button>
              {accountDropdownOpen && (
                <ul className="dropdown-menu">
                  <li style={{animationDelay: '0ms'}}>
                    <NavLink to="/profile" onClick={closeAllMenus}>
                        {/* THIS IS THE FIX: Added span wrapper */}
                        <span className="link-content-wrapper">⚙️ {t("Profile")}</span>
                    </NavLink>
                  </li>
                  <li style={{animationDelay: '40ms'}}>
                    <button onClick={handleLogout}>
                        {/* THIS IS THE FIX: Added span wrapper */}
                        <span className="link-content-wrapper">🚪 {t("Logout")}</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
             <div className="auth-buttons">
                <Link to="/Login" className="btn btn-secondary">{t("Login")}</Link>
                <Link to="/Register" className="btn btn-primary">{t("Register")}</Link>
             </div>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className="hamburger-box"><span className="hamburger-inner"></span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;