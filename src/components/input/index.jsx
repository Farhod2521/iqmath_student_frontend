const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-[#E9E9E9] rounded-[8px] w-full py-[10px] px-[16px] font-medium ${className}`}
    />
  );
};

export default Input;
