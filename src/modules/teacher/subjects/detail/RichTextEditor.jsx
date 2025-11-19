// components/subject-detail/QuestionModal/RichTextEditor.jsx
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor), {
  ssr: false
})

let ClassicEditor
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

const editorConfig = {
  toolbar: [
    'bold', 'italic', 'strikethrough', '|',
    'bulletedList', 'numberedList', 'outdent', 'indent', 'blockQuote', '|',
    'imageUpload', 'table', 'specialCharacters', '|',
    'link', 'unlink', '|',
    'maximize', 'sourceEditing', '|',
    'undo', 'redo'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !ClassicEditor) return null

  return (
    <div style={{ minHeight: '200px' }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
        config={editorConfig}
      />
    </div>
  )
}

export default RichTextEditor