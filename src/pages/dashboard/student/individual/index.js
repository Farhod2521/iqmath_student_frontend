import HeaderTitle from '@/components/header-title'
import Individual from '@/features/individual/Individual'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t, i18n } = useTranslation()
  return (
    <LayoutAdmin>
      <HeaderTitle title={t('independent')} />
      <Individual data={i18n.language === 'uz' ? rowDataUz : rowData} />
    </LayoutAdmin>
  )
}

export default Index

const rowData = [
  {
    id: '1',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 75,
    action: 75
  },
  {
    id: '2',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '3',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '4',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '5',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '6',
    theme: 'Сравнение натуральных чисел.\nДвойное неравенство',
    startTime: '23:34, 10.01.2025',
    status: 'Активный',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  }
]

const rowDataUz = [
  {
    id: '1',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 75,
    action: 75
  },
  {
    id: '2',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '3',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '4',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '5',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  },
  {
    id: '6',
    theme: 'Natural sonlarni taqqoslash.\nIkki tomonlama tengsizlik',
    startTime: '23:34, 10.01.2025',
    status: 'Faol',
    endTime: '23:34, 10.01.2025',
    progress: 0,
    action: 0
  }
]
