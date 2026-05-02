import { useState, useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import Tiles from "./components/Tiles/Tiles";
import WhyUs from "./components/WhyUs/WhyUs";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Testimonials from "./components/Testimonials/Testimonials";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

import SignupModal from "./components/Auth/SignupModal";
import LoginModal from "./components/Auth/LoginModal";

import TestSeriesPage from "./pages/TestSeries/TestSeriesPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import PaymentPage from "./pages/PaymentPage";

import "./App.css";

function AppContent() {
  const [authMode, setAuthMode] = useState(null);
  const navigate = useNavigate();

  // ✅ Global modal trigger (keep same)
  useEffect(() => {
    const handler = (e) => {
      const mode = e?.detail?.mode;
      if (mode === "login" || mode === "signup") {
        setAuthMode(mode);
      }
    };

    window.addEventListener("openAuthModal", handler);
    return () => window.removeEventListener("openAuthModal", handler);
  }, []);

  // ✅ Login handler
  const handleLoginClick = () => {
    const hasSession = Boolean(
      localStorage.getItem("token") || localStorage.getItem("user")
    );

    if (hasSession) {
      navigate("/dashboard");
      return;
    }

    setAuthMode("login");
  };

  // ✅ Free test handler
  const handleStartFreeTest = () => {
    const hasSession = Boolean(
      localStorage.getItem("token") || localStorage.getItem("user")
    );

    if (hasSession) {
      navigate("/test-series");
      return;
    }

    setAuthMode("login");
  };

  const heroRef = useRef(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <>
              <Navbar
                onSignupClick={() => setAuthMode("signup")}
                onLoginClick={handleLoginClick}
                onHomeClick={scrollToHero}
                onPlansClick={() => navigate("/test-series")}
              />

              <div ref={heroRef}>
                <HeroSlider
                  onStartFreeTest={handleStartFreeTest}
                  onLoginClick={handleLoginClick}
                />
              </div>

              <Tiles />
              <WhyUs />
              <HowItWorks />
              <Testimonials />
              <CTA
                onStartFreeTest={handleStartFreeTest}
                onExploreTestSeries={() => navigate("/test-series")}
              />
              <Footer />
            </>
          }
        />

        {/* ================= TEST SERIES ================= */}
        <Route
          path="/test-series"
          element={
            <TestSeriesPage
              onLoginClick={handleLoginClick}
              onSignupClick={() => setAuthMode("signup")}
            />
          }
        />

        {/* ================= DASHBOARD (🔥 FIX HERE) ================= */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              onLoginClick={handleLoginClick}
              onSignupClick={() => setAuthMode("signup")}
            />
          }
        />

        {/* ================= PAYMENT ================= */}
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>

      {/* ================= MODALS ================= */}

      <SignupModal
        isOpen={authMode === "signup"}
        onClose={() => setAuthMode(null)}
        switchToLogin={() => setAuthMode("login")}
      />

      <LoginModal
        isOpen={authMode === "login"}
        onClose={() => setAuthMode(null)}
        switchToSignup={() => setAuthMode("signup")}
      />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;