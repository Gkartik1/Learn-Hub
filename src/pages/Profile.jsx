// src/pages/Profile.jsx

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiActivity, FiBookOpen, FiSettings, FiCamera, FiEdit2, FiSave, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import "../styles/Profile.css";

// --- MOCK DATA ---
const initialData = {
  name: "Riya Singh",
  email: "riya.singh@example.com",
  bio: "Passionate full-stack developer in training, with a love for React and building beautiful, user-friendly applications. Currently diving deep into DSA.",
  interests: "React, Node.js, Algorithms, UI/UX Design",
  avatar: "https://i.pravatar.cc/150?u=a1",
  banner: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&h=400&fit=crop",
  socials: { github: "riyasingh", linkedin: "riya-singh-dev", twitter: "riyacodes" },
  stats: { xp: 12500, streak: 42, roadmaps: 2 },
  activity: [
    { id: 1, text: "Completed 'React Basics' module", date: "2 days ago" },
    { id: 2, text: "Commented on blog post 'DSA Tips'", date: "3 days ago" },
    { id: 3, text: "Upvoted resource 'MDN Web Docs'", date: "5 days ago" },
  ],
  bookmarks: [{ id: 1, title: "Advanced JavaScript Concepts" }, { id: 2, title: "The System Design Primer" }],
  notifications: { email: { weeklySummary: true, newComment: true }, push: { dailyReminder: false } },
};

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
  const [userData, setUserData] = useState(() => {
    // FIX: Added a try-catch block to prevent crashes from corrupted localStorage data.
    try {
      const saved = localStorage.getItem('userProfileData');
      // If saved data exists, parse it. Otherwise, use initialData.
      return saved ? JSON.parse(saved) : initialData;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      // If parsing fails, fall back to the initial data.
      return initialData;
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    localStorage.setItem('userProfileData', JSON.stringify(userData));
  }, [userData]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser/> },
    { id: 'activity', label: 'Activity', icon: <FiActivity/> },
    { id: 'learning', label: 'My Learning', icon: <FiBookOpen/> },
    { id: 'settings', label: 'Account Settings', icon: <FiSettings/> },
  ];

  return (
    <div className="page profile-page-v2">
      <ProfileHeader user={userData} setUserData={setUserData} />
      <div className="profile-content-container">
        <nav className="profile-tabs">
          {tabs.map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {tab.label}
              {activeTab === tab.id && <motion.div className="active-tab-indicator" layoutId="activeTabIndicator" />}
            </button>
          ))}
        </nav>
        <main className="tab-content">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {activeTab === 'profile' && <ProfileTab user={userData} setUserData={setUserData} />}
              {activeTab === 'activity' && <ActivityTab activity={userData?.activity || []} />}
              {activeTab === 'learning' && <LearningTab bookmarks={userData?.bookmarks || []} />}
              {activeTab === 'settings' && <SettingsTab user={userData} setUserData={setUserData} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// --- HELPER & TAB COMPONENTS ---

const ProfileHeader = ({ user, setUserData }) => {
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserData(prev => ({ ...prev, [type]: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <header className="profile-header">
      <div className="profile-banner">
        {/* FIX: Use optional chaining and fallback for banner image */}
        <img src={user?.banner || 'https://images.unsplash.com/photo-1550063873-ab792950096b?w=1200&h=400&fit=crop'} alt="Profile banner" />
        <button className="edit-banner-btn" onClick={() => bannerRef.current.click()}><FiCamera /> Change Cover</button>
        <input type="file" ref={bannerRef} accept="image/*" style={{display: 'none'}} onChange={(e) => handleFileChange(e, 'banner')} />
      </div>
      <div className="profile-details">
        <div className="profile-avatar-wrapper">
          {/* FIX: Use optional chaining and fallback for avatar image */}
          <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="User avatar" className="profile-avatar" />
          <button className="edit-avatar-btn" onClick={() => avatarRef.current.click()}><FiCamera /></button>
          <input type="file" ref={avatarRef} accept="image/*" style={{display: 'none'}} onChange={(e) => handleFileChange(e, 'avatar')} />
        </div>
        <div className="profile-info">
          <h2>{user?.name || 'User Name'}</h2>
          <p>{user?.email || 'user@example.com'}</p>
          <div className="profile-socials">
            {/* FIX: Safely access social links */}
            <a href={`https://github.com/${user?.socials?.github || ''}`} target="_blank" rel="noopener noreferrer"><FiGithub /></a>
            <a href={`https://linkedin.com/in/${user?.socials?.linkedin || ''}`} target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
            <a href={`https://twitter.com/${user?.socials?.twitter || ''}`} target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
          </div>
        </div>
        <div className="profile-stats">
          {/* FIX: Safely access stats with fallback values */}
          <div><span>{(user?.stats?.xp || 0).toLocaleString()}</span> XP Earned</div>
          <div><span>{user?.stats?.streak || 0}</span> Day Streak</div>
          <div><span>{user?.stats?.roadmaps || 0}</span> Roadmaps Active</div>
        </div>
      </div>
    </header>
  );
};

const EditableField = ({ label, value, onSave, type = 'text', rows = 4 }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const handleSave = () => {
        onSave(currentValue);
        setIsEditing(false);
    }
    
    if (isEditing) {
        return (<div className="form-group editing"><label>{label}</label>{type === 'textarea' ? <textarea value={currentValue} onChange={e => setCurrentValue(e.target.value)} rows={rows} autoFocus /> : <input type={type} value={currentValue} onChange={e => setCurrentValue(e.target.value)} autoFocus />}<div className="edit-actions"><button className="save-btn" onClick={handleSave}><FiSave/> Save</button><button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button></div></div>)
    }
    return (<div className="form-group"><label>{label}</label><p>{value}</p><button className="edit-btn" onClick={() => setIsEditing(true)}><FiEdit2 /></button></div>)
}

const ProfileTab = ({ user, setUserData }) => (
    <div className="profile-tab">
        <h3>Public Profile</h3>
        <p className="tab-description">This information will be displayed on your public profile.</p>
        {/* FIX: Use optional chaining and provide updater functions to handle state safely */}
        <EditableField label="Your Bio" value={user?.bio || ''} onSave={(newValue) => setUserData(p => ({...p, bio: newValue}))} type="textarea" />
        <EditableField label="Interests" value={user?.interests || ''} onSave={(newValue) => setUserData(p => ({...p, interests: newValue}))} />
        <EditableField label="GitHub Username" value={user?.socials?.github || ''} onSave={(newValue) => setUserData(p => ({...p, socials: {...p.socials, github: newValue}}))} />
        <EditableField label="LinkedIn Profile" value={user?.socials?.linkedin || ''} onSave={(newValue) => setUserData(p => ({...p, socials: {...p.socials, linkedin: newValue}}))} />
        <EditableField label="Twitter Handle" value={user?.socials?.twitter || ''} onSave={(newValue) => setUserData(p => ({...p, socials: {...p.socials, twitter: newValue}}))} />
    </div>
);

const ActivityTab = ({ activity }) => (<div className="activity-tab"><h3>Recent Activity</h3><ul className="activity-list">{activity.map(item => <li key={item.id}><span>{item.text}</span><span className="activity-date">{item.date}</span></li>)}</ul></div>);
const LearningTab = ({ bookmarks }) => (<div className="learning-tab"><h3>My Learning</h3><div className="widget"><h4>Bookmarked Resources</h4><ul className="learning-list">{bookmarks.map(bm => <li key={bm.id}>{bm.title}</li>)}</ul></div><div className="widget"><h4>Active Roadmaps</h4><ul className="learning-list"><li>Frontend Mastery 2025 - 75%</li><li>Backend Engineering - 20%</li></ul></div></div>);

const SettingsTab = ({ user, setUserData }) => {
    const handleNotificationChange = (category, key) => {
        setUserData(prev => ({...prev, notifications: {...prev.notifications, [category]: {...prev.notifications?.[category], [key]: !prev.notifications?.[category]?.[key] }}}));
    };
    return (
        <div className="settings-tab"><h3>Notification Settings</h3><div className="widget"><h4>Email Notifications</h4>
            <div className="setting-item"><label htmlFor="weeklySummary">Weekly Progress Summary</label><label className="switch"><input id="weeklySummary" type="checkbox" checked={user?.notifications?.email?.weeklySummary || false} onChange={() => handleNotificationChange('email', 'weeklySummary')} /><span className="slider round"></span></label></div>
            <div className="setting-item"><label htmlFor="newComment">New comment on your post</label><label className="switch"><input id="newComment" type="checkbox" checked={user?.notifications?.email?.newComment || false} onChange={() => handleNotificationChange('email', 'newComment')} /><span className="slider round"></span></label></div>
        </div><div className="danger-zone"><h4>Danger Zone</h4><p>These actions are permanent and cannot be undone.</p><button className="delete-btn">Delete My Account</button></div></div>
    );
};

export default Profile;