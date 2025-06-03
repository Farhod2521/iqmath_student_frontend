export const wrapMathAnswer = (value) => {
  const trimmed = value.trim()
  return /^\d+(\.\d+)?$/.test(trimmed) ||
    /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div)\b/.test(trimmed)
    ? `\\(${trimmed}\\)`
    : `\\(${trimmed}\\)`
}

export const wrapPlainMath = (value) => {
  const trimmed = value.trim()
  return /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div)\b/.test(trimmed) ? `\\(${trimmed}\\)` : trimmed
}
