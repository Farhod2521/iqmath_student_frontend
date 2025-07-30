import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useRoleDetection } from '@/hooks/useRoleDetection'

const Brand = ({ onLoad }) => {
  const router = useRouter();
  const { isTeacher } = useRoleDetection();

  const systemSettings = useGetQuery({
    key: KEYS.systemSettings,
    url: URLS.systemSettings
  })

  return (
    <div className={'  '}>
      <Link href={isTeacher ? '/dashboard/teacher/statistics' : '/dashboard/student/subjects'} className="flex gap-x-[4px] items-center">
        <img
          src={systemSettings?.data?.data[0]?.logo}
          alt="brand"
          width={34}
          height={34}
          onLoad={onLoad} // <-- logo to'liq yuklanganda parentga xabar beradi
        />
        <h1
          className={` font-normal text-[32px] font-bicubik text-black font-myriad   ${
            router.pathname === '/' ? 'dark:text-[#3965c6]' : 'dark:text-white'
          }`}
        >
          MATH
        </h1>
      </Link>
    </div>
  )
}

export default Brand
