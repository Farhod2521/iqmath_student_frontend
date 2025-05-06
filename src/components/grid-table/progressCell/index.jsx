import React from "react";

const ProgressCellRenderer = ({ value, data }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Progress Bar */}
      <div className="relative w-24 h-3 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{value}%</span>

      {/* Tugma (Начать yoki Продолжить) */}
      {value < 100 && (
        <button
          className={`px-3 py-1 text-sm text-white rounded ${
            value === 0
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() =>
            alert(`${value === 0 ? "Начать" : "Продолжить"} задачу: ${data.id}`)
          }
        >
          {value === 0 ? "Начать" : "Продолжить"}
        </button>
      )}
    </div>
  );
};

export default ProgressCellRenderer;
