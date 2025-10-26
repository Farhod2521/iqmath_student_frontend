

// -------------------- Math answer formatting utils --------------------

/** Delimiterlarni ( \( ... \), \[ ... \], $...$, $$...$$ ) olib tashlash */
const stripDelimiters = (raw) => {
  let s = raw.trim()

  // $$ ... $$
  if (/^\s*\$\$[\s\S]*\$\$\s*$/.test(s)) {
    s = s.replace(/^\s*\$\$\s*([\s\S]*?)\s*\$\$\s*$/, '$1')
  }
  // $ ... $
  if (/^\s*\$[\s\S]*\$\s*$/.test(s)) {
    s = s.replace(/^\s*\$\s*([\s\S]*?)\s*\$\s*$/, '$1')
  }
  // \[ ... \]
  if (/^\s*\\\[[\s\S]*\\\]\s*$/.test(s)) {
    s = s.replace(/^\s*\\\[\s*([\s\S]*?)\s*\\\]\s*$/, '$1')
  }
  // \( ... \)
  if (/^\s*\\\([\s\S]*\\\)\s*$/.test(s)) {
    s = s.replace(/^\s*\\\(\s*([\s\S]*?)\s*\\\)\s*$/, '$1')
  }

  return s.trim()
}

/** Oddiy tozalash/normalizatsiya: unicode minus, bo'shliqlar, notekis buyruqlar */
const normalizeLatex = (raw) => {
  let s = stripDelimiters(raw)

  // Unicode minus/dashlarni normal minusga
  s = s
    .replace(/\u2212|\u2012|\u2013|\u2014/g, '-') // minus, figure, en, em dash → '-'

  // Bo'sh joylarni qisqa qilish
  s = s.replace(/[ \t]+/g, ' ').trim()

  // Tez-tez uchraydigan aliaslarni birxillashtirish
  s = s
    .replace(/\\varnothing\b/g, '\\emptyset')
    .replace(/\\le\b/g, '\\leq') // \le → \leq
    .replace(/\\ge\b/g, '\\geq') // \ge → \geq

  // \pm dan keyin bitta bo'shliq bo'lishi (agar keyingi token \, {, digit, (, \frac va h.k.)
  // 1) \pm dan keyin hech bo'shliq yo'q bo'lsa — qo'shamiz
  s = s.replace(/(\\pm)(?=\S)/g, '$1 ')        // \pm3, \pm\frac → "\pm 3", "\pm \frac"
  // 2) \pm   3 → \pm 3 (ortiqcha bo'shliqlarni bitta qilamiz)
  s = s.replace(/(\\pm)\s+/g, '$1 ')

  // Keraksiz tashqi qavslar (faqat juda oddiy holat): (x) → x
  s = s.replace(/^\(([^()]+)\)$/g, '$1')

  return s.trim()
}

/** Allaqachon o'ralganmi? */
const isWrapped = (value) => {
  const v = value.trim()
  return (
    (/^\\\([\s\S]*\\\)$/.test(v)) || // \( ... \)
    (/^\\\[[\s\S]*\\\]$/.test(v)) || // \[ ... \]
    (/^\$[\s\S]*\$$/.test(v)) ||     // $ ... $
    (/^\$\$[\s\S]*\$\$$/.test(v))    // $$ ... $$
  )
}

/** Inline wrapper */
const addWrapper = (value, withSpaces = false) => {
  return withSpaces ? `\\( ${value} \\)` : `\\(${value}\\)`
}

/** Oddiy sonmi? (butun/haqiqiy/ilmiy) */
const isSimpleNumber = (s) => {
  // +3, -3, 3.14, +.5, -.5, 1e-3, -2.5E+10
  return /^[+\-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+\-]?\d+)?$/.test(s)
}

/** Ifodami? Wrapper talab qiladimi? */
const needsWrapper = (s) => {
  if (!s) return false
  if (isSimpleNumber(s)) return false

  // Agar LaTeX komandasi, matematik operatorlar, slashli kasr, daraja, indeks, oraliqlar, mantiqiy belgilar bo'lsa — o'raymiz.
  const latexTokens =
    /(\\(frac|sqrt|sum|prod|int|log|ln|sin|cos|tan|cot|sec|csc|pi|theta|alpha|beta|gamma|infty|emptyset|cdot|times|div|leq|geq|neq|approx|equiv|parallel|perp|angle|triangle|square|bigcirc|Rightarrow|rightarrow)\b)/
  const mathOps = /[+\-*/^_=<>]|\\{|\\}|\(|\)|\[|\]|,|;|:/
  const hasSlashFrac = /(^|[^\\])\d+\s*\/\s*\d+/.test(s) // 1/2 ko'rinish
  const hasCaretOrUnderscore = /[\^_]/.test(s)

  return latexTokens.test(s) || mathOps.test(s) || hasSlashFrac || hasCaretOrUnderscore
}

/** Public: text savollar uchun — doim o'raladi */
export const wrapMathAnswer = (value) => {
  const raw = (value ?? '').trim()
  if (!raw) return ''

  const formatted = normalizeLatex(raw)
  // Allaqachon o'ralgan bo'lsa, qayta o'ramaymiz
  if (isWrapped(raw)) return addWrapper(stripDelimiters(raw))

  return addWrapper(formatted)
}




/** Public: composite / plain maydonlar uchun — faqat kerak bo'lsa o'raladi */
export const wrapPlainMath = (value) => {
  const raw = (value ?? '').trim()
  if (!raw) return ''

  // Agar allaqachon o'ralgan bo'lsa, tozalab qayta o'ramaymiz (inline formatga keltiramiz)
  if (isWrapped(raw)) {
    const inner = normalizeLatex(raw) // strip + normalize
    return addWrapper(inner)
  }

  const formatted = normalizeLatex(raw)

  // \pm ... bo'lsa, ko‘pincha ifoda: \(...\) bilan o‘raymiz (va oxirida bo'shliq bo'lmaganiga qaraymiz)
  if (/^\\pm\b/.test(formatted)) {
    // \pm dan keyin minimal bitta bo'shliq bor — yuqorida normalize qildi
    return addWrapper(formatted, true)
  }

  // Oddiy son bo'lsa — wrapper yo'q
  if (isSimpleNumber(formatted)) {
    return formatted
  }

  // Ifoda bo'lsa — o'raymiz
  if (needsWrapper(formatted)) {
    return addWrapper(formatted)
  }

  // Default: soddaroq matn — o'rab yubormaymiz
  return formatted
}


