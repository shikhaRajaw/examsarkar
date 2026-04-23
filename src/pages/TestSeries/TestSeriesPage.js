import "./TestSeriesPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaClock, FaClipboardCheck, FaChartLine, FaUserGraduate } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import PlanSection from "../../components/PlanCard/PlanSection";

export default function TestSeriesPage() {
  const navigate = useNavigate();
  const plansRef = useRef(null);

  const slides = [
    {
      title: "AIR-Level Exam Simulation",
      desc: "Practice with real-exam pressure, timing and scoring patterns.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    },
    {
      title: "Daily Discipline Framework",
      desc: "Short daily tests with instant feedback for compounding improvement.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      title: "UPSC Pattern Precision",
      desc: "Designed around current UPSC format, difficulty and revision flow.",
      img: "https://images.unsplash.com/photo-1505666287802-931dc83a4c1b"
    }
  ];

  const highlights = [
    {
      icon: <FaClipboardCheck />,
      title: "Structured Test Cycle",
      desc: "Prelims-style MCQ sets, sectional tests and revision checkpoints."
    },
    {
      icon: <FaChartLine />,
      title: "Actionable Analytics",
      desc: "Track weak areas chapter-wise and prioritize what improves score fastest."
    },
    {
      icon: <FaClock />,
      title: "Time-Bound Practice",
      desc: "Build speed and decision quality with strict timer-based simulations."
    },
    {
      icon: <FaUserGraduate />,
      title: "Aspirant-Friendly Flow",
      desc: "Simple test-taking experience built for consistency across all devices."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar
        onHomeClick={() => navigate("/")}
        onPlansClick={scrollToPlans}
      />

      <div className="test-container">
        <div className="test-inner">
          <section className="test-hero-shell">
            <div className="hero-copy">
              <p className="hero-kicker">UPSC Test Series</p>
              <h1>Train Like a Top Ranker with a Professional Test Workflow</h1>
              <p className="hero-subtitle">
                From daily discipline to full-length simulations, get a clean and consistent system
                to improve speed, accuracy and confidence before exam day.
              </p>

              <div className="hero-actions">
                <button className="hero-btn hero-btn-primary" onClick={scrollToPlans} type="button">
                  Explore Plans <FaArrowRight />
                </button>
                <button className="hero-btn hero-btn-secondary" onClick={() => setIndex((prev) => (prev + 1) % slides.length)} type="button">
                  View Highlights
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Practice tests available</p>
                </div>
                <div className="stat-card">
                  <h3>24x7</h3>
                  <p>Anytime access</p>
                </div>
                <div className="stat-card">
                  <h3>3 Modes</h3>
                  <p>Daily, weekly, monthly</p>
                </div>
              </div>
            </div>

            <div className="carousel">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((slide, i) => (
                  <div
                    className="slide"
                    key={i}
                    style={{ backgroundImage: `url(${slide.img})` }}
                  >
                    <div className="overlay">
                      <h2>{slide.title}</h2>
                      <p>{slide.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dots">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className={i === index ? "dot active" : "dot"}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="highlights-grid" aria-label="Test series highlights">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </section>

          <section className="trust-strip">
            <p>Built for serious aspirants</p>
            <p>Aligned to real UPSC style questions</p>
            <p>Progress-focused and device-friendly</p>
          </section>

          <section className="plan-zone" ref={plansRef}>
            <div className="plan-heading">
              <h2>Choose a Plan That Matches Your Preparation Rhythm</h2>
              <p>
                Start small with daily tests or commit to weekly and monthly cycles for deeper
                performance tracking.
              </p>
            </div>

            <PlanSection title="Daily Plan" price={99} type="daily" />
            <PlanSection title="Weekly Plan" price={299} type="weekly" />
            <PlanSection title="Monthly Plan" price={799} type="monthly" highlight />
          </section>

        </div>
      </div>
    </>
  );
}