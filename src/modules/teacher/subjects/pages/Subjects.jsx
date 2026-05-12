import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import usePostQuery from '@/hooks/api/usePostQuery'
import { useSession } from 'next-auth/react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'
import SortableTableRow from '../components/sortable-table-row'
import toast from 'react-hot-toast'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'

const Subjects = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [subjects, setSubjects] = useState([])
  const [isDragEnabled, setIsDragEnabled] = useState(false)

  const {
    data: subjectsData,
    isLoading: isLoadingSubjects,
    isFetching: isFetchingSubjects
  } = useGetQuery({ key: KEYS.teacherSubjects, url: URLS.teacherSubjects })

  const { mutate: reorderSubjects } = usePostQuery({
    key: 'reorder-subjects'
  })

  useEffect(() => {
    if (subjectsData?.data) {
      setSubjects(subjectsData.data)
    }
  }, [subjectsData])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = subjects.findIndex((item) => item.id === active.id)
      const newIndex = subjects.findIndex((item) => item.id === over.id)

      const newOrder = arrayMove(subjects, oldIndex, newIndex)
      setSubjects(newOrder)

      // Send reorder request to backend
      const orderedIds = newOrder?.map((item) => item.id)
      reorderSubjects(
        {
          url: URLS.reorderSubjects,
          attributes: {
            ordered_ids: orderedIds
          },
          config: {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
          }
        },
        {
          onSuccess: () => {
            // toast.success("Fanlar ketma-ketligi o'zgartirildi");
          },
          onError: (error) => {
            toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
            // Revert to original order on error
            setSubjects(subjectsData.data)
          }
        }
      )
    }
  }

  return (
    <LayoutAdmin>
      {isLoadingSubjects || isFetchingSubjects ? (
        <ContentLoader />
      ) : (
        <div>
          <HeaderTitle title={t('subjectsInArea')} />
          <div className="mt-[24px] flex gap-x-[24px]">
            <div className="border border-[#E9E9E9] rounded-[12px] w-full overflow-x-auto">
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <table className="w-full min-w-[900px] border-collapse table-auto">
                  <thead>
                    <tr className="border-b border-b-[#E9E9E9] p-[8px] md:p-[12px]">
                      <th className="p-[8px] md:p-[12px] text-center w-[40px]">
                        <button
                          onClick={() => setIsDragEnabled((prev) => !prev)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                          title="Tartiblash"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </button>
                      </th>
                      <th className="p-[8px] md:p-[12px] text-center">№</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('class')}</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('title')}</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('chapter')}</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('topic')}</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('examples')}</th>
                      <th className="p-[8px] md:p-[12px] text-left">{t('action')}</th>
                    </tr>
                  </thead>
                  <SortableContext items={subjects} strategy={verticalListSortingStrategy} disabled={!isDragEnabled}>
                    <tbody>
                      {subjects?.map((item, index) => (
                        <SortableTableRow
                          key={item.id}
                          id={item.id}
                          showDragHandle={isDragEnabled}
                          className="transition-all border-b group hover:bg-gray-50"
                        >
                          <td className="p-[8px] md:p-[12px] text-center">{index + 1}</td>

                          <td className="p-[8px] md:p-[12px] text-left text-xs md:text-sm">
                            {get(item, 'class_name')}-sinf
                          </td>
                          <td
                            className="p-[8px] md:p-[12px] text-left text-[15px] w-[20%] font-medium transition-all cursor-pointer hover:text-gray-700 hover:underline"
                            onClick={() => router.push(`/dashboard/teacher/subjects/${get(item, 'id')}`)}
                          >
                            {i18n.language === 'uz' ? get(item, 'name_uz') : get(item, 'name_ru')}
                          </td>
                          <td className="p-[8px] md:p-[12px] text-left text-xs md:text-sm">
                            {get(item, 'chapter_count')} ta
                          </td>
                          <td className="p-[8px] md:p-[12px] text-left text-xs md:text-sm">
                            {get(item, 'topic_count')} ta
                          </td>
                          <td className="p-[8px] md:p-[12px] text-left text-xs md:text-sm">
                            {get(item, 'question_count')} ta
                          </td>
                          <td className="p-[8px] md:p-[12px] text-left">
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/dashboard/teacher/subjects/${get(item, 'id')}`)}
                                className="px-4 p-[8px] bg-[#007AFF] text-white rounded-[10px] hover:bg-blue-600 transition-all text-xs md:text-sm"
                              >
                                {t('details')}
                              </button>
                            </div>
                          </td>
                        </SortableTableRow>
                      ))}
                    </tbody>
                  </SortableContext>
                </table>
              </DndContext>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  )
}

export default Subjects
