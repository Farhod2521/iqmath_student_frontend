import React from "react";

const ProgressCellRenderer = ({ value, data }) => {
  // Null va undefined qiymatlarni qayta ishlash
  const displayValue = (value === null || value === undefined) ? 0 : value
  
  return (
    <div className="flex items-center space-x-4">
      {/* Progress Bar */}
      <div className="relative w-24 h-3 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
          style={{ width: `${displayValue}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{displayValue}%</span>

      {/* Tugma (Начать yoki Продолжить) */}
      {displayValue < 100 && (
        <button
          className={`px-3 py-1 text-sm text-white rounded ${
            displayValue === 0
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() =>
            alert(`${displayValue === 0 ? "Начать" : "Продолжить"} задачу: ${data.id}`)
          }
        >
          {displayValue === 0 ? "Начать" : "Продолжить"}
        </button>
      )}
    </div>
  );
};

export default ProgressCellRenderer;
