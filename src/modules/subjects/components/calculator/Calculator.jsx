import React from 'react'
import { motion } from 'framer-motion'
import Symbols from './MathSymbols'

function Calculator({
  selectedQuestion,
  setCompositeAnswers,
  setTextAnswers,
  activeInputId,
  mathFieldRef,
  mathFieldRefs
}) {
  const handleInsertSymbol = (symbol) => {
    if (selectedQuestion?.question_type === 'text') {
      const mathField = mathFieldRef.current
      if (mathField) {
        mathField.write(symbol)
        mathField.focus()
        const newLatex = mathField.latex()
        setTextAnswers((prev) => ({
          ...prev,
          [selectedQuestion.id]: newLatex
        }))
      }
    } else if (selectedQuestion?.question_type === 'composite' && activeInputId) {
      if (!mathFieldRefs.current || !mathFieldRefs.current[selectedQuestion.id]) {
        return
      }
      
      let mathField = mathFieldRefs.current[selectedQuestion.id][activeInputId]
      
      // Agar activeInputId uchun field topilmasa, birinchi mavjud field-ni ishlatamiz
      if (!mathField) {
        const availableRefs = mathFieldRefs.current[selectedQuestion.id]
        const availableRefKeys = Object.keys(availableRefs)
        
        if (availableRefKeys.length > 0) {
          const firstAvailableRef = availableRefKeys[0]
          mathField = availableRefs[firstAvailableRef]
        }
      }
      
      if (mathField) {
        mathField.write(symbol)
        mathField.focus()
        const newLatex = mathField.latex()
        
        // Qaysi input uchun javob saqlashni aniqlash
        const targetInputId = mathFieldRefs.current[selectedQuestion.id][activeInputId] ? 
          activeInputId : 
          Object.keys(mathFieldRefs.current[selectedQuestion.id])[0]
        
        setCompositeAnswers((prev) => ({
          ...prev,
          [selectedQuestion.id]: {
            ...(prev[selectedQuestion.id] || {}),
            [targetInputId]: newLatex
          }
        }))
      }
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
