const QuestionCountIcon = ({ color = "#FF9500", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline" }}
  >
    <circle cx="12" cy="12" r="12" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="12" r="10" fill="#fff" />
    <path
      d="M12 17.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.07-7.75c0-.6-.5-1-1.07-1-.57 0-1.07.4-1.07 1 0 .37.19.7.5.88l.5.29c.31.18.5.51.5.88v.25a.75.75 0 1 1-1.5 0v-.25c0-.37-.19-.7-.5-.88l-.5-.29A2.07 2.07 0 0 1 12 7.5c1.1 0 2 .9 2 2 0 .37-.19.7-.5.88l-.5.29c-.31.18-.5.51-.5.88v.25a.75.75 0 1 1-1.5 0v-.25c0-.37.19-.7.5-.88l.5-.29c.31-.18.5-.51.5-.88Z"
      fill={color}
    />
  </svg>
);

export default QuestionCountIcon; 