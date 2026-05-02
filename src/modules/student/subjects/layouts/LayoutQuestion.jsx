'use client'

import LanguageDropdown from '@/components/language'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { Button } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

function LayoutQuestion({ children, title = '', subtitle = '', onClick = () => {} }) {
  useKeyboardShortcut('Escape', onClick, { ignoreInput: false })
  useKeyboardShortcut('Esc', onClick, { ignoreInput: false })

  return (
    <div className="font-sf">
      <div className="flex justify-between px-3 md:px-6 py-2 md:py-3 border-b border-gray-100 items-center">
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

      <div className="px-3 md:px-6 py-3 md:py-4">{children}</div>
    </div>
  )
}

export default LayoutQuestion
