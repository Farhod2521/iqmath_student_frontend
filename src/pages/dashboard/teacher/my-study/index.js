import Dashboard from '@/components/dashboard'
import { groupsPupil } from '@/dummy-data'
import DndList from '@/components/drag-and-drop'
import { DndContext, closestCenter } from '@dnd-kit/core'
import SelectBox from '@/components/select-box'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import SearchInput from '@/components/search'
import CardIcon from '@/components/icons/card'
import ListIcon from '@/components/icons/list'
import Button from '@/components/button'
import { useSearchParams } from 'next/navigation'
import SimpleModalTeacher from '@/components/modal/simple-modal-teacher'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import GridExample from '@/components/grid-table'
import Image from 'next/image'
import LayoutAdmin from '@/layout/LayoutAdmin'
const Index = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone')
  const [showModal, setShowModal] = useState(!!phone)
  const [addGroup, setAddGroup] = useState(false)

  const [tab, setTab] = useState('list')
  const [groups, setGroups] = useState(groupsPupil)
  const [search, setSearch] = useState('')
  const [classValue, setClassValue] = useState('')
  const [statusValue, setStatusValue] = useState('')

  const handleCopy = () => {
    const textToCopy = `Login: ${session.login}\nPassword: ${session.password}`
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
      })
      .catch((err) => console.error('Failed to copy text:', err))
  }

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false) // Close the modal
    }, 300)
  }

  const classOptions = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' }
  ]

  const statusOptions = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' }
  ]

  const handleGroupDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = groups.findIndex((g) => g.id === active.id)
      const newIndex = groups.findIndex((g) => g.id === over.id)
      setGroups(arrayMove(groups, oldIndex, newIndex))
    }
  }

  const handleTab = (tab) => {
    setTab(tab)
  }

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
    <LayoutAdmin title={t('group')}>
      {showModal && phone && (
        <SimpleModalTeacher>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold"> {t('confidentiality')}</h3>
            <button onClick={closeModal} className="rounded">
              <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
            </button>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="px-[16px] py-[24px]">
            <div className="flex items-center gap-x-[5px]">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 text-[#13DEB9]"></h2>
            </div>
            <h2 className="lg:text-lg md:text-base text-sm font-semibold mb-1">{t('userLoginandPassword')}</h2>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-2">
              {t('yourLogin')}: {session?.login}
            </p>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-4">
              {t('yourPassword')}: {session?.password}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#7C8FAC]">{t('WantchangePassword')}</p>
          </div>
          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
            <button onClick={handleCopy} className="bg-[#5D87FF] text-white py-2 px-4 rounded w-full sm:w-auto">
              {copied ? `${t('copied')}` : `${t('copy')}`}
            </button>
          </div>
        </SimpleModalTeacher>
      )}
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

      {tab === 'card' && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleGroupDragEnd}>
          <SortableContext items={groups} strategy={verticalListSortingStrategy}>
            <div className="">
              <div className="flex gap-4 min-w-max items-start">
                {groups.map((group) => (
                  <DndList key={group.id} groupId={group.id} title={group.title} itemsData={group.items} />
                ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
      )}

      {tab === 'list' && (
        <div>
          <GridExample colDefs={colDefs} rowData={rowData} />
        </div>
      )}
    </LayoutAdmin>
  )
}

export default Index
