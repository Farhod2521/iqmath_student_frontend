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
      containerClassName="pagination flex items-center space-x-2"
      pageClassName=" border rounded-full cursor-pointer text-[17px] text-gray-600 flex items-center justify-center min-w-[40px] min-h-[40px] select-none w-[40px] h-[40px] pointer-events-auto"
      activeClassName="bg-gray-200 font-bold text-black"
      previousClassName="p-[7px] border rounded-full cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] select-none w-[40px] h-[40px] pointer-events-auto"
      nextClassName="p-[7px] border rounded-full cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] select-none w-[40px] h-[40px] pointer-events-auto"
      disabledClassName="opacity-50 cursor-not-allowed"
      forcePage={currentPage}
    />
  );
};

export default Pagination;
