import Image from "next/image";
import React, { useCallback } from "react";

const SearchInput = ({
  placeholder = "Qidirish...",
  value,
  onChange,
  className = "",
  isLoading = false,
  disabled = false
}) => {
  // Clear function'ni useCallback bilan optimallashtiramiz
  const handleClear = useCallback(() => {
    onChange({ target: { value: '' } });
  }, [onChange]);

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 transition-all duration-200 hover:bg-gray-100 focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-md ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin mr-2"></div>
      ) : (
        <Image
          src={"/icons/search.svg"}
          alt="search"
          width={23}
          height={23}
          className="mr-2"
        />
      )}
      <input
        type="text"
        className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {value && !isLoading && (
        <button
          onClick={handleClear}
          className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          type="button"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;