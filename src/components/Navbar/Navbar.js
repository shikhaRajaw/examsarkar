import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  onLoginClick,
  onSignupClick,
  onHomeClick,
  onPlansClick
}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div
        className="logo"
        onClick={onHomeClick}
        style={{ cursor: "pointer" }}
      >
        <span className="logo-primary">Exam</span>
        <span className="logo-accent">Sarkar</span>
      </div>

      <nav className="nav-links">
        <button type="button" className="nav-link" onClick={onHomeClick}>
          Home
        </button>

        <button type="button" className="nav-link" onClick={onPlansClick}>
          Plans
        </button>

        <button type="button" className="nav-link">
          Courses
        </button>

        <button type="button" className="nav-link">
          Blog
        </button>

        {/* ✅ ADD ONLY THIS (visible after login) */}
        {user && (
          <>
            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/dashboard")}
            >
              Quiz
            </button>

            <button type="button" className="nav-link">
              Performance
            </button>
          </>
        )}
      </nav>

      <div className="nav-actions">
        {/* ✅ CONDITIONAL RENDERING */}
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              👤 {user.firstName}
            </span>

            <button className="login" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login" onClick={onLoginClick}>
              Login
            </button>

            <button className="signup" onClick={onSignupClick}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}