// components/subject-detail/LevelTabs.jsx
import { useTranslation } from 'react-i18next'

const LevelTabs = ({ activeLevel, onLevelChange }) => {
  const { t } = useTranslation()

  const levels = [
    { value: 'all', label: t('all') },
    { value: '1', label: t('level1') },
    { value: '2', label: t('level2') },
    { value: '3', label: t('level3') }
  ]

  return (
    <div className="col-span-12 flex gap-2 overflow-x-auto md:overflow-visible pb-2">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onLevelChange(level.value)}
          className={`px-3 py-1 md:px-4 md:py-2 border rounded-md transition-all duration-300 border-[#5D87FF] whitespace-nowrap text-sm 
            ${
              activeLevel === level.value
                ? 'bg-[#5D87FF] text-white scale-100'
                : 'bg-transparent hover:bg-[#D1D6E4] scale-100'
            } 
            active:scale-90`}
        >
          {level.label}
        </button>
      ))}
    </div>
  )
}

export default LevelTabs
