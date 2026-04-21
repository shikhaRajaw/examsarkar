import "./SignupModal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function LoginModal({ isOpen, onClose, switchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* CLOSE BUTTON */}
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* HEADER */}
        <h2>Welcome Back</h2>
        <p>Login to continue your preparation</p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // BACKEND READY HOOK (JWT)
            alert("Login Successful 🚀 (JWT ready flow)");
          }}
        >

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="auth-btn">
            Login
          </button>

        </form>

        {/* SWITCH TO SIGNUP */}
        <p className="bottom-text">
          Don’t have an account?{" "}
          <span className="link" onClick={switchToSignup}>
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
}