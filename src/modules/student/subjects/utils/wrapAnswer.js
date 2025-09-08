
const formatValue = (value) => {
  return value
    .replace(/\\varnothing/g, '\\emptyset')          
    .replace(/\\pm(\d+)/g, '\\pm $1')               
    .replace(/\\pm\\frac/g, '\\pm \\frac')          
    .replace(/\\pm(\d+)\\frac/g, '\\pm $1 \\frac')    
}

const addWrapper = (value, needsSpacing = false) => {
  return needsSpacing ? `\\( ${value} \\)` : `\\(${value}\\)`
}

export const wrapMathAnswer = (value) => {
  if (!value?.trim()) return ''
  
  const formatted = formatValue(value.trim())
  return addWrapper(formatted)
}

export const wrapPlainMath = (value) => {
  if (!value?.trim()) return ''
  
  const formatted = formatValue(value.trim())
  
  if (formatted.startsWith('\\pm')) {
    return addWrapper(formatted, true)
  }
  
  const isSimpleNumber = /^-?\d+(\.\d+)?$/.test(formatted)
  const needsWrapper = /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div|emptyset)\b/.test(formatted) || 
                      (/[x^+\-=0-9]/.test(formatted) && !isSimpleNumber)
  
  return needsWrapper ? addWrapper(formatted) : formatted
}
