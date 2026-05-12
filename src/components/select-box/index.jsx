import RightIcon from '../icons/right'

const SelectBox = ({ label = 'Tanlang', options = [], value, onChange, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        className="w-full px-4 py-2 pr-10 text-sm text-gray-800 transition-all duration-200 bg-white border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {label}
        </option>
        {options?.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Right icon */}
      <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
        <RightIcon classname="w-4 h-4 text-gray-400 rotate-90" />
      </div>
    </div>
  )
}

export default SelectBox
