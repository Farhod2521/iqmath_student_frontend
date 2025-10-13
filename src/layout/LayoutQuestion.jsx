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
      <div className="flex justify-between pl-6 pr-4 py-3 border-b border-gray-100 items-center">
        <div className="flex items-center gap-x-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="w-px h-6 bg-gray-200"></div>
          <p className="text-base text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center">
          <LanguageDropdown />
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <Button onPress={onClick} className="rounded" variant="light" isIconOnly>
            <Image src="/icons/close.svg" alt="close" width={24} height={24} />
          </Button>
        </div>
      </div>

      {children}
    </div>
  )
}

export default LayoutQuestion
