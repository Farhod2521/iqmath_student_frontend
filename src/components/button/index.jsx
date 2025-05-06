import clsx from "clsx";

const Button = ({
  px = "px-[20px]",
  py = "py-[13px]",
  disabled = false,
  classname,
  rounded = "rounded-[10px]",
  border,
  onclick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onclick}
      disabled={disabled}
      className={clsx(
        "font-medium",
        px,
        py,
        rounded,
        border,
        disabled
          ? "bg-[#8D97B2] text-[#DCDCDD] cursor-not-allowed"
          : "bg-[#5D87FF] text-white",
        classname
      )}
    >
      {children}
    </button>
  );
};

export default Button;
