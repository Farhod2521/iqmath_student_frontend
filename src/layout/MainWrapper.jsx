import { useSettingStore } from '@/store'
import React, { useEffect } from 'react'

function MainWrapper({ children, title = '' }) {
  const setTitlePage = useSettingStore((state) => state.setTitlePage)

  useEffect(() => {
    setTitlePage(title)
    return () => {
      setTitlePage('')
    }
  }, [title])

  return <>{children}</>
}

export default MainWrapper
