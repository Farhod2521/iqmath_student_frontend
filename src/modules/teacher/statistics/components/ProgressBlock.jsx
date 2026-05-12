import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useTranslation } from 'react-i18next'
import 'react-circular-progressbar/dist/styles.css'

const ProgressBlock = () => {
  const { t } = useTranslation()
  const progress = 78
  const segmentStats = [
    { label: 'Faol', value: 60 },
    { label: 'Passiv', value: 30 },
    { label: 'Yangi', value: 10 }
  ]
  return (
    <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
      <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
        <h2 className="mb-4 text-lg font-semibold">{t('completionPercentage')}</h2>
        <div style={{ width: 120, height: 120, margin: '0 auto' }} className="mb-4">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: 'rgba(93, 135, 255, 0.5)',
              pathColor: '#5D87FF',
              trailColor: '#E9E9E9',
              strokeLinecap: 'round',
              textSize: '20px'
            })}
          />
        </div>
        <p className="text-[#7C8FAC] mt-3">{t('overallCompletionRate')}</p>
      </div>
      <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
        <h2 className="mb-4 text-lg font-semibold">{t('segmentation')}</h2>
        <ul>
          {segmentStats?.map((seg) => (
            <li key={seg.label} className="flex justify-between py-2 border-b border-[#E9E9E9] last:border-b-0">
              <span>{t(seg.label)}</span>
              <span className="font-semibold">{seg.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProgressBlock
