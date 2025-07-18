// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Hero Section
      "welcome.line1": "Your Journey to a",
      "hero.subtitle": "LearnHub empowers tech students with curated content, structured roadmaps, real-world mentorship, and a thriving developer community.",
      "joinFree": "Start Learning for Free",
      "exploreFeatures": "Explore Features",

      // Other Sections
      "whyChoose": "Why Choose LearnHub?",
      "howItWorks": "How It Works in 4 Simple Steps",
      "visualizeSuccess": "Visualize Your Success",
      "roadmapSubtitle": "Our interactive roadmaps guide you from beginner to pro.",
      "whatStudentsSay": "What Our Students Say",
      "meetMentors": "Meet Our Mentors",
      "mentorsSubtitle": "Learn from engineers at top-tier companies.",
      "pricingTitle": "Flexible Plans for Everyone",
      "fromOurBlog": "From Our Blog",
      "faqTitle": "Frequently Asked Questions",
      "newsletterTitle": "Stay Ahead of the Curve",
      "newsletterSubtitle": "Subscribe to our newsletter for the latest tech insights, tips, and platform updates.",
      "subscribe": "Subscribe",
    },
  },
  hi: {
    translation: {
      // Navbar (from your original file)
      "Login": "लॉग इन करें",
      "Register": "पंजीकरण करें",
      "Email": "ईमेल",
      "Password": "पासवर्ड",
      "Submit": "सबमिट करें",
      
      // Hero Section
      "welcome.line1": "[hi] Your Journey to a",
      "hero.subtitle": "[hi] LearnHub empowers tech students with curated content, structured roadmaps, real-world mentorship, and a thriving developer community.",
      "joinFree": "[hi] Start Learning for Free",
      "exploreFeatures": "[hi] Explore Features",

      // Other Sections
      "whyChoose": "[hi] Why Choose LearnHub?",
      "howItWorks": "[hi] How It Works in 4 Simple Steps",
      "visualizeSuccess": "[hi] Visualize Your Success",
      "roadmapSubtitle": "[hi] Our interactive roadmaps guide you from beginner to pro.",
      "whatStudentsSay": "[hi] What Our Students Say",
      "meetMentors": "[hi] Meet Our Mentors",
      "mentorsSubtitle": "[hi] Learn from engineers at top-tier companies.",
      "pricingTitle": "[hi] Flexible Plans for Everyone",
      "fromOurBlog": "[hi] From Our Blog",
      "faqTitle": "[hi] Frequently Asked Questions",
      "newsletterTitle": "[hi] Stay Ahead of the Curve",
      "newsletterSubtitle": "[hi] Subscribe to our newsletter for the latest tech insights, tips, and platform updates.",
      "subscribe": "[hi] Subscribe",
    },
  },
  es: {
    translation: {
      // Hero Section
      "welcome.line1": "[es] Your Journey to a",
      "hero.subtitle": "[es] LearnHub empowers tech students with curated content, structured roadmaps, real-world mentorship, and a thriving developer community.",
      "joinFree": "Únete Gratis",
      "exploreFeatures": "[es] Explore Features",

      // Other Sections
      "whyChoose": "[es] Why Choose LearnHub?",
      "howItWorks": "[es] How It Works in 4 Simple Steps",
      "visualizeSuccess": "[es] Visualize Your Success",
      "roadmapSubtitle": "[es] Our interactive roadmaps guide you from beginner to pro.",
      "whatStudentsSay": "[es] What Our Students Say",
      "meetMentors": "[es] Meet Our Mentors",
      "mentorsSubtitle": "[es] Learn from engineers at top-tier companies.",
      "pricingTitle": "[es] Flexible Plans for Everyone",
      "fromOurBlog": "[es] From Our Blog",
      "faqTitle": "[es] Frequently Asked Questions",
      "newsletterTitle": "[es] Stay Ahead of the Curve",
      "newsletterSubtitle": "[es] Subscribe to our newsletter for the latest tech insights, tips, and platform updates.",
      "subscribe": "[es] Subscribe",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;