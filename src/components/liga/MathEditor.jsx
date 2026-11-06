import { useEffect, useRef } from 'react'
import { addStyles } from 'react-mathquill'
import { MATH_FIELD_CONFIG } from './mathConfig'

addStyles()

// Formula yonida kursor tura olishi uchun ko'rinmas belgi
const GAP = '​'
const DELIMITED = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]|\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g
const COMMAND = /\\[a-zA-Z]+(?:\[[^\]]*\])?/g

const splitBy = (text, pattern, pick) => {
  const parts = []
  let last = 0
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) })
    parts.push({ math: pick(match).trim() })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}

// Ichma-ich kasrning chuqurligi cheklanmagan: regex emas, qavslar sanaladi
const closeBrace = (text, open) => {
  let depth = 0
  for (let index = open; index < text.length; index += 1) {
    if (text[index] === '\\') index += 1
    else if (text[index] === '{') depth += 1
    else if (text[index] === '}') depth -= 1
    if (!depth) return index + 1
  }
  return open
}

/** Buyruqdan keyingi {..} guruhlari va ^, _ qo'shimchalari qayerda tugashini topadi */
const commandEnd = (text, start) => {
  let end = start
  while (text[end] === '{') {
    const next = closeBrace(text, end)
    if (next === end) return end
    end = next
  }
  while (text[end] === '^' || text[end] === '_') {
    const next = text[end + 1] === '{' ? closeBrace(text, end + 1) : end + 2
    if (next <= end + 1 || !/[\w}]/.test(text[next - 1] || '')) return end
    end = next
  }
  return end
}

/** Belgisiz yozilgan "\frac{1}{2}" kabi kodlarni matndan ajratadi */
const splitBare = (text) => {
  const parts = []
  let last = 0
  for (const match of text.matchAll(COMMAND)) {
    if (match.index < last) continue
    const end = commandEnd(text, match.index + match[0].length)
    if (match.index > last) parts.push({ text: text.slice(last, match.index) })
    parts.push({ math: text.slice(match.index, end).trim() })
    last = end
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}

/** "Hisoblang \( \frac{1}{2} \)" kabi matnni oddiy matn va formula bo'laklariga ajratadi */
const splitMath = (text) =>
  splitBy(text, DELIMITED, (match) => match.slice(1).find(Boolean)).flatMap((part) =>
    part.text ? splitBare(part.text) : [part]
  )

const serialize = (node) =>
  [...node.childNodes]
    .map((child, index) => {
      if (child.nodeType === Node.TEXT_NODE) return child.nodeValue.replaceAll(GAP, '').replaceAll(' ', ' ')
      if (child.classList?.contains('liga-math')) {
        const latex = child.mathField?.latex()
        return latex ? `\\( ${latex} \\)` : ''
      }
      if (child.nodeName === 'BR') return '\n'
      return `${index ? '\n' : ''}${serialize(child)}`
    })
    .join('')

/**
 * Matn va formulalar bir joyda yoziladigan maydon: kasr kod bo'lib emas, kasr bo'lib ko'rinadi.
 * Tashqariga "\( ... \)" ko'rinishidagi oddiy matn beradi. Tozalash uchun key almashtiriladi.
 */
const MathEditor = ({ value = '', placeholder, single = false, className = '', onChange, onActive, onReady }) => {
  const root = useRef(null)
  const range = useRef(null)
  const activeMath = useRef(null)
  const started = useRef(false)
  const handlers = useRef({})
  handlers.current = { onChange, onActive, onReady }

  const emit = () => {
    if (!root.current) return
    const text = serialize(root.current).trim()
    root.current.dataset.empty = String(!text)
    handlers.current.onChange?.(text)
  }

  const saveRange = () => {
    const selection = window.getSelection()
    const node = selection.anchorNode
    const element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement
    if (selection.rangeCount && root.current?.contains(node) && !element.closest('.liga-math')) {
      range.current = selection.getRangeAt(0).cloneRange()
    }
  }

  const setCaret = (place) => {
    const next = document.createRange()
    place(next)
    next.collapse(true)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(next)
    range.current = next.cloneRange()
  }

  const leaveMath = (span, direction) => {
    root.current.focus()
    setCaret((next) => (direction < 0 ? next.setStartBefore(span) : next.setStartAfter(span)))
  }

  const insertNode = (node) => {
    let target = range.current
    if (!target || !root.current.contains(target.startContainer)) {
      target = document.createRange()
      target.selectNodeContents(root.current)
      target.collapse(false)
    }
    target.deleteContents()
    target.insertNode(node)
    target.setStartAfter(node)
    target.collapse(true)
    range.current = target
  }

  const insertMath = (latex) => {
    const MQ = window.MathQuill.getInterface(2)
    const span = document.createElement('span')
    span.className = 'liga-math'
    span.contentEditable = 'false'

    insertNode(document.createTextNode(GAP))
    insertNode(span)
    insertNode(document.createTextNode(GAP))

    span.mathField = MQ.MathField(span, {
      ...MATH_FIELD_CONFIG,
      handlers: {
        edit: emit,
        enter: () => leaveMath(span, 1),
        moveOutOf: (direction) => leaveMath(span, direction === MQ.L ? -1 : 1),
        deleteOutOf: () => {
          if (span.mathField.latex()) return
          leaveMath(span, -1)
          span.remove()
          emit()
        }
      }
    })
    if (latex) span.mathField.latex(latex)
    return span
  }

  // MathQuill o'qiy olmagan kod matn bo'lib qoladi: o'quvchida baribir formula chiqadi
  const insertParts = (parts) => {
    parts.forEach((part) => {
      if (part.text) {
        insertNode(document.createTextNode(single ? part.text.replace(/\s*\n\s*/g, ' ') : part.text))
        return
      }
      const span = insertMath(part.math)
      if (!span.mathField.latex()) {
        span.replaceWith(document.createTextNode(`\\( ${part.math} \\)`))
      }
    })
  }

  const api = useRef({
    connected: () => Boolean(root.current?.isConnected),
    command: (run) => {
      saveRange()
      const span = activeMath.current?.isConnected ? activeMath.current : insertMath('')
      run(span.mathField)
      span.mathField.focus()
      emit()
    }
  })

  useEffect(() => {
    if (started.current) return
    started.current = true
    insertParts(splitMath(value))
    root.current.dataset.empty = String(!value)
    handlers.current.onReady?.(api.current)
    // Maydon faqat birinchi ochilganda to'ldiriladi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const insideMath = (event) => Boolean(event.target.closest?.('.liga-math'))

  return (
    <div
      ref={root}
      role="textbox"
      aria-multiline={!single}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onFocus={(event) => {
        activeMath.current = event.target.closest?.('.liga-math') || null
        handlers.current.onActive?.(api.current)
      }}
      onInput={emit}
      onKeyUp={saveRange}
      onMouseUp={saveRange}
      onKeyDown={(event) => {
        if (single && event.key === 'Enter' && !insideMath(event)) event.preventDefault()
      }}
      onDrop={(event) => event.preventDefault()}
      onPaste={(event) => {
        if (insideMath(event)) return
        event.preventDefault()
        saveRange()
        insertParts(splitMath(event.clipboardData.getData('text/plain')))
        const { startContainer, startOffset } = range.current
        root.current.focus()
        setCaret((next) => next.setStart(startContainer, startOffset))
        emit()
      }}
      className={`whitespace-pre-wrap break-words outline-none [&_.mq-editable-field]:rounded [&_.mq-editable-field]:border-[#DCE6FA] [&_.mq-editable-field]:px-1 data-[empty=true]:before:pointer-events-none data-[empty=true]:before:text-[#9CA3AF] data-[empty=true]:before:content-[attr(data-placeholder)] ${className}`}
    />
  )
}

export default MathEditor
