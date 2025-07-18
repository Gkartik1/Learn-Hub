// src/components/Footer.jsx
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 LearnHub. All rights reserved.</p>
      <div className="footer-links">
        <a href="/faq">FAQs</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;