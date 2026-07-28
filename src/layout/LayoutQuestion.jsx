import LanguageDropdown from '@/components/language'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { Button } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

function LayoutQuestion({ children, title = '', subtitle = '', onClick = () => {} }) {
  useKeyboardShortcut('Escape', onClick, { ignoreInput: false })
  useKeyboardShortcut('Esc', onClick, { ignoreInput: false })

  return (
    <div className="font-sf flex flex-col h-[100dvh]">
      <div className="shrink-0 flex justify-between px-3 md:pl-6 md:pr-4 py-2 md:py-3 border-b border-gray-100 items-center">
        <div className="flex items-center gap-x-2 md:gap-x-3 min-w-0">
          <h1 className="text-base md:text-xl font-semibold truncate">{title}</h1>

          <div className="w-px h-5 md:h-6 bg-gray-200"></div>

          <p className="text-sm md:text-base text-gray-600 truncate">{subtitle}</p>
        </div>

        <div className="flex items-center">
          <LanguageDropdown />

          <div className="w-px h-5 md:h-6 bg-gray-300 mx-2"></div>

          <Button onPress={onClick} className="rounded" variant="light" isIconOnly>
            <Image src="/icons/close.svg" alt="close" width={20} height={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden px-3 md:px-0 py-3 md:py-0">{children}</div>
    </div>
  )
}

export default LayoutQuestion
