import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";

export default function Navbar({
  onLoginClick,
  onSignupClick,
  onHomeClick,
  onPlansClick
}) {
  const [user, setUser] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const navigate = useNavigate();

  // ✅ Get user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch profile data when dropdown opens
  useEffect(() => {
    if (profileDropdown && user && !profileData) {
      fetchProfileData();
    }
  }, [profileDropdown]);

  const fetchProfileData = async () => {
    try {
      setLoadingProfile(true);
      
      // Get token from localStorage (use uid as token for now)
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
      const token = userData.uid;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/user/profile`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setProfileData(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileData(null);
    setProfileDropdown(false);
    navigate("/");
  };

  // ✅ Get user initials for avatar
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }
    return user?.firstName ? user.firstName[0].toUpperCase() : "U";
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
          Test Series
        </button>

        {/* ✅ Show Quiz only after login */}
        {user && (
          <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/dashboard")}
          >
            Quiz
          </button>
        )}
      </nav>

      <div className="nav-actions">
        {/* ✅ LOGGED IN USER: Profile Dropdown */}
        {user ? (
          <div className="profile-container">
            {/* Profile Button */}
            <button
              className="profile-button"
              onClick={() => setProfileDropdown(!profileDropdown)}
              title={user.firstName}
            >
              <div className="profile-avatar">
                {getUserInitials()}
              </div>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            {profileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="profile-avatar-large">
                    {getUserInitials()}
                  </div>
                  <h3>{user.firstName} {user.lastName}</h3>
                </div>

                <div className="dropdown-divider"></div>

                {/* Profile Info */}
                <div className="profile-info">
                  {loadingProfile ? (
                    <div className="loading">Loading...</div>
                  ) : profileData ? (
                    <>
                      <div className="info-item">
                        <label>First Name</label>
                        <p>{profileData.firstName}</p>
                      </div>
                      <div className="info-item">
                        <label>Last Name</label>
                        <p>{profileData.lastName}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{profileData.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Phone Number</label>
                        <p>{profileData.phone}</p>
                      </div>
                    </>
                  ) : (
                    <div className="error">Failed to load profile</div>
                  )}
                </div>

                <div className="dropdown-divider"></div>

                {/* Logout Button */}
                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // ✅ NOT LOGGED IN: Login/Register Buttons
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

      {/* Close dropdown when clicking outside */}
      {profileDropdown && (
        <div
          className="dropdown-overlay"
          onClick={() => setProfileDropdown(false)}
        ></div>
      )}
    </header>
  );
}
