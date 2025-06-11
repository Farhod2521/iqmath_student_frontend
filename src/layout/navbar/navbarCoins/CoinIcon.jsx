const CoinIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" fill="#FFD700" stroke="#E6B800" strokeWidth="4"/>
    <circle cx="50" cy="50" r="40" fill="#FFEB99" stroke="#E6B800" strokeWidth="2"/>
    <ellipse cx="50" cy="50" rx="36" ry="36" fill="#FFE066" />
    <ellipse cx="50" cy="50" rx="32" ry="32" fill="#FFDF60" opacity="0.7"/>
    <path d="M20 60 Q40 80 80 40" stroke="#FFF4B0" strokeWidth="4" opacity="0.3"/>
    <path d="M30 30 Q60 10 70 30" stroke="#FFF4B0" strokeWidth="4" opacity="0.3"/>
  </svg>
);

export default CoinIcon;
