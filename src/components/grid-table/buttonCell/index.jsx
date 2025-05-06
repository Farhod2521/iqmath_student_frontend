import { useRouter } from "next/router";
import React from "react";

const ButtonCellRenderer = ({ value, data, url }) => {
  const router = useRouter();
  return (
    <button
      className={`py-[6px]  w-full text-sm rounded ${
        value === "Начать"
          ? "bg-[#EDEDF2] hover:bg-[#dadada] !text-black"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      onClick={() => router.push(`${url}${data?.id}`)}
    >
      {value}
    </button>
  );
};

export default ButtonCellRenderer;
