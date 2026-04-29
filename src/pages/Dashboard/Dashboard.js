import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

// ICONS
import { Flame, Users, Activity, BarChart } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* TOP */}
        <div className="top-section">
          <div className="welcome">
            <h1>Welcome back, {user?.firstName || "Aspirant"} 👋</h1>
            <p>Keep learning, keep growing. Your UPSC journey is just getting started.</p>
          </div>

          {/* STATS */}
          <div className="stats-row">
            <div className="stat-card">
              <Users className="icon blue" />
              <p>Total Users</p>
              <h2>25,341</h2>
            </div>

            <div className="stat-card">
              <Activity className="icon green" />
              <p>Live Users</p>
              <h2>348</h2>
            </div>

            <div className="stat-card">
              <Flame className="icon orange" />
              <p>Current Streak</p>
              <h2>7 days</h2>
            </div>

            <div className="stat-card">
              <BarChart className="icon purple" />
              <p>Quiz Attempts</p>
              <h2>12 / 25</h2>
            </div>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <input placeholder="Search for topics, test series or quizzes..." />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">

          {/* LEFT */}
          <div className="left">

            {/* TEST SERIES */}
            <div className="card">
              <h2>Explore Test Series</h2>

              <div className="series-grid">

                <div className="series-card">
                  <img src="/assets/prelims.png" alt="" />
                  <h3>Prelims Test Series</h3>
                  <p>Topic-wise + Full Length</p>
                  <button>Explore →</button>
                </div>

                <div className="series-card">
                  <img src="/assets/csat.png" alt="" />
                  <h3>CSAT Test Series</h3>
                  <p>Sharpen aptitude skills</p>
                  <button>Explore →</button>
                </div>

                <div className="series-card">
                  <img src="/assets/mock.png" alt="" />
                  <h3>Full Mock Tests</h3>
                  <p>Simulate UPSC exam</p>
                  <button>Explore →</button>
                </div>

              </div>
            </div>

            {/* DAILY */}
            <div className="daily">
              <div>
                <h3>🏆 Daily Challenge</h3>
                <p>Attempt today's quiz and build your streak.</p>
              </div>
              <button>Attempt Now →</button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="right">

            {/* PERFORMANCE */}
            <div className="card">
              <h3>Your Performance Snapshot</h3>
              <p>No performance data yet</p>
              <button className="primary-btn">Take a Test Now</button>
            </div>

            {/* LIVE */}
            <div className="card">
              <h3>🔴 Live Test Now</h3>
              <p>348 learners are taking</p>
              <button>Join Live Test →</button>
            </div>

            {/* STREAK */}
            <div className="card">
              <h3>🔥 Streak Calendar</h3>
              <div className="streak">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}