import EmptyPage from '@/components/empty-page'
import GridExample from '@/components/grid-table'
import ButtonCellRenderer from '@/components/grid-table/buttonCell'
import HeaderTitle from '@/components/header-title'
import MyStudyAcitve from '@/features/my-study/MyStudyAcitve'
import LayoutAdmin from '@/layout/LayoutAdmin'
import NavbarStudy from '@/layout/navbar/NavbarStudy'
import { useMyStudyStore } from '@/store'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const tab = useMyStudyStore((state) => state.tab)
  const router = useRouter()
  const { t } = useTranslation()

  const rowData = [
    {
      id: '01',
      startTime: '10:00, 01.01.2024',
      endTime: '12:00, 01.01.2024',
      value: 15,
      progress: 75,
      stars: '⭐⭐⭐',
      buttonType: t('continueTest')
    },
    {
      id: '02',
      startTime: '14:00, 02.01.2024',
      endTime: '16:00, 02.01.2024',
      value: 20,
      progress: 45,
      stars: '⭐⭐⭐⭐',
      buttonType: t('continueTest')
    },
    {
      id: '03',
      startTime: '14:00, 02.01.2024',
      endTime: '16:00, 02.01.2024',
      value: 20,
      progress: 40,
      stars: '⭐⭐⭐',
      buttonType: t('continueTest')
    },
    {
      id: '04',
      startTime: '14:00, 02.01.2024',
      endTime: '16:00, 02.01.2024',
      value: 20,
      progress: 60,
      stars: '⭐⭐⭐',
      buttonType: t('continueTest')
    }
  ]

  return (
    <LayoutAdmin>
      <div className="flex items-center gap-5">
        <HeaderTitle title={t('myLearning')} />
        {router.pathname === '/dashboard/student/my-study' && <NavbarStudy />}
      </div>
      {tab === 'active' ? (
        <MyStudyAcitve data={rowData} />
      ) : (
        <EmptyPage title={"Muzlatilgan darslar ro'yxati"}></EmptyPage>
      )}
      {/* {tab === 'active' ? <GridExample rowData={rowData} colDefs={colDefs} /> : <p>Muzlatilgan darslar ro'yxati</p>} */}
    </LayoutAdmin>
  )
}

export default Index

const colDefs = [
  { headerName: '№', field: 'id', width: 80 },
  { headerName: 'Дата начала', field: 'startTime', flex: 1 },
  { headerName: 'Дата завершения', field: 'endTime', flex: 1 },
  { headerName: 'Задачи', field: 'value' },
  { headerName: 'Оценка', field: 'stars' },
  {
    headerName: 'Прогресс',
    field: 'progress',
    flex: 1,
    cellRenderer: ({ value }) => (
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-3 bg-gray-200 rounded-full">
          <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full" style={{ width: `${value}%` }} />
        </div>
        <span className="text-sm font-medium text-gray-700">{value}%</span>
      </div>
    )
  },
  {
    headerName: '',
    field: 'buttonType',
    cellRenderer: ButtonCellRenderer
  }
]
