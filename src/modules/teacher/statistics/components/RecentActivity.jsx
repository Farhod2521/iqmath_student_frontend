import React from 'react'
import { useTranslation } from 'react-i18next'

const recentActivity = [
  { name: 'Ali Valiyev', action: 'lessonCompleted', time: '2 min ago' },
  { name: 'Dilshod Karimov', action: 'joinedGroup', group: 'B-2', time: '10 min ago' },
  { name: 'Zarina Akhmedova', action: 'testResult', result: '95%', time: '30 min ago' },
  { name: 'Kamola Rustamova', action: 'lessonCompleted', time: '1 hour ago' },
  { name: 'Jasur Usmonov', action: 'joinedGroup', group: 'A-1', time: '2 hours ago' }
]

const RecentActivity = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <h2 className="mb-4 text-lg font-semibold">{t('recentActivity')}</h2>
      <ul>
        {recentActivity.map((act, idx) => (
          <li key={idx} className="flex py-2 border-b border-[#E9E9E9] last:border-b-0 items-center">
            <span className="min-w-[140px] font-medium">{act.name}</span>
            <span className="text-[#7C8FAC] flex-1">
              {act.action === 'lessonCompleted' && t('lessonCompleted')}
              {act.action === 'joinedGroup' && `${act.group} ${t('joinedGroup')}`}
              {act.action === 'testResult' && `${t('testResult')}: ${act.result}`}
            </span>
            <span className="text-xs text-[#A3AED0] min-w-[70px] text-right">{act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentActivity
