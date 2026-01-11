// components/subject-detail/QuestionModal/ImageChoiceInput.jsx
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const ImageChoiceInput = ({ correctAnswer, imageUrls, onChange, optionCount = 4 }) => {
  const { data: session } = useSession()
  const [selectedCount, setSelectedCount] = useState(optionCount)
  const [uploadingStates, setUploadingStates] = useState({})

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  useEffect(() => {
    setSelectedCount(optionCount)
  }, [optionCount])

  const uploadImageToServer = async (file, letter) => {
    try {
      setUploadingStates((prev) => ({ ...prev, [letter]: true }))

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('https://api.iqmath.uz/api/v1/management/upload-file/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Rasm yuklashda xatolik')
      }

      const data = await response.json()

      if (data.file_url) {
        onChange('imageUrls', { ...imageUrls, [letter]: data.file_url })
        toast.success(`${letter} variant rasmi yuklandi`)
      }
    } catch (error) {
      toast.error(error.message || 'Rasm yuklashda xatolik')
    } finally {
      setUploadingStates((prev) => ({ ...prev, [letter]: false }))
    }
  }

  const handleFileSelect = (letter, file) => {
    if (file) {
      uploadImageToServer(file, letter)
    }
  }

  const handlePaste = (letter, e) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault()
        const blob = items[i].getAsFile()
        if (blob) {
          const file = new File([blob], `pasted-${letter}-${Date.now()}.png`, { type: blob.type })
          uploadImageToServer(file, letter)
        }
        return
      }
    }
  }
  // /management/upload-file-delete/2
  // shu qsmda ozgarish qilish kerak

  const deleteImageFromServer = async (fileId) => {
    const response = await fetch(`https://api.iqmath.uz/api/v1/management/upload-file-delete/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Rasmni o‘chirishda xatolik')
    }
  }

  const extractFileId = (url) => {
    const match = url.match(/-(\d+)\.png$/)
    return match ? match[1] : null
  }

  const handleRemoveImage = async (letter) => {
    try {
      const imageData = imageUrls?.[letter]
      if (!imageData) return

      const fileId = extractFileId(imageData)
      if (!fileId) {
        toast.error('File ID topilmadi')
        return
      }
      await deleteImageFromServer(fileId)

      const updatedUrls = { ...imageUrls }
      delete updatedUrls[letter]

      onChange('imageUrls', updatedUrls)
      toast.success(`Variant rasmi o‘chirildi`)
    } catch (error) {
      toast.error(error.message || 'Rasmni o‘chirishda xatolik')
    }
  }

  const handleAddOption = () => {
    if (selectedCount >= 7) {
      toast.error('Maksimal 7 ta variant')
      return
    }
    const newCount = selectedCount + 1
    setSelectedCount(newCount)
    onChange('imageOptionCount', newCount)
  }

  const handleRemoveOption = () => {
    if (selectedCount <= 2) {
      toast.error('Minimal 2 ta variant')
      return
    }

    const lastLetter = LETTERS[selectedCount - 1]
    if (imageUrls[lastLetter]) {
      handleRemoveImage(lastLetter)
    }
    if (correctAnswer === lastLetter) {
      onChange('correctImageAnswer', '')
    }

    const newCount = selectedCount - 1
    setSelectedCount(newCount)
    onChange('imageOptionCount', newCount)
  }

  return (
    <div className="px-4 space-y-4">
      {LETTERS.slice(0, selectedCount).map((letter) => (
        <div key={letter} className="p-4 transition-colors border-2 border-gray-200 rounded-lg hover:border-blue-300">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="radio"
              name="correctImageAnswer"
              checked={correctAnswer === letter}
              onChange={() => onChange('correctImageAnswer', letter)}
              className="w-4 h-4"
            />
            <span className="text-lg font-semibold">{letter} varianti</span>
            {correctAnswer === letter && (
              <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">To&apos;g&apos;ri</span>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Ctrl+V bosib rasm joylashtiring yoki pastdagi tugmani bosing"
              onPaste={(e) => handlePaste(letter, e)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />

            <label className="block">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={(e) => handleFileSelect(letter, e.target.files?.[0])}
                disabled={uploadingStates[letter]}
                className="w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            </label>

            {uploadingStates[letter] && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                <div className="w-4 h-4 border-2 border-blue-600 rounded-full animate-spin border-t-transparent" />
                <span className="text-sm text-blue-700">Yuklanmoqda...</span>
              </div>
            )}

            {!uploadingStates[letter] && imageUrls[letter] && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="flex-1 text-sm text-green-700">Yuklandi</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(letter)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative w-full h-40 overflow-hidden bg-gray-100 rounded-lg">
                  <img src={imageUrls[letter]} alt={`${letter} variant`} className="object-contain w-full h-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Variant qo'shish/o'chirish */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleRemoveOption}
          disabled={selectedCount <= 2}
          className="px-4 py-2 text-sm text-red-600 rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          - Variant o&apos;chirish
        </button>
        <span className="text-sm text-gray-600">{selectedCount} ta</span>
        <button
          type="button"
          onClick={handleAddOption}
          disabled={selectedCount >= 7}
          className="px-4 py-2 text-sm text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Variant qo&apos;shish
        </button>
      </div>

      {/* Eslatma */}
      <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Maslahat:</span> Input maydoniga bosib Ctrl+V (yoki Cmd+V) tugmalarini bosing
          yoki pastdagi tugma orqali faylni tanlang. Rasm avtomatik yuklanadi.
        </p>
      </div>
    </div>
  )
}

export default ImageChoiceInput
