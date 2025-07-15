const DragIcon = ({ size = 24, color = "currentColor" }) => {
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
    >
      <circle cx="8" cy="6" r="1" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="8" cy="18" r="1" />
      <circle cx="16" cy="6" r="1" />
      <circle cx="16" cy="12" r="1" />
      <circle cx="16" cy="18" r="1" />
    </svg>
  );
};

export default DragIcon; 