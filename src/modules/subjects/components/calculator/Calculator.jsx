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
      if (!mathFieldRefs.current) {
        return
      }
      
      if (!mathFieldRefs.current[selectedQuestion.id]) {
        setTimeout(() => {
          if (mathFieldRefs.current && mathFieldRefs.current[selectedQuestion.id]) {
            handleInsertSymbol(symbol)
          } else {
            setTimeout(() => {
              if (mathFieldRefs.current && mathFieldRefs.current[selectedQuestion.id]) {
                handleInsertSymbol(symbol)
              }
            }, 500)
          }
        }, 200)
        return
      }
      
      let mathField = mathFieldRefs.current[selectedQuestion.id][activeInputId]
      
      if (!mathField) {
        const availableRefs = mathFieldRefs.current[selectedQuestion.id]
        const availableRefKeys = Object.keys(availableRefs)
        
        if (availableRefKeys.length > 0) {
          const firstAvailableRef = availableRefKeys[0]
          mathField = availableRefs[firstAvailableRef]
        } else {
          setTimeout(() => {
            if (mathFieldRefs.current && mathFieldRefs.current[selectedQuestion.id]) {
              const retryRefs = mathFieldRefs.current[selectedQuestion.id]
              const retryKeys = Object.keys(retryRefs)
              if (retryKeys.length > 0) {
                const retryMathField = retryRefs[retryKeys[0]]
                if (retryMathField) {
                  retryMathField.write(symbol)
                  retryMathField.focus()
                  const newLatex = retryMathField.latex()
                  setCompositeAnswers((prev) => ({
                    ...prev,
                    [selectedQuestion.id]: {
                      ...(prev[selectedQuestion.id] || {}),
                      [retryKeys[0]]: newLatex
                    }
                  }))
                }
              }
            }
          }, 1000)
          return
        }
      }
      
      if (mathField) {
        mathField.write(symbol)
        mathField.focus()
        const newLatex = mathField.latex()
        
        const targetInputId = mathFieldRefs.current[selectedQuestion.id][activeInputId] ? activeInputId : Object.keys(mathFieldRefs.current[selectedQuestion.id])[0]
        
        setCompositeAnswers((prev) => ({
          ...prev,
          [selectedQuestion.id]: {
            ...(prev[selectedQuestion.id] || {}),
            [targetInputId]: newLatex
          }
        }))
      } else {
        const subQuestionIds = selectedQuestion?.sub_questions?.map(q => q.id) || []
        
        if (subQuestionIds.length > 0) {
          const firstSubQuestionId = subQuestionIds[0]
          
          if (!mathFieldRefs.current[selectedQuestion.id]) {
            mathFieldRefs.current[selectedQuestion.id] = {}
          }
          
          const fallbackMathField = mathFieldRefs.current[selectedQuestion.id][firstSubQuestionId]
          if (fallbackMathField) {
            fallbackMathField.write(symbol)
            fallbackMathField.focus()
            const newLatex = fallbackMathField.latex()
            setCompositeAnswers((prev) => ({
              ...prev,
              [selectedQuestion.id]: {
                ...(prev[selectedQuestion.id] || {}),
                [firstSubQuestionId]: newLatex
              }
            }))
          } else {
            setTimeout(() => {
              if (mathFieldRefs.current && mathFieldRefs.current[selectedQuestion.id]) {
                const retryMathField = mathFieldRefs.current[selectedQuestion.id][firstSubQuestionId]
                if (retryMathField) {
                  retryMathField.write(symbol)
                  retryMathField.focus()
                  const newLatex = retryMathField.latex()
                  setCompositeAnswers((prev) => ({
                    ...prev,
                    [selectedQuestion.id]: {
                      ...(prev[selectedQuestion.id] || {}),
                      [firstSubQuestionId]: newLatex
                    }
                  }))
                }
              }
            }, 300)
          }
        }
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
