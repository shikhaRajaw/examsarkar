import React from "react";
import "./CTA.css";
import { FaUsers, FaStar, FaClipboardCheck } from "react-icons/fa";

const CTA = ({ onStartFreeTest, onExploreTestSeries }) => {
  return (
    <div className="cta-container">

      <div className="cta-glow"></div>

      <div className="cta-content">

        {/* SOCIAL PROOF BADGES */}
        <div className="cta-stats">
          <div className="stat">
            <FaUsers />
            <h3>10,000+</h3>
            <p>Students Registered</p>
          </div>

          <div className="stat">
            <FaStar />
            <h3>4.8/5</h3>
            <p>User Satisfaction</p>
          </div>

          <div className="stat">
            <FaClipboardCheck />
            <h3>500+</h3>
            <p>Mock Tests</p>
          </div>
        </div>

        {/* MAIN TEXT */}
        <h2>Join India’s Fastest Growing EXAM SARKAR Platform</h2>

        <p>
          Practice real exam-level tests, track your progress with analytics,
          and improve faster with structured learning paths.
        </p>

        {/* BUTTONS */}
        <div className="cta-buttons">
          <button 
            className="cta-primary"
            onClick={onStartFreeTest}
            type="button"
          >
            Start Free Test
          </button>
          <button 
            className="cta-secondary"
            onClick={onExploreTestSeries}
            type="button"
          >
            Explore Test Series
          </button>
        </div>

      </div>
    </div>
  );
};

export default CTA;