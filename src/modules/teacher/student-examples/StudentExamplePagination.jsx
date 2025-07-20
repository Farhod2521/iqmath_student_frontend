import Pagination from '@/components/pagination'
import React from 'react'

function StudentExamplePagination({ pagination, onPageChange, onPageSizeChange, isLoading }) {
  const { current, limit, total, totalPages } = pagination

  const handlePageChange = ({ selected }) => {
    onPageChange(selected)
  }

  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value))
  }

  const startItem = (current - 1) * limit + 1
  const endItem = Math.min(current * limit, total)

  return (
    <div className="flex justify-between items-center mt-[36px]">
      <div className="relative inline-block">
        <select
          className="appearance-none bg-white border border-gray-300 rounded-[8px] px-[16px] py-[9px] w-40 text-black text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={limit}
          onChange={handlePageSizeChange}
          disabled={isLoading}
        >
          <option value={100}>Показать по 100</option>
          <option value={200}>Показать по 200</option>
          <option value={300}>Показать по 300</option>
          <option value={400}>Показать по 400</option>
          <option value={500}>Показать по 500</option>
          <option value={1000}>Показать по 1000</option>
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none rotate-90 ">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6169 10L7.1678 5.0814C6.94407 4.83401 6.94407 4.43292 7.1678 4.18554C7.39153 3.93815 7.75428 3.93815 7.97801 4.18554L12.8322 9.55207C13.0559 9.79945 13.0559 10.2005 12.8322 10.4479L7.97801 15.8145C7.75428 16.0618 7.39153 16.0618 7.1678 15.8145C6.94407 15.5671 6.94407 15.166 7.1678 14.9186L11.6169 10Z"
              fill={'#000'}
            />
          </svg>
        </div>
      </div>

      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        currentPage={current - 1}
        disabled={isLoading}
      />

      <div>
        <p className="text-[15px] text-[#8a8a8e]">
          {total > 0 ? `Показаны ${startItem}-${endItem} из ${total} элементов` : 'Нет данных'}
        </p>
      </div>
    </div>
  )
}

export default StudentExamplePagination
