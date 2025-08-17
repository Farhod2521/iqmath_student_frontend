import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useAuthTabStore } from '@/store'

const Brand = ({ onLoad }) => {
  const router = useRouter();
  const { isTeacher } = useRoleDetection();
  const { setTab } = useAuthTabStore();
  const [imageError, setImageError] = useState(false);

  const systemSettings = useGetQuery({
    key: KEYS.systemSettings,
    url: URLS.systemSettings
  })

  const handleLogoClick = (e) => {
    e.preventDefault();
    // Agar dashboard sahifasida bo'lsak, welcome tab'ga o'tkazamiz
    if (router.pathname.includes('/dashboard')) {
      setTab('welcome');
      router.push('/');
    } else {
      // Agar boshqa sahifada bo'lsak, welcome tab'ga o'tkazamiz
      setTab('welcome');
      router.push('/');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
    if (onLoad) onLoad();
  };

  const fallbackImage = '/icons/brand.svg';
  
  const imageSrc = systemSettings?.data?.data[0]?.logo || fallbackImage;

  return (
    <div className={'  '}>
      <button onClick={handleLogoClick} className="flex gap-x-[4px] items-center">
        <img
          src={imageError ? fallbackImage : imageSrc}
          alt="brand"
          width={34}
          height={34}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <h1
          className={` font-normal text-[32px] font-bicubik text-black font-myriad   ${
            router.pathname === '/' ? 'dark:text-[#3965c6]' : 'dark:text-white'
          }`}
        >
          MATH
        </h1>
      </button>
    </div>
  )
}

export default Brand
