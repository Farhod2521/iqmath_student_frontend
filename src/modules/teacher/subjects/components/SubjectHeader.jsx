import InfoCircleIcon from '@/components/icons/info-circle'
import WarningModal from '@/components/modal/warning-modal'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

function SubjectHeader() {
  const router = useRouter()
  const { topicId } = router.query
  const inputRef = useRef(null)
  const { data: session } = useSession()

  const [showWarning, setShowWarning] = useState(false)

  const onSubmitImportExcel = async (type) => {
    const formData = new FormData()
    formData.append('question_type', type)

    try {
      const response = await fetch(`https://api.iqmath.uz/api/v1/func_teacher/${type}-export/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}` // Token kerak bo'lsa
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error('Xatolik: ' + errorText)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `shablon_${type}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      toast.success('Fayl muvaffaqiyatli yuklab olindi')
    } catch (error) {
      toast.error('Xatolik yuz berdi: ' + error.message)
      console.error(error)
    }
  }

  // Fayl yuklash uchun input
  const handleClick = () => {
    inputRef.current.click() // Fayl tanlash oynasini ochadi
  }

  const onUploadExcel = async (file) => {
    const formData = new FormData()
    formData.append('file', file) // input name="file" bo'lishi kerak yoki backend bilan kelishilgan nom
    formData.append('topic_id', topicId)

    try {
      const response = await fetch(`https://api.iqmath.uz/api/v1/func_teacher/xlsx-import/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error('Xatolik: ' + errorText)
      }
      queryClient.invalidateQueries([KEYS.questionList])
      toast.success('Fayl muvaffaqiyatli yuklandi')
    } catch (error) {
      toast.error('Xatolik yuz berdi: ' + error.message)
      console.error(error)
    }
  }
  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) onUploadExcel(file)
  }
  const handleShowWarning = () => {
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 15000)
  }

  return (
    <div className="my-4 relative">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 lg:items-center
      overflow-x-auto lg:overflow-visible
      pb-2
    "
      >
        <button
          onClick={() => onSubmitImportExcel('text')}
          className="flex items-center gap-1 bg-[#00733B] hover:bg-[#00733bf1]
          active:scale-95 transition-all duration-200
          py-2 px-3 md:py-[9px] md:px-[20px]
          rounded-[8px]"
        >
          <Image src={'/icons/excel.svg'} alt="excel" width={20} height={20} className="md:w-[24px] md:h-[24px]" />
          <p className="text-[11px] md:text-sm font-gilroy text-white whitespace-nowrap">Test savollar</p>
        </button>

        <button
          onClick={() => onSubmitImportExcel('choice')}
          className="flex items-center gap-2 bg-[#00733B] hover:bg-[#00733bf1]
          active:scale-95 transition-all duration-200
          py-2 px-3 md:py-[9px] md:px-[20px]
          rounded-[8px]"
        >
          <Image src={'/icons/excel.svg'} alt="excel" width={20} height={20} className="md:w-[24px] md:h-[24px]" />
          <p className="text-[11px] md:text-sm font-gilroy text-white whitespace-nowrap"> Variantli savollar</p>
        </button>

        <button
          onClick={() => onSubmitImportExcel('composite')}
          className="flex items-center gap-2 bg-[#00733B] hover:bg-[#00733bf1]
          active:scale-95 transition-all duration-200
          py-2 px-3 md:py-[9px] md:px-[20px]
          rounded-[8px]"
        >
          <Image src={'/icons/excel.svg'} alt="excel" width={20} height={20} className="md:w-[24px] md:h-[24px]" />
          <p className="text-[11px] md:text-sm font-gilroy text-white whitespace-nowrap">Ko'p kiritmali savollar</p>
        </button>

        <input type="file" accept=".xlsx" ref={inputRef} onChange={onFileChange} className="hidden" />

        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-[#653BA0FF] hover:bg-[#7243B5FF]
          active:scale-95 transition-all duration-200
          py-2 px-3 md:py-[9px] md:px-[20px]
          rounded-[8px]"
        >
          <Image src={'/icons/excel.svg'} alt="excel" width={20} height={20} className="md:w-[24px] md:h-[24px]" />
          <p className="text-[11px] md:text-sm font-gilroy text-white whitespace-nowrap">Excel import</p>
        </button>

        <button onClick={handleShowWarning} className="flex-shrink-0 p-2">
          <InfoCircleIcon />
        </button>

        {showWarning && (
          <WarningModal
            classname="
            absolute top-12 left-1/2 -translate-x-1/2
            w-[90%] max-w-[351px] z-50
          "
          >
            <button onClick={() => setShowWarning(false)} className="float-right rounded">
              <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
            </button>
            <p className="text-sm text-gray-800">
              <b>
                <i>“Test savollar”, “Variantli savollar” va “Ko'p kiritmali savollar”</i>
              </b>{' '}
              tugmalaridan birini bosganingizda, siz turgan sahifadagi <b>mavzu nomi</b> va <b>mavzuga tegishli ID</b>{' '}
              asosida <b>Excel formatidagi fayl</b> avtomatik tarzda yuklab olinadi. Ushbu faylda savollar va ularga
              javoblar kiritilishi uchun alohida katakchalar ajratilgan bo‘ladi.{' '}
              <b>Savollar turi tanlangan tugmaga qarab avtomatik moslashtiriladi.</b>
              <br />
              <br />
              <b>
                <i>“Excel import”</i>
              </b>{' '}
              tugmasi esa — siz mavzu asosida tayyorlagan savol va javoblaringizni faylga to‘ldirganingizdan so‘ng,
              ushbu faylni tizimga qayta yuklash uchun mo‘ljallangan. Fayl muvaffaqiyatli yuklangach, pastki qismda siz
              kiritgan savollar ro‘yxati ko‘rsatiladi.
            </p>
          </WarningModal>
        )}
      </div>
    </div>
  )
}

export default SubjectHeader
