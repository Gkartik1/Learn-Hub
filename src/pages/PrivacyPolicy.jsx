import React from 'react';
import '../styles/LegalPage.css'; // We'll create this simple CSS file next

const PrivacyPolicy = () => {
  return (
    <div className="page legal-page">
      <div className="legal-content">
        <h1>Privacy Policy for LearnHub</h1>
        <p><strong>Last updated:</strong> July 19, 2025</p>

        <p>
          Welcome to LearnHub. We are committed to protecting your personal information
          and your right to privacy. If you have any questions or concerns about our
          policy, or our practices with regards to your personal information, please
          contact us at support@learnhub.com.
        </p>

        <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you
          register on the platform, express an interest in obtaining information
          about us or our products and services, when you participate in activities
          on the platform or otherwise when you contact us.
        </p>

        <h2>2. HOW DO WE USE YOUR INFORMATION?</h2>
        <p>
          We use personal information collected via our platform for a variety of
          business purposes described below. We process your personal information for
          these purposes in reliance on our legitimate business interests, in order
          to enter into or perform a contract with you, with your consent, and/or
          for compliance with our legal obligations.
        </p>
        
        {/* --- Add all other sections of your policy here --- */}

      </div>
    </div>
  );
};

export default PrivacyPolicy;