import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCard = () => {
  const percentage = 40;

  return (
    <div className="bg-[#0057FF] text-white p-6 rounded-2xl  text-center flex flex-col">
      <h2 className="text-lg font-medium mb-4">Мой прогресс</h2>

      {/* Progress Circle */}
      <div className="mx-auto mb-6" style={{ width: 114, height: 114 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#FFFFFF",
            pathColor: "#FFFFFF",
            trailColor: "rgba(255, 255, 255, 0.3)",
            strokeLinecap: "round",
            textSize: "20px",
          })}
        />
      </div>

      {/* Empty space to push content down */}
      <div className="flex-grow"></div>

      {/* Student Stats */}
      <div className="flex justify-between px-4 mt-auto">
        <div className="text-center">
          <p className="text-2xl font-semibold">6,825</p>
          <p className="text-sm opacity-80">Total students</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">6,825</p>
          <p className="text-sm opacity-80">Total students</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
