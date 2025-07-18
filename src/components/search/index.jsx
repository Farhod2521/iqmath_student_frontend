import Image from "next/image";

const SearchInput = ({
  placeholder = "Qidirish...",
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 ${className}`}
    >
      <Image
        src={"/icons/search.svg"}
        alt="search"
        width={23}
        height={23}
        className="mr-2"
      />
      <input
        type="text"
        className="bg-transparent outline-none flex-1 text-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;