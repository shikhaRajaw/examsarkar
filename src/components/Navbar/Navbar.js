import "./Navbar.css";

export default function Navbar({
  onLoginClick,
  onSignupClick,
  onHomeClick,
  onPlansClick
}) {
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
        <a onClick={onHomeClick} style={{ cursor: "pointer" }}>