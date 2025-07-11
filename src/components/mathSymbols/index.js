import { MathSymbol } from 'brainly-style-guide'
import { texSymbols } from '@/dummy-data/texSymbols.js'

const availableMathSymbols = [
  'alpha',
  'beta',
  'pi',
  'power',
  'squere-root',
  'nth-root',
  'division',
  'subscript',
  'less-then-or-equal',
  'greater-then-or-equal',
  'inequality',
  'system-equations',
  'integral',
  'limit',
  'matrix',
  'fraction',
  'equation-system',
  'empty-set'
]

export default function Symbols({ onClick }) {
  return (
    <div className="grid grid-cols-8 gap-2 p-2 max-w-[500px]">
      {texSymbols.map((symbol) => (
        <button
          type="button"
          key={symbol.icon}
          className={`tex-button p-[5px] rounded-[6px] col-span-1 ${
            ['+', '-', '*', '/'].includes(symbol.icon) ? 'bg-[#FF9500] text-white' : 'bg-[#F5F6F8]'
          }`}
          onClick={() => onClick(symbol.data)}
        >
          {availableMathSymbols.includes(symbol.icon) ? (
            <MathSymbol type={symbol.icon} size="small" />
          ) : (
            <span className="text-lg font-medium tex-button">{symbol.icon}</span>
          )}
        </button>
      ))}
    </div>
  )
}
