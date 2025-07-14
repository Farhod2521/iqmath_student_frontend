import React from 'react';

const DragIcon = ({ size = 20, color = "#6B7280", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-grab active:cursor-grabbing ${className}`}
      data-drag-handle
    >
      <circle cx="8" cy="8" r="1" />
      <circle cx="8" cy="16" r="1" />
      <circle cx="16" cy="8" r="1" />
      <circle cx="16" cy="16" r="1" />
    </svg>
  );
};

export default DragIcon; 