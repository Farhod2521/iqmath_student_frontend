import React, { useState } from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'

import Symbols from '@/components/mathSymbols'

addStyles()

const MathKeyboard = () => {
  const [formula, setFormula] = useState('')

  function handleChange(mathField) {
    setFormula(mathField.latex())
  }

  function handleInsertSymbol(symbol) {
    setFormula((oldFormula) => oldFormula + symbol)
  }

  return (
    <div className="w-full">
      <EditableMathField
        latex={formula}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '70px',

          placeContent: 'center',
          fontSize: '24px',
          borderRadius: '8px'
        }}
      />

      <div className=" mt-[50px]">
        <Symbols onClick={handleInsertSymbol} />
      </div>
    </div>
  )
}

export default MathKeyboard
