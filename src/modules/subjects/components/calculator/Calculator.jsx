import React from 'react'
import { motion } from 'framer-motion'
import Symbols from './MathSymbols'

function Calculator({ selectedQuestion, setCompositeAnswers, setTextAnswers, activeInputId, mathFieldRef }) {
  const handleInsertSymbol = (symbol) => {
    const mathField = mathFieldRef.current

    if (selectedQuestion?.question_type === 'text') {
      if (mathField) {
        mathField.write(symbol)
        mathField.focus()
        setTextAnswers((prev) => ({
          ...prev,
          [selectedQuestion.id]: mathField.latex()
        }))
      }
    } else if (selectedQuestion?.question_type === 'composite' && activeInputId) {
      setCompositeAnswers((prev) => ({
        ...prev,
        [selectedQuestion.id]: {
          ...(prev[selectedQuestion.id] || {}),
          [activeInputId]: (prev[selectedQuestion.id]?.[activeInputId] || '') + symbol
        }
      }))
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="mt-6 flex items-center justify-center"
      >
        <Symbols onClick={handleInsertSymbol} />
      </motion.div>
    </div>
  )
}

export default Calculator
