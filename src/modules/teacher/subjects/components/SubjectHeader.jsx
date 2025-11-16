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
    <div className="my-[20px] flex gap-2 relative">
      <button
        onClick={() => onSubmitImportExcel('text')}
        className="flex gap-x-[10px] bg-[#00733B] hover:bg-[#00733bf1] scale-100 active:scale-90  lg:py-[9px] py-[10px] lg:px-[20px] px-[10px] items-center rounded-[8px] transform-all duration-200"
      >
        <Image src={'/icons/excel.svg'} alt="excel" width={24} height={24} className="lg:w-[24px] lg:h-[24px]" />
        <p className="text-xs lg:text-sm font-gilroy text-white ">Tekst savollar</p>
      </button>

      <button
        onClick={() => onSubmitImportExcel('choice')}
        className="flex gap-x-[10px] bg-[#00733B] hover:bg-[#00733bf1] scale-100 active:scale-90  lg:py-[9px] py-[10px] lg:px-[20px] px-[10px] items-center rounded-[8px] transform-all duration-200"
      >
        <Image src={'/icons/excel.svg'} alt="excel" width={24} height={24} className="lg:w-[24px] lg:h-[24px]" />
        <p className="text-xs lg:text-sm font-gilroy text-white ">Variantli savollar</p>
      </button>

      <button
        onClick={() => onSubmitImportExcel('composite')}
        className="flex gap-x-[10px] bg-[#00733B] hover:bg-[#00733bf1] scale-100 active:scale-90  lg:py-[9px] py-[10px] lg:px-[20px] px-[10px] items-center rounded-[8px] transform-all duration-200"
      >
        <Image src={'/icons/excel.svg'} alt="excel" width={24} height={24} className="lg:w-[24px] lg:h-[24px]" />
        <p className="text-xs lg:text-sm font-gilroy text-white ">Ko'p kiritmali savollar</p>
      </button>

      <input type="file" accept=".xlsx" ref={inputRef} onChange={onFileChange} className="hidden" />

      <button
        onClick={handleClick}
        className="flex gap-x-[10px] bg-[#653BA0FF] hover:bg-[#7243B5FF] scale-100 active:scale-90 lg:py-[9px] py-[10px] lg:px-[20px] px-[10px] items-center rounded-[8px] transform-all duration-200"
      >
        <Image src={'/icons/excel.svg'} alt="excel" width={24} height={24} className="lg:w-[24px] lg:h-[24px]" />
        <p className="text-xs lg:text-sm font-gilroy text-white">Excel import</p>
      </button>

      <button onClick={handleShowWarning}>
        <InfoCircleIcon />
      </button>

      {showWarning && (
        <WarningModal classname="absolute w-full max-w-[351px] top-12 z-50">
          <button onClick={() => setShowWarning(false)} className="float-right rounded">
            <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
          </button>
          <p className="text-sm text-gray-800">
            <b>
              <i>“Tekst savollar”, “Variantli savollar” va “Ko'p kiritmali savollar”</i>
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
            tugmasi esa — siz mavzu asosida tayyorlagan savol va javoblaringizni faylga to‘ldirganingizdan so‘ng, ushbu
            faylni tizimga qayta yuklash uchun mo‘ljallangan. Fayl muvaffaqiyatli yuklangach, pastki qismda siz kiritgan
            savollar ro‘yxati ko‘rsatiladi.
          </p>
        </WarningModal>
      )}
    </div>
  )
}

export default SubjectHeader
