import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { ArrowLeft, ArrowRightLeft, Pencil, Trash2, UserMinus, UserPlus, Users2 } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import GroupStudentsTable from '../components/GroupStudentsTable'
import AddStudentsModal from '../components/AddStudentsModal'
import MoveStudentsModal from '../components/MoveStudentsModal'
import GroupFormModal from '../components/GroupFormModal'
import ConfirmModal from '../components/ConfirmModal'
import useGroupMutation from '../useGroupMutation'

const TutorGroupDetail = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const groupId = router.query.id

  const [selectedIds, setSelectedIds] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [movingStudents, setMovingStudents] = useState(null)
  const [removingStudents, setRemovingStudents] = useState(null)

  const { data: groupData, isLoading } = useGetQuery({
    key: [KEYS.tutorGroupDetail, groupId],
    url: `${URLS.tutorGroups}${groupId}/`,
    enabled: Boolean(groupId)
  })

  const { data: groupsData } = useGetQuery({
    key: KEYS.tutorGroups,
    url: URLS.tutorGroups
  })

  const group = get(groupData, 'data', null)
  const groups = get(groupsData, 'data', [])
  const students = useMemo(() => get(group, 'students', []) || [], [group])

  const numericGroupId = group?.id ?? (groupId ? Number(groupId) : null)

  const resetSelection = () => setSelectedIds([])

  const addStudents = useGroupMutation({
    method: 'post',
    successMessage: t('tutorGroups.studentsAdded'),
    errorMessage: t('tutorGroups.errorGeneric'),
    onDone: () => {
      setIsAddOpen(false)
      resetSelection()
    }
  })

  const moveStudents = useGroupMutation({
    method: 'post',
    successMessage: t('tutorGroups.studentsMoved'),
    errorMessage: t('tutorGroups.errorGeneric'),
    onDone: () => {
      setMovingStudents(null)
      resetSelection()
    }
  })

  const removeStudents = useGroupMutation({
    method: 'delete',
    successMessage: t('tutorGroups.studentsRemoved'),
    errorMessage: t('tutorGroups.errorGeneric'),
    onDone: () => {
      setRemovingStudents(null)
      resetSelection()
    }
  })

  const updateGroup = useGroupMutation({
    method: 'patch',
    successMessage: t('tutorGroups.groupUpdated'),
    errorMessage: t('tutorGroups.errorGeneric'),
    onDone: () => setIsEditOpen(false)
  })

  const deleteGroup = useGroupMutation({
    method: 'delete',
    successMessage: t('tutorGroups.groupDeleted'),
    errorMessage: t('tutorGroups.errorGeneric'),
    onDone: () => router.push('/dashboard/tutor/groups')
  })

  const toggleStudent = (studentId) => {
    setSelectedIds((previous) =>
      previous.includes(studentId) ? previous.filter((id) => id !== studentId) : [...previous, studentId]
    )
  }

  const toggleAllStudents = () => {
    setSelectedIds((previous) => (previous.length === students.length ? [] : students.map((item) => item.id)))
  }

  const selectedStudents = students.filter((student) => selectedIds.includes(student.id))

  const handleMove = (targetGroupId) => {
    const ids = (movingStudents || []).map((student) => student.id)
    if (!targetGroupId || ids.length === 0) return
    moveStudents.mutate({
      url: `${URLS.tutorGroups}${targetGroupId}/students/`,
      data: { student_ids: ids }
    })
  }

  const handleRemove = () => {
    const ids = (removingStudents || []).map((student) => student.id)
    if (ids.length === 0) return
    removeStudents.mutate({
      url: `${URLS.tutorGroups}${numericGroupId}/students/`,
      data: { student_ids: ids }
    })
  }

  if (!isLoading && !group) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-[#F0F0F0] bg-white py-16 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
          <Users2 size={26} />
        </span>
        <p className="mt-3 text-base font-semibold text-[#191C1D]">{t('tutorGroups.groupNotFound')}</p>
        <button
          type="button"
          onClick={() => router.push('/dashboard/tutor/groups')}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
        >
          <ArrowLeft size={16} />
          {t('tutorGroups.backToGroups')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 pb-4 sm:gap-4">
      <button
        type="button"
        onClick={() => router.push('/dashboard/tutor/groups')}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#5A6A85] transition hover:text-[#5D87FF]"
      >
        <ArrowLeft size={16} />
        {t('tutorGroups.backToGroups')}
      </button>

      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FF] text-[#5D87FF]">
            <Users2 size={26} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold text-[#191C1D] sm:text-2xl">
              {isLoading ? '...' : group?.name}
            </h1>
            <p className="mt-0.5 truncate text-sm text-[#8A8A8E]">
              {group?.description || t('tutorGroups.noDescription')}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#5A6A85]">
              {t('tutorGroups.studentsCount', { count: students.length })}
              {group?.created_at ? ` · ${group.created_at}` : ''}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
          >
            <UserPlus size={16} />
            {t('tutorGroups.addStudents')}
          </button>
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#EAF0FF] px-3.5 py-2.5 text-sm font-semibold text-[#4968F4] transition hover:bg-[#DCEAFB]"
          >
            <Pencil size={15} />
            <span className="hidden sm:inline">{t('tutorGroups.edit')}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FEF2F2] px-3.5 py-2.5 text-sm font-semibold text-[#DC2626] transition hover:bg-[#FEE2E2]"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">{t('tutorGroups.delete')}</span>
          </button>
        </div>
      </div>

      {selectedIds.length > 0 ? (
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#D7E2FF] bg-[#F4F7FF] p-3.5 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold text-[#191C1D]">
            {t('tutorGroups.selectedCount', { count: selectedIds.length })}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMovingStudents(selectedStudents)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold text-[#5D87FF] shadow-sm transition hover:bg-[#EAF0FF]"
            >
              <ArrowRightLeft size={15} />
              {t('tutorGroups.moveToGroup')}
            </button>
            <button
              type="button"
              onClick={() => setRemovingStudents(selectedStudents)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold text-[#DC2626] shadow-sm transition hover:bg-[#FEF2F2]"
            >
              <UserMinus size={15} />
              {t('tutorGroups.removeFromGroup')}
            </button>
            <button
              type="button"
              onClick={resetSelection}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-[#5A6A85] transition hover:text-[#191C1D]"
            >
              {t('tutorGroups.cancel')}
            </button>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
        <GroupStudentsTable
          students={students}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onToggle={toggleStudent}
          onToggleAll={toggleAllStudents}
          onMove={(student) => setMovingStudents([student])}
          onRemove={(student) => setRemovingStudents([student])}
          onAdd={() => setIsAddOpen(true)}
        />
      </div>

      <AddStudentsModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(studentIds) =>
          addStudents.mutate({
            url: `${URLS.tutorGroups}${numericGroupId}/students/`,
            data: { student_ids: studentIds }
          })
        }
        isLoading={addStudents.isLoading}
        groupId={numericGroupId}
        groupName={group?.name}
      />

      <MoveStudentsModal
        isOpen={Boolean(movingStudents)}
        onClose={() => setMovingStudents(null)}
        onSubmit={handleMove}
        isLoading={moveStudents.isLoading}
        groups={groups}
        currentGroupId={numericGroupId}
        studentNames={(movingStudents || []).map((student) => student.full_name)}
      />

      <ConfirmModal
        isOpen={Boolean(removingStudents)}
        onClose={() => setRemovingStudents(null)}
        onConfirm={handleRemove}
        isLoading={removeStudents.isLoading}
        title={t('tutorGroups.removeFromGroup')}
        message={
          removingStudents?.length === 1
            ? t('tutorGroups.removeStudentConfirm', { name: removingStudents[0]?.full_name || '' })
            : t('tutorGroups.removeStudentsConfirm', { count: removingStudents?.length || 0 })
        }
        confirmLabel={t('tutorGroups.remove')}
      />

      <GroupFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={({ name, description }) =>
          updateGroup.mutate({
            url: `${URLS.tutorGroups}${numericGroupId}/`,
            data: { name, description }
          })
        }
        isLoading={updateGroup.isLoading}
        group={group}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => deleteGroup.mutate({ url: `${URLS.tutorGroups}${numericGroupId}/` })}
        isLoading={deleteGroup.isLoading}
        title={t('tutorGroups.deleteGroup')}
        message={t('tutorGroups.deleteGroupConfirm', { name: group?.name || '' })}
        confirmLabel={t('tutorGroups.delete')}
      />
    </div>
  )
}

export default TutorGroupDetail
