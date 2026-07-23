// components/subject-detail/QuestionModal/RichTextEditor.jsx
import { useEffect, useRef } from 'react'

let ClassicEditor
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

const editorConfig = {
  toolbar: [
    'bold',
    'italic',
    'strikethrough',
    '|',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    'blockQuote',
    '|',
    'imageUpload',
    'insertTable',
    '|',
    'link',
    '|',
    'undo',
    'redo'
  ],
  removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage'],
  image: {
    upload: {
      types: ['jpeg', 'png', 'gif', 'webp']
    }
  },
  height: '200px',
  minHeight: '200px'
}

const RichTextEditor = ({ value, onChange }) => {
  const editorElementRef = useRef(null)
  const editorInstanceRef = useRef(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!ClassicEditor || !editorElementRef.current) return undefined

    let isMounted = true

    ClassicEditor.create(editorElementRef.current, {
      ...editorConfig,
      initialData: value || ''
    })
      .then((editor) => {
        if (!isMounted) {
          editor.destroy()
          return
        }

        editorInstanceRef.current = editor
        editor.model.document.on('change:data', () => {
          onChangeRef.current(editor.getData())
        })
      })
      .catch((error) => {
        console.error('CKEditor initialization error:', error)
      })

    return () => {
      isMounted = false

      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy().catch((error) => {
          console.error('CKEditor destroy error:', error)
        })
        editorInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const editor = editorInstanceRef.current

    if (editor && value !== editor.getData()) {
      editor.setData(value || '')
    }
  }, [value])

  return (
    <div className="ck-editor-wrapper" style={{ minHeight: '200px' }}>
      <div ref={editorElementRef} />
    </div>
  )
}

export default RichTextEditor
