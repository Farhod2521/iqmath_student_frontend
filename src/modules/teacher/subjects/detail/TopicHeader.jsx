// components/subject-detail/TopicHeader.jsx
import Image from 'next/image'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'

const TopicHeader = ({ topic, onWatchVideo, onCreateTest }) => {
  const { t, i18n } = useTranslation()

  return (
    <div className="col-span-12 border border-[#E9E9E9] rounded-xl py-3">
      <h1 className="text-center">{i18n.language === 'uz' ? topic?.name_uz : topic?.name_ru}</h1>

      <div className="w-full bg-[#E9E9E9] h-px my-3" />

      <div className="flex justify-between py-3 px-6">
        <div className="flex gap-4 items-center">
          <div className="w-[60px] h-[60px] bg-[#EDEDF2] flex items-center justify-center rounded-lg">
            <Image src="/icons/play.svg" alt="play" width={24} height={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-[17px] font-medium">{t('watchBeforeStart')}</h3>
            <p className="text-[#8A8A8E]">{t('videoExplanation')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onclick={onWatchVideo}
            border="border border-[#D1D1D6]"
            px="px-4"
            py="py-3"
            classname="bg-white !text-black hover:bg-[#F3F3F3] transition-all duration-300"
          >
            {t('watch')}
          </Button>
          <Button onclick={onCreateTest} px="px-4" py="py-3" classname="hover:bg-[#537AE4] transition-all duration-200">
            {t('createTest')}
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#E9E9E9] h-px" />

      <div className="py-3 px-6">
        {parse(i18n.language === 'uz' ? topic?.content_uz || '' : topic?.content_ru || '')}
      </div>
    </div>
  )
}

export default TopicHeader
