import { useRef, useState } from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import { MATH_FIELD_CONFIG } from './mathConfig'

addStyles()

// [yozuv, MathQuill buyrug'i]: telefonda klaviaturada bu belgilar yo'q
const KEYS = [
  ['a/b', (field) => field.cmd('\\frac')],
  ['√', (field) => field.cmd('\\sqrt')],
  ['xⁿ', (field) => field.cmd('^')],
  ['π', (field) => field.write('\\pi')]
]

/** O'quvchi javobi: kasr va ildiz formula bo'lib yoziladi, serverga LaTeX ketadi */
const MathAnswerField = ({ value, label, onSave }) => {
  const field = useRef(null)
  const [initial] = useState(value)

  const commit = () => {
    const latex = field.current?.latex().trim()
    if (latex && latex !== value) onSave(latex)
  }

  return (
    <div className="mt-5 select-text" onBlur={commit}>
      <p className="mb-1.5 text-sm text-[#64748B]">{label}</p>
      <EditableMathField
        latex={initial}
        config={MATH_FIELD_CONFIG}
        mathquillDidMount={(mathField) => {
          field.current = mathField
        }}
        style={{ display: 'flex', alignItems: 'center', width: '100%', minHeight: 56, padding: '8px 14px', fontSize: 20, borderRadius: 12, border: '1px solid #EBEDF0' }}
      />
      <div className="mt-2 flex gap-1.5">
        {KEYS.map(([title, run]) => (
          <button
            key={title}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              run(field.current)
              field.current.focus()
            }}
            className="h-9 min-w-11 rounded-lg bg-[#F1F4F9] px-2.5 text-sm font-semibold text-[#191C1D] transition hover:bg-[#E6EBF5]"
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MathAnswerField
