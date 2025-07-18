import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
// import "../styles/Onboarding.css";

const steps = [
  {
    target: ".navbar",
    content: (
      <div>
        <h3>Navigation Bar</h3>
        <p>Use this to navigate through the platform.</p>
      </div>
    ),
  },
  {
    target: ".hero-section",
    content: (
      <div>
        <h3>Hero Section</h3>
        <p>Start your learning journey here with curated content.</p>
      </div>
    ),
  },
  {
    target: ".dashboard-link",
    content: (
      <div>
        <h3>Dashboard</h3>
        <p>Access your personalized dashboard here.</p>
      </div>
    ),
  },
  {
    target: ".progress-tracker",
    content: (
      <div>
        <h3>Progress Tracker</h3>
        <p>Track your learning progress and daily streaks.</p>
      </div>
    ),
  },
  {
    target: ".features-section",
    content: (
      <div>
        <h3>Features</h3>
        <p>Explore the powerful features LearnHub offers.</p>
      </div>
    ),
  },
];

const Onboarding = () => {
  const [run, setRun] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data) => {
    const { status, index, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    } else if (type === "step:after" || type === "target:notFound") {
      setStepIndex(index + 1);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton
      showProgress
      disableScrolling={true}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#63a9ff",
          textColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.7)",
          spotlightShadow: "0 0 15px rgba(99, 169, 255, 0.5)",
        },
        buttonNext: {
          backgroundColor: "#63a9ff",
          color: "black",
          fontWeight: "bold",
        },
        buttonBack: {
          color: "#63a9ff",
        },
        buttonSkip: {
          color: "#ccc",
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

export default Onboarding;