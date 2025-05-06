import Image from "next/image";
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={
        <Image
          src={"/icons/chevron.svg"}
          alt="chevron"
          width={20}
          height={20}
        />
      }
      nextLabel={
        <Image
          src={"/icons/chevron.svg"}
          alt="chevron"
          width={20}
          height={20}
          className="rotate-180"
        />
      }
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName="flex items-center space-x-2 "
      pageClassName="px-[13px] py-[4px]  border rounded-full cursor-pointer text-[17px] text-gray-600"
      activeClassName="bg-gray-200 font-bold text-black"
      previousClassName="p-[7px] border rounded-full cursor-pointer"
      nextClassName="p-[7px] border rounded-full cursor-pointer"
      disabledClassName="opacity-50 cursor-not-allowed"
      forcePage={currentPage}
    />
  );
};

export default Pagination;
