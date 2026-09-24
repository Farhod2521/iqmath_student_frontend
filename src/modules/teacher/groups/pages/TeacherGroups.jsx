import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Plus, Search, UserMinus, Users, Users2 } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import GroupCard from '@/modules/tutor/groups/components/GroupCard'
import GroupFormModal from '@/modules/tutor/groups/components/GroupFormModal'
import ConfirmModal from '@/modules/tutor/groups/components/ConfirmModal'
import useGroupMutation from '@/modules/tutor/groups/useGroupMutation'
import { GROUPS_PATH, TEACHER_GROUP_KEYS } from '../constants'

const StatTile = ({ icon, iconClass, value, label }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>{icon}</span>
    <div className="min-w-0">
      <p className="text-2xl font-extrabold leading-tight text-[#191C1D]">{value}</p>
      <p className="truncate text-xs font-medium text-[#5A6A85]">{label}</p>
    </div>
  </div>
)

const TeacherGroups = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [deletingGroup, setDeletingGroup] = useState(null)

  const { data: groupsData, isLoading } = useGetQuery({
    key: KEYS.teacherMyGroups,
    url: URLS.teacherMyGroups
  })

  // Faqat jami sonini olish uchun (size=1)
  const { data: ungroupedData } = useGetQuery({
    key: KEYS.teacherUngroupedStudents,
    url: URLS.teacherUngroupedStudents,
    params: { page: 1, size: 1 }
  })

  const groups = get(groupsData, 'data', [])
  const studentsWithoutGroup = get(ungroupedData, 'data.total', 0)
  const studentsInGroups = groups.reduce((total, group) => total + (group.student_count || 0), 0)

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingGroup(null)
  }

  const createGroup = useGroupMutation({
    method: 'post',
    successMessage: t('tutorGroups.groupCreated'),
    errorMessage: t('tutorGroups.errorGeneric'),
    invalidateKeys: TEACHER_GROUP_KEYS,
    // Yaratilgach darhol guruh ichiga o'tamiz — o'quvchi qo'shish uchun
    onDone: (response) => {
      closeForm()
      const newId = response?.data?.id
      if (newId) router.push(`${GROUPS_PATH}/${newId}?add=1`)
    }
  })

  const updateGroup = useGroupMutation({
    method: 'patch',
    successMessage: t('tutorGroups.groupUpdated'),
    errorMessage: t('tutorGroups.errorGeneric'),
    invalidateKeys: TEACHER_GROUP_KEYS,
    onDone: closeForm
  })

  const removeGroup = useGroupMutation({
    method: 'delete',
    successMessage: t('tutorGroups.groupDeleted'),
    errorMessage: t('tutorGroups.errorGeneric'),
    invalidateKeys: TEACHER_GROUP_KEYS,
    onDone: () => setDeletingGroup(null)
  })

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return groups
    return groups.filter((group) => String(group.name || '').toLowerCase().includes(query))
  }, [groups, search])

  const handleSubmitForm = ({ name }) => {
    if (editingGroup) {
      updateGroup.mutate({ url: `${URLS.teacherMyGroups}${editingGroup.id}/`, data: { name } })
      return
    }
    createGroup.mutate({ url: URLS.teacherMyGroups, data: { name } })
  }

  const openCreateForm = () => {
    setEditingGroup(null)
    setIsFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-3 pb-4 sm:gap-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-extrabold text-[#191C1D] sm:text-2xl">{t('tutorGroups.title')}</h1>
          <p className="mt-1 text-sm text-[#5A6A85]">{t('teacherGroups.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
        >
          <Plus size={16} />
          {t('tutorGroups.createGroup')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          icon={<Users2 size={22} />}
          iconClass="bg-[#EAF0FF] text-[#5D87FF]"
          value={groups.length}
          label={t('tutorGroups.statGroups')}
        />
        <StatTile
          icon={<Users size={22} />}
          iconClass="bg-[#E7F8EF] text-[#0D875E]"
          value={studentsInGroups}
          label={t('tutorGroups.statStudentsInGroups')}
        />
        <StatTile
          icon={<UserMinus size={22} />}
          iconClass="bg-[#FFF3DD] text-[#F59E0B]"
          value={studentsWithoutGroup}
          label={t('tutorGroups.statStudentsWithoutGroup')}
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[#E9E9E9] bg-white px-3.5 py-2.5 sm:max-w-sm">
        <Search size={16} className="shrink-0 text-[#8A8A8E]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('tutorGroups.searchGroup')}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#191C1D] outline-none"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-[#F0F0F0] bg-white py-14 text-center shadow-sm">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
            <Users2 size={26} />
          </span>
          <p className="mt-3 text-base font-semibold text-[#191C1D]">
            {search ? t('tutorGroups.noSearchResults') : t('tutorGroups.emptyTitle')}
          </p>
          {!search ? (
            <>
              <p className="mt-1 max-w-md text-sm text-[#8A8A8E]">{t('teacherGroups.emptyDescription')}</p>
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
              >
                <Plus size={16} />
                {t('tutorGroups.createGroup')}
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredGroups.map((group, index) => (
            <GroupCard
              key={group.id}
              group={group}
              index={index}
              showDescription={false}
              onOpen={(selected) => router.push(`${GROUPS_PATH}/${selected.id}`)}
              onEdit={(selected) => {
                setEditingGroup(selected)
                setIsFormOpen(true)
              }}
              onDelete={(selected) => setDeletingGroup(selected)}
            />
          ))}
        </div>
      )}

      <GroupFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmitForm}
        isLoading={createGroup.isLoading || updateGroup.isLoading}
        group={editingGroup}
        showDescription={false}
      />

      <ConfirmModal
        isOpen={Boolean(deletingGroup)}
        onClose={() => setDeletingGroup(null)}
        onConfirm={() => removeGroup.mutate({ url: `${URLS.teacherMyGroups}${deletingGroup.id}/` })}
        isLoading={removeGroup.isLoading}
        title={t('tutorGroups.deleteGroup')}
        message={t('tutorGroups.deleteGroupConfirm', { name: deletingGroup?.name || '' })}
        confirmLabel={t('tutorGroups.delete')}
      />
    </div>
  )
}

export default TeacherGroups
