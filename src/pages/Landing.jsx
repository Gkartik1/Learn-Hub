
// // src/pages/Landing.jsx
// import { useTranslation } from "react-i18next";
// import { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
// import "../styles/Landing.css";

// const testimonials = [
//   {
//     id: 1,
//     quote:
//       "LearnHub helped me crack my first internship and polish my GitHub profile. Must use!",
//     author: "Riya Singh",
//   },
//   {
//     id: 2,
//     quote:
//       "The roadmap really cleared my confusion on what to learn when. Super clean!",
//     author: "Mohit Sharma",
//   },
//   {
//     id: 3,
//     quote:
//       "Mentorship sessions were a game changer for me. Highly recommend LearnHub.",
//     author: "Anjali Patel",
//   },
// ];

// const mentors = [
//   { id: 1, name: "Suman Das", expertise: "Frontend Developer" },
//   { id: 2, name: "Mansi Gupta", expertise: "Data Structures & Algorithms" },
//   { id: 3, name: "Rahul Verma", expertise: "Backend Developer" },
// ];

// const faqs = [
//   {
//     question: "Is LearnHub free to use?",
//     answer: "Yes! We offer a free tier with lots of resources and community support.",
//   },
//   {
//     question: "How do I become a mentor?",
//     answer:
//       "Final year students can register as mentors after verification. Admin approval is required.",
//   },
//   {
//     question: "Can I track my progress?",
//     answer:
//       "Absolutely! Our dashboard shows your learning streaks, completed topics, and more.",
//   },
// ];

// const blogs = [
//   {
//     id: 1,
//     title: "Breaking into Web Development",
//     excerpt:
//       "Learn how to start your journey in web development with practical tips and resources.",
//     url: "/blog/1",
//   },
//   {
//     id: 2,
//     title: "DSA Tips from a Final Year Student",
//     excerpt:
//       "Effective strategies to master data structures and algorithms for placements.",
//     url: "/blog/2",
//   },
// ];

// const Landing = () => {
//   const { t } = useTranslation();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [email, setEmail] = useState("");
//   const [newsletterMsg, setNewsletterMsg] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     if (!email.match(/^\S+@\S+\.\S+$/)) {
//       setNewsletterMsg("Please enter a valid email.");
//       return;
//     }
//     setNewsletterMsg("Thank you for subscribing!");
//     setEmail("");
//   };

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//     document.body.classList.toggle("light-theme", darkMode);
//   };

//   return (
//     <div className="landing-container">
//       {/* Sticky CTA Bar */}
//       <div className="sticky-cta">
//         <p>
//           Ready to level up your tech skills?{" "}
//           <a href="/register" tabIndex={0}>
//             Join LearnHub now!
//           </a>
//         </p>
//       </div>

//       {/* Hero Section with Video Background */}
//       <section className="hero-section">
//         <video
//           className="hero-video"
//           autoPlay
//           muted
//           loop
//           playsInline
//           src="/videos/Generated vide 1.mp4"
//           aria-hidden="true"
//         />
//         <div className="hero-content" data-aos="fade-up">
//           <h1>{t("welcome") || "🚀 Your Learning Journey Starts Here"}</h1>
//           <p>
//             LearnHub empowers tech students with curated content, structured roadmaps,
//             real-world mentorship, and a growing developer community.
//           </p>
//           <a href="/register" className="cta-button" tabIndex={0}>
//             {t("joinFree") || "Join Free"}
//           </a>
//           {/* <button
//             className="theme-toggle"
//             onClick={toggleDarkMode}
//             aria-pressed={darkMode}
//             aria-label="Toggle dark/light mode"
//           >
//             {darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
//           </button> */}
//         </div>
//       </section>

//       {/* Live Stats */}
//       <section className="stats-section" data-aos="fade-up">
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>10,000+</h3>
//             <p>Active Students</p>
//           </div>
//           <div className="stat-card">
//             <h3>500+</h3>
//             <p>Mentors & Alumni</p>
//           </div>
//           <div className="stat-card">
//             <h3>1,200+</h3>
//             <p>Study Materials</p>
//           </div>
//           <div className="stat-card">
//             <h3>95%</h3>
//             <p>Placement Success Rate</p>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="features-section" data-aos="fade-up">
//         <h2>Why Choose LearnHub?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon" aria-hidden="true">
//               📚
//             </div>
//             <h3>Curated Roadmaps</h3>
//             <p>
//               Follow step-by-step learning paths designed by industry experts and
//               top students.
//             </p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon" aria-hidden="true">
//               🧠
//             </div>
//             <h3>Mentorship</h3>
//             <p>
//               Connect with final-year mentors and alumni to get personalized guidance.
//             </p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon" aria-hidden="true">
//               💡
//             </div>
//             <h3>Community Support</h3>
//             <p>
//               Join active chatrooms, forums, and study groups to collaborate and grow.
//             </p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon" aria-hidden="true">
//               🎯
//             </div>
//             <h3>Career Prep</h3>
//             <p>
//               Access interview prep, resume reviews, and placement tips from experts.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="how-it-works" data-aos="fade-up">
//         <h2>How It Works</h2>
//         <div className="steps-grid">
//           <div className="step-card">
//             <div className="step-number">1</div>
//             <h3>Create Your Profile</h3>
//             <p>Sign up and tell us your interests and goals.</p>
//           </div>
//           <div className="step-card">
//             <div className="step-number">2</div>
//             <h3>Choose Your Roadmap</h3>
//             <p>Select a learning path tailored to your career goals.</p>
//           </div>
//           <div className="step-card">
//             <div className="step-number">3</div>
//             <h3>Access Resources & Mentorship</h3>
//             <p>Get curated materials and connect with mentors.</p>
//           </div>
//           <div className="step-card">
//             <div className="step-number">4</div>
//             <h3>Track Progress & Achieve</h3>
//             <p>Monitor your learning and prepare for your dream job.</p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="testimonials-section" data-aos="fade-up">
//         <h2>What Our Students Say</h2>
//         <blockquote>
//           “{testimonials[currentTestimonial].quote}”
//           <footer>— {testimonials[currentTestimonial].author}</footer>
//         </blockquote>
//       </section>

//       {/* FAQ */}
//       <section className="faq-section" data-aos="fade-up">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faq-list">
//           {faqs.map(({ question, answer }, idx) => (
//             <details key={idx} className="faq-item">
//               <summary>{question}</summary>
//               <p>{answer}</p>
//             </details>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="newsletter-section" data-aos="fade-up">
//         <h2>Stay Updated</h2>
//         <p>Subscribe to our newsletter for the latest updates and tips.</p>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             alert("Thank you for subscribing!");
//           }}
//           className="newsletter-form"
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             aria-label="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button type="submit">Subscribe</button>
//         </form>
//         {newsletterMsg && <p className="newsletter-msg">{newsletterMsg}</p>}
//       </section>

//       {/* Pricing */}
//       <section className="pricing-section" data-aos="fade-up">
//         <h2>Upgrade to Premium</h2>
//         <p>
//           Unlock exclusive content, priority mentorship, and ad-free experience.
//         </p>
//         <a href="/payment" className="cta-button">
//           See Pricing
//         </a>
//       </section>

//       {/* Footer CTA */}
//       <section className="footer-cta" data-aos="fade-up">
//         <h2>Ready to start your dream career in tech?</h2>
//         <a href="/register" className="cta-button">
//           Join LearnHub Today
//         </a>
//       </section>
//     </div>
//   );
// };

// export default Landing;





// src/pages/Landing.jsx
// src/pages/Landing.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { TypeAnimation } from 'react-type-animation';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Landing.css";

// --- Data for the page sections ---
const pageData = {
  testimonials: [
    { id: 1, quote: "LearnHub helped me crack my first internship and polish my GitHub profile. Must use!", author: "Riya Singh", course: "Full Stack Development" },
    { id: 2, quote: "The roadmap really cleared my confusion on what to learn when. Super clean!", author: "Mohit Sharma", course: "Data Science" },
    { id: 3, quote: "Mentorship sessions were a game changer for me. Highly recommend LearnHub.", author: "Anjali Patel", course: "DevOps Engineering" },
  ],
  mentors: [
    { id: 1, name: "Suman Das", expertise: "Frontend Developer @ Google", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { id: 2, name: "Mansi Gupta", expertise: "DSA Expert @ Microsoft", img: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    { id: 3, name: "Rahul Verma", expertise: "Backend Developer @ Amazon", img: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
    { id: 4, name: "Priya Chauhan", expertise: "Data Scientist @ Netflix", img: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
  ],
  faqs: [
    { question: "Is LearnHub free to use?", answer: "Yes! Our Free Forever plan offers extensive resources, community access, and one roadmap. Premium plans unlock advanced features like priority mentorship and exclusive content." },
    { question: "How do I become a mentor?", answer: "Final year students and industry professionals can register as mentors after a verification process. Admin approval is required to maintain quality." },
    { question: "Can I track my progress?", answer: "Absolutely! Our interactive dashboard shows your learning streaks, completed modules, project submissions, and performance analytics." },
    { question: "What makes LearnHub different?", answer: "We focus on a practical, project-based approach with direct guidance from mentors who are currently in the industry, ensuring you learn relevant, in-demand skills." },
  ],
  blogs: [
    { id: 1, title: "Breaking into Web Development in 2025", excerpt: "Learn how to start your journey in web development with practical tips and resources for the modern tech landscape.", url: "/blog/1", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" },
    { id: 2, title: "DSA Tips from a Final Year Student", excerpt: "Effective strategies to master data structures and algorithms for placements, from someone who just cracked the code.", url: "/blog/2", img: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" },
    { id: 3, title: "The Rise of DevOps: A Beginner's Guide", excerpt: "Understand the core principles of DevOps and why it's a crucial skill for modern software engineers.", url: "/blog/3", img: "https://images.unsplash.com/photo-1631106251203-d2fe74685513?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" },
  ],
};

// --- Custom Hook for Count-Up Animation ---
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const observer = useRef(null);
    const isIntersecting = useRef(false);

    useEffect(() => {
        const node = ref.current;
        const startCount = () => {
            let start = 0;
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            const timer = setInterval(() => {
                start += increment;
                setCount(start);
                if (start === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isIntersecting.current) {
                isIntersecting.current = true;
                startCount();
                observer.current.disconnect();
            }
        }, { threshold: 0.5 });

        if (node) {
            observer.current.observe(node);
        }
        return () => observer.current?.disconnect();
    }, [end, duration]);

    return [ref, count];
};


// --- Section Components ---

const Hero = ({ t }) => (
  <section id="top" className="hero-section">
    <div className="aurora-bg"></div>
    {/* Ensure you have a video at this path in your public folder */}
    <video className="hero-video" autoPlay muted loop playsInline src="/videos/Generated video 1.mp4" aria-hidden="true" />
    <div className="hero-content" data-aos="fade-up">
      <h1 className="hero-title">
        {t('welcome to LearnHub') || "Your Journey to a"}
        <TypeAnimation
          sequence={[
            'Tech Study Starts Here.', 2000,
            'Dream Internship Starts Here.', 2000,
            'Top Knowledge gain Starts Here.', 2000,
          ]}
          wrapper="span" speed={50} className="highlighted-text" repeat={Infinity}
        />
      </h1>
      <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
        {t('hero.subtitle') || "LearnHub empowers tech students with curated content, structured roadmaps, real-world mentorship, and a thriving developer community."}
      </p>
      <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="400">
        <a href="/register" className="cta-button primary">{t('joinFree') || "Start Learning for Free"}</a>
        <a href="#features" className="cta-button secondary">{t('exploreFeatures') || "Explore Features"}</a>
      </div>
    </div>
  </section>
);

const FeaturedIn = () => (
    <section className="featured-in-section" data-aos="fade-up">
        <p>Our students are getting hired by top companies</p>
        <div className="logos-container">
            {['google', 'microsoft', 'amazon', 'netflix', 'jpmorgan'].map(logo => (
                <img key={logo} src={`/images/logos/${logo}.svg`} alt={`${logo} logo`} />
            ))}
        </div>
    </section>
);

const StatCard = ({ value, label, suffix = '' }) => {
    const [ref, count] = useCountUp(value);
    return (
        <div className="stat-card" ref={ref}>
            <h3>{count.toLocaleString()}{suffix}</h3>
            <p>{label}</p>
        </div>
    );
};
const Stats = () => (
    <section className="stats-section">
        <div className="stats-grid" data-aos="fade-up">
            <StatCard value={15000} label="Active Students" suffix="+" />
            <StatCard value={800} label="Industry Mentors" suffix="+" />
            <StatCard value={2500} label="Curated Resources" suffix="+" />
            <StatCard value={95} label="Placement Success" suffix="%" />
        </div>
    </section>
);

const Features = ({ t }) => (
    <section id="features" className="landing-section">
        <h2 className="section-title" data-aos="fade-up">Why Choose LearnHub?</h2>
        <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100"><div className="feature-icon">📚</div><h3>Curated Roadmaps</h3><p>Follow step-by-step learning paths designed by industry experts and top students.</p></div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200"><div className="feature-icon">🧠</div><h3>Expert Mentorship</h3><p>Connect with final-year mentors and alumni to get personalized guidance.</p></div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300"><div className="feature-icon">💡</div><h3>Community Support</h3><p>Join active chatrooms, forums, and study groups to collaborate and grow.</p></div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400"><div className="feature-icon">🎯</div><h3>Career Preparation</h3><p>Access interview prep, resume reviews, and placement tips from experts.</p></div>
        </div>
    </section>
);

const HowItWorks = ({ t }) => (
    <section className="landing-section">
        <h2 className="section-title" data-aos="fade-up">How It Works in 4 Simple Steps</h2>
        <div className="steps-timeline" data-aos="fade-in">
            <div className="step-card" data-aos="fade-right"><div className="step-number">1</div><h3>Create Profile</h3><p>Sign up and tell us your interests and goals.</p></div>
            <div className="step-card" data-aos="fade-left"><div className="step-number">2</div><h3>Choose Roadmap</h3><p>Select a learning path tailored to your career goals.</p></div>
            <div className="step-card" data-aos="fade-right"><div className="step-number">3</div><h3>Learn & Connect</h3><p>Get curated materials and connect with mentors.</p></div>
            <div className="step-card" data-aos="fade-left"><div className="step-number">4</div><h3>Track & Achieve</h3><p>Monitor your learning and prepare for your dream job.</p></div>
        </div>
    </section>
);

const RoadmapPreview = () => (
    <section className="landing-section">
        <h2 className="section-title" data-aos="fade-up">Visualize Your Success</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Our interactive roadmaps guide you from beginner to pro.</p>
        <div className="roadmap-container" data-aos="zoom-in">
            <div className="roadmap-node start">Start</div><div className="roadmap-path"></div><div className="roadmap-node">HTML/CSS</div><div className="roadmap-path"></div><div className="roadmap-node">JavaScript</div><div className="roadmap-path"></div><div className="roadmap-node">React</div><div className="roadmap-path"></div><div className="roadmap-node">Node.js</div><div className="roadmap-path"></div><div className="roadmap-node end">Hired!</div>
        </div>
    </section>
);

const Testimonials = ({ testimonials, t }) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setCurrent(prev => (prev + 1) % testimonials.length), 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="testimonials-section">
            <h2 className="section-title" data-aos="fade-up">What Our Students Say</h2>
            <div className="testimonial-carousel" data-aos="fade-up" data-aos-delay="100">
                {testimonials.map((testimonial, index) => (
                    <blockquote key={testimonial.id} className={index === current ? 'active' : ''}>
                        “{testimonial.quote}”
                        <footer>— {testimonial.author}, <span>{testimonial.course}</span></footer>
                    </blockquote>
                ))}
            </div>
        </section>
    );
};

const Mentors = ({ mentors, t }) => (
    <section className="landing-section">
        <h2 className="section-title" data-aos="fade-up">Meet Our Mentors</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Learn from engineers at top-tier companies.</p>
        <div className="mentors-grid">
            {mentors.map((mentor, index) => (
                <div key={mentor.id} className="mentor-card" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                    <div className="mentor-card-inner">
                        <img src={mentor.img} alt={mentor.name} className="mentor-avatar" />
                        <h3>{mentor.name}</h3>
                        <p>{mentor.expertise}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const Blog = ({ blogs, t }) => (
    <section className="landing-section">
        <h2 className="section-title" data-aos="fade-up">From Our Blog</h2>
        <div className="blog-grid">
            {blogs.map((post, index) => (
                <a href={post.url} key={post.id} className="blog-card" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                    <img src={post.img} alt={post.title} className="blog-card-img" />
                    <div className="blog-card-content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <span className="read-more">Read More →</span>
                    </div>
                </a>
            ))}
        </div>
    </section>
);

const Faq = ({ faqs, t }) => (
    <section className="landing-section">
        <h2 className="section-title" data-aos="fade-up">Frequently Asked Questions</h2>
        <div className="faq-list" data-aos="fade-up" data-aos-delay="100">
            {faqs.map(({ question, answer }, idx) => (
                <details key={idx} className="faq-item">
                    <summary><span>{question}</span><span className="faq-icon">+</span></summary>
                    <p>{answer}</p>
                </details>
            ))}
        </div>
    </section>
);

const Pricing = ({ t }) => {
    const [billing, setBilling] = useState('monthly');
    return (
        <section className="landing-section">
            <h2 className="section-title" data-aos="fade-up">Flexible Plans for Everyone</h2>
            <div className="billing-toggle" data-aos="fade-up" data-aos-delay="100">
                <span>Monthly</span>
                <label className="switch"><input type="checkbox" onChange={() => setBilling(p => p === 'monthly' ? 'annually' : 'monthly')} /><span className="slider round"></span></label>
                <span>Annually <span className="save-badge">Save 20%</span></span>
            </div>
            <div className="pricing-grid">
                <div className="pricing-card" data-aos="fade-right"><div className="card-header"><h3>Free Forever</h3><p>For getting started</p></div><div className="card-price">₹0</div><ul><li>✓ 1 Learning Roadmap</li><li>✓ Community Access</li><li>✓ Curated Resources</li><li>✗ Priority Mentorship</li><li>✗ Exclusive Content</li></ul><a href="/register" className="cta-button secondary full-width">Get Started</a></div>
                <div className="pricing-card popular" data-aos="zoom-in"><div className="card-header"><h3>Pro Plan</h3><p>For serious learners</p></div><div className="card-price">{billing === 'monthly' ? '₹499/mo' : '₹399/mo'}</div><ul><li>✓ Unlimited Roadmaps</li><li>✓ Priority Mentorship</li><li>✓ Exclusive Content</li><li>✓ Project Reviews</li><li>✓ Ad-free Experience</li></ul><a href="/payment" className="cta-button primary full-width">Upgrade to Pro</a></div>
                <div className="pricing-card" data-aos="fade-left"><div className="card-header"><h3>For Teams</h3><p>For institutions</p></div><div className="card-price">Custom</div><ul><li>✓ Everything in Pro</li><li>✓ Team Dashboard</li><li>✓ Bulk Licensing</li><li>✓ Custom Onboarding</li><li>✓ Dedicated Support</li></ul><a href="/contact" className="cta-button secondary full-width">Contact Sales</a></div>
            </div>
        </section>
    );
};

const Newsletter = ({ t }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setMessage("Thank you for subscribing!");
            setEmail("");
        } else {
            setMessage("Please enter a valid email.");
        }
    };
    return (
        <section className="newsletter-section" data-aos="fade-up">
            <h2>Stay Ahead of the Curve</h2>
            <p>Subscribe to our newsletter for the latest tech insights, tips, and platform updates.</p>
            <form onSubmit={handleSubmit} className="newsletter-form">
                <input type="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Email address" />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p className="newsletter-msg">{message}</p>}
        </section>
    );
};

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-col"><h4>LearnHub</h4><p>Empowering the next generation of tech talent in India.</p></div>
            <div className="footer-col"><h4>Quick Links</h4><ul><li><a href="/roadmaps">Roadmaps</a></li><li><a href="/community">Community</a></li><li><a href="/blog">Blog</a></li><li><a href="/mentors">Mentors</a></li></ul></div>
            <div className="footer-col"><h4>Legal</h4><ul><li><a href="/privacy">Privacy Policy</a></li><li><a href="/terms">Terms of Service</a></li></ul></div>
            <div className="footer-col"><h4>Follow Us</h4><div className="social-icons"><a href="#" aria-label="Facebook"><FaFacebookF /></a><a href="#" aria-label="Twitter"><FaTwitter /></a><a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a><a href="#" aria-label="Instagram"><FaInstagram /></a></div></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} LearnHub. All Rights Reserved. Made with ❤️ in India.</p></div>
    </footer>
);


// --- Main Landing Page Component ---

const Landing = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="landing-page-container">
      <a href="#top" className="back-to-top" aria-label="Back to top">↑</a>
      <Hero t={t} />
      <FeaturedIn />
      <Stats />
      <Features t={t} />
      <HowItWorks t={t} />
      <RoadmapPreview />
      <Testimonials testimonials={pageData.testimonials} t={t} />
      <Mentors mentors={pageData.mentors} t={t} />
      <Pricing t={t} />
      <Blog blogs={pageData.blogs} t={t} />
      <Faq faqs={pageData.faqs} t={t} />
      <Newsletter t={t} />
      <Footer />
    </div>
  );
};

export default Landing;