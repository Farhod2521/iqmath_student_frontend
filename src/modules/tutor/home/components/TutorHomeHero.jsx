import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { UserPlus, FolderPlus } from 'lucide-react'
import homePageImg from '@/assets/images/teacher/home_page.png'

const TutorHomeHero = ({ onAddStudent }) => {
  const { t } = useTranslation()

  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-[#EAF1FF] px-5 py-6 sm:min-h-[280px] sm:px-7 sm:py-7">
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{ backgroundImage: `url(${homePageImg.src})` }}
      />

      <div className="relative flex h-full max-w-lg flex-col">
        <div>
          <h2 className="text-2xl font-extrabold leading-tight text-[#191C1D] sm:text-4xl">
            {t('tutorHome.heroTitleLine1')}
            <br />
            {t('tutorHome.heroTitleLine2')}
          </h2>
          <p className="mt-2 text-sm text-[#5A6A85] sm:text-base">{t('tutorHome.heroDescription')}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-4">
          <button
            onClick={onAddStudent}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
          >
            <UserPlus size={16} />
            {t('tutorHome.addStudentButton')}
          </button>
          <button
            onClick={() => toast(t('tutorHome.comingSoon'))}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E8F1FD] px-4 py-2 text-sm font-semibold text-[#4968F4] transition hover:bg-[#DCEAFB]"
          >
            <FolderPlus size={16} />
            {t('tutorHome.createGroupButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorHomeHero
