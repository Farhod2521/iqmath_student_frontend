import React from 'react'
import { MathSymbol } from 'brainly-style-guide'
import { symbolsList } from './symbolsList'

const availableMathSymbols = ['²']

const MathSymbols = ({ onClick }) => {
  return (
    <div className="grid  sm:grid-cols-10 grid-cols-7 gap-1 sm:min-w-[500px] min-w-[360px] ">
      {symbolsList?.map((symbol, idx) => {
        return (
          <button
            key={idx}
            type="button"
            className={`symbol-button flex-1 py-2 rounded-md text-center bg-gray-100 text-gray-800`}
            onClick={() => onClick(symbol.data)}
          >
            <span className="text-lg font-medium">{symbol.icon}</span>
          </button>
        )
      })}
    </div>
  )
}

export default MathSymbols
