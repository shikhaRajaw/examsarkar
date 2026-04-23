import "./PlanCard.css";
import SubPlanCard from "./SubPlanCard";

export default function PlanCard({ title, highlight }) {
  return (
    <div className={`plan-card ${highlight ? "highlight" : ""}`}>

      {highlight && <div className="badge">Most Popular</div>}

      <h2>{title}</h2>

      <div className="sub-container">

        <SubPlanCard
          title="CSAT"
          price={title === "Daily Plan" ? 99 : title === "Weekly Plan" ? 299 : 799}
          features={["Practice Tests", "Time Analysis"]}
        />

        <SubPlanCard
          title="GS Prelims"
          price={title === "Daily Plan" ? 99 : title === "Weekly Plan" ? 299 : 799}
          features={["Topic-wise Tests", "Performance Insights"]}
        />

      </div>

    </div>
  );
}