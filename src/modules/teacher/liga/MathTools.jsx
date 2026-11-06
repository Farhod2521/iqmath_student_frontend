import { useEffect, useState } from 'react'
import { MathJax } from 'better-react-mathjax'
import { ImagePlus, X } from 'lucide-react'
import toast from 'react-hot-toast'

export const MATH_CONFIG = { loader: { load: ['input/tex', 'output/chtml'] } }

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

// [yozuv, MathQuill buyrug'i]
const TOOLS = [
  ['a/b', (field) => field.cmd('\\frac')],
  ['√x', (field) => field.cmd('\\sqrt')],
  ['xⁿ', (field) => field.cmd('^')],
  ['xₙ', (field) => field.cmd('_')],
  ['π', (field) => field.cmd('\\pi')],
  ['sin', (field) => field.typedText('sin')],
  ['cos', (field) => field.typedText('cos')],
  ['tg', (field) => field.typedText('tg')],
  ['ctg', (field) => field.typedText('ctg')],
  ['log', (field) => field.typedText('log').cmd('_')],
  ['°', (field) => field.write('^{\\circ}')],
  ['·', (field) => field.cmd('\\cdot')],
  ['±', (field) => field.cmd('\\pm')],
  ['≤', (field) => field.cmd('\\le')],
  ['≥', (field) => field.cmd('\\ge')],
  ['≠', (field) => field.cmd('\\ne')]
]

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Maydon matni HTML sifatida saqlanadi: "a < b" teg bo'lib qolmasligi kerak */
export const toQuestionHtml = (text) => escapeHtml(text).replace(/\n/g, '<br>')

/** To'g'ri javob ko'rinishi: LaTeX bo'lsa formula, oddiy matn bo'lsa o'zi */
export const answerHtml = (answer) => {
  const safe = escapeHtml(answer || '')
  return safe.includes('\\') && !safe.includes('\\(') ? `\\(${safe}\\)` : safe
}

export const MathHtml = ({ html, inline = false, className = '' }) => (
  <MathJax dynamic inline={inline} hideUntilTypeset="first">
    {inline ? (
      <span className={className} dangerouslySetInnerHTML={{ __html: html || '' }} />
    ) : (
      <div className={className} dangerouslySetInnerHTML={{ __html: html || '' }} />
    )}
  </MathJax>
)

/** Formula tugmalari: oxirgi bosilgan maydonga yozadi */
export const MathToolbar = ({ getEditor }) => (
  <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#F5F8FD] p-2">
    <span className="px-1.5 text-sm font-semibold text-[#475569]">Formula:</span>
    {TOOLS.map(([title, run]) => (
      <button
        key={title}
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => getEditor()?.command(run)}
        className="h-8 min-w-9 rounded-lg border border-[#E8ECF3] bg-white px-2 text-sm font-semibold text-[#191C1D] transition hover:border-[#5D87FF] hover:text-[#5D87FF]"
      >
        {title}
      </button>
    ))}
  </div>
)

const useFileUrl = (file) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return undefined
    }
    const next = URL.createObjectURL(file)
    setUrl(next)
    return () => URL.revokeObjectURL(next)
  }, [file])

  return url
}

export const FileImage = ({ file, className = '' }) => {
  const url = useFileUrl(file)
  return url ? <img src={url} alt="" className={className} /> : null
}

/** Rasm tanlash: tanlangach kichik ko'rinishi va o'chirish tugmasi chiqadi */
export const ImagePick = ({ file, label, title, onChange }) => {
  const pick = (event) => {
    const [next] = event.target.files
    event.target.value = ''
    if (!next) return
    if (next.size > MAX_IMAGE_SIZE) {
      toast.error('Rasm hajmi 5 MB dan oshmasligi kerak')
      return
    }
    onChange(next)
  }

  if (file) {
    return (
      <span className="relative inline-flex h-10 w-10 shrink-0">
        <FileImage file={file} className="h-10 w-10 rounded-lg border border-[#E8ECF3] object-cover" />
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Rasmni olib tashlash"
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-white"
        >
          <X size={12} strokeWidth={3} />
        </button>
      </span>
    )
  }

  return (
    <label
      title={title || label}
      className="inline-flex h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#C9D8F5] px-2.5 text-sm font-semibold text-[#5D87FF] transition hover:bg-[#F5F8FD]"
    >
      <ImagePlus size={18} />
      {label}
      <input type="file" accept="image/*" onChange={pick} className="hidden" />
    </label>
  )
}
