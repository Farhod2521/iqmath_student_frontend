import SelectBox from '@/components/select-box'
import { useState } from 'react'
import SearchInput from '@/components/search'
import Button from '@/components/button'
import { useTranslation } from 'react-i18next'
import GridExample from '@/components/grid-table'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'

const Index = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [classValue, setClassValue] = useState('')
  const [statusValue, setStatusValue] = useState('')

  const classOptions = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' }
  ]

  const statusOptions = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' }
  ]

  const colDefs = [
    {
      headerName: '№',
      valueGetter: 'node.rowIndex + 1',
      maxWidth: 70,
      sortable: false,
      checkboxSelection: true
    },
    {
      headerName: 'Название',
      field: 'title',
      flex: 1
    },
    {
      headerName: 'Участников',
      field: 'participants',
      flex: 1
    },
    {
      headerName: 'Статус',
      field: 'status',
      flex: 1,
      cellRenderer: (params) => (
        <span className="text-green-600 border border-green-500 px-2 py-[2px] rounded-full text-sm font-medium">
          {params.value}
        </span>
      )
    },
    {
      headerName: '',
      field: 'actions',
      flex: 1.5,
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-end">
          <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">Закрыть группу</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">Открыть</button>
        </div>
      )
    }
  ]

  const rowData = Array(8).fill({
    title: 'Группа 203',
    participants: 12,
    status: 'Открытый'
  })
  return (
    <LayoutAdmin>
      <div className="mb-4">
        <HeaderTitle title={t('group')} />
      </div>
      <div className=" flex items-center justify-between py-[16px]">
        <div className=" flex items-center gap-x-[12px]">
          <SearchInput
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />

          <SelectBox
            label="Класс"
            options={classOptions}
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            className="w-40"
          />

          <SelectBox
            label="Статус"
            options={statusOptions}
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-x-[12px]">
          <Button>Добавить группу</Button>
        </div>
      </div>

      <GridExample colDefs={colDefs} rowData={rowData} />
    </LayoutAdmin>
  )
}

export default Index
