import "./SignupModal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function SignupModal({ isOpen, onClose, switchToLogin }) {
  const [otpSent, setOtpSent] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    otp: ""
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
        <h2>Create Account</h2>
        <p>Join ExamSarkar – Build your UPSC success journey</p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // BACKEND READY HOOK
            if (!otpSent) {
              setOtpSent(true);
              // TODO: call backend API -> send OTP
            } else {
              // TODO: verify OTP + register user (Java + Oracle)
              alert("User Registered Successfully 🚀");
            }
          }}
        >

          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
          />

          <input
            placeholder="Phone or Email"
            value={form.contact}
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
          />

          {otpSent && (
            <input
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />
          )}

          <button className="auth-btn">
            {otpSent ? "Verify & Create Account" : "Send OTP"}
          </button>

        </form>

        {/* SWITCH TO LOGIN */}
        <p className="bottom-text">
          Already have an account?{" "}
          <span className="link" onClick={switchToLogin}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}