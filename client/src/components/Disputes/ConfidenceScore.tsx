import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ConfidenceScore: React.FC = () => {
  const percentage = 42; // Hardcoded for now, will be a variable later

  return (
    <div style={{ width: "150px", height: "150px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: "#000",
          trailColor: "#d6d6d6",
          backgroundColor: "#f8f9fa",
        })}
      />
    </div>
  );
};

export default ConfidenceScore;
