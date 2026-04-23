import "./PlanSection.css";
import SubPlanCard from "./SubPlanCard";

export default function PlanSection({ title, price, type, highlight }) {

  // 🔥 FEATURE LOGIC
  const getFeatures = (type, subject) => {

    const common = [
      "Timed Practice Tests",
      "Instant Results & Solutions",
      "Performance Tracking"
    ];

    if (type === "daily") {
      return [
        ...common,
        "1 Free Sectional Test",
        subject === "CSAT"
          ? "Basic Aptitude Practice"
          : "Daily Current Affairs MCQs"
      ];
    }

    if (type === "weekly") {
      return [
        ...common,
        "2 Free Tests (1 Sectional + 1 Mini Mock)",
        subject === "CSAT"
          ? "Timed CSAT Practice Sets"
          : "Topic-wise GS Tests",
        "Detailed Performance Analysis",
        "Weak Area Identification"
      ];
    }

    if (type === "monthly") {
      return [
        ...common,
        "4 Full-Length Mock Tests",
        subject === "CSAT"
          ? "Advanced CSAT Drills"
          : "Complete GS Coverage",
        "All India Ranking",
        "Detailed Analytics Dashboard",
        "Exam Simulation Mode",
        "Topper Strategy Insights"
      ];
    }

    return [];
  };

  // 🔥 SUBTITLE
  const getSubtitle = () => {
    if (type === "daily") return "Start your preparation";
    if (type === "weekly") return "Most students prefer this";
    return "Complete UPSC-level preparation";
  };

  return (
    <div className={`plan-section ${highlight ? "highlight" : ""}`}>

      {/* HEADER */}
      <div className="plan-header">
        <div>
          <h2>{title}</h2>
          <p className="plan-subtitle">{getSubtitle()}</p>
        </div>

        {highlight && <span className="badge">Most Popular</span>}
      </div>

      {/* WEEKLY TAG */}
      {type === "weekly" && (
        <div className="best-tag">Best Value</div>
      )}

      {/* CARDS */}
      <div className="sub-row">

        <SubPlanCard
          title="CSAT"
          price={price}
          features={getFeatures(type, "CSAT")}
        />

        <SubPlanCard
          title="GS Prelims"
          price={price}
          features={getFeatures(type, "GS")}
        />

      </div>

    </div>
  );
}