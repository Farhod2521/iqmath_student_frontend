// pages/subject/[id]/chapter/[chapterId]/topic/[topicId].jsx
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { get } from 'lodash'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { config } from '@/config'
import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import usePutQuery from '@/hooks/api/usePutQuery'
import useDeleteQuestion from '@/hooks/api/useDeleteQuestion'

import SimpleModal from '@/components/modal/simple-modal'
import VideoPlayer from '@/components/video-player'
import Button from '@/components/button'
import Image from 'next/image'
import QuestionModal from '../detail/QuestionModal'
import { useQuestionForm } from '../hooks/useQuestionForm'
import TopicHeader from '../detail/TopicHeader'
import LevelTabs from '../detail/LevelTabs'
import QuestionTable from '../detail/QuestionTable'

const SubjectDetail = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter()
  const { chapterId, topicId } = router.query

  // UI State
  const [showPlayer, setShowPlayer] = useState(false)
  const [levelTab, setLevelTab] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  // Form State
  const { formData, updateFormField, resetForm, loadQuestionData, buildFormData } = useQuestionForm()

  // API Queries
  const { data: topics } = useGetQuery({
    key: KEYS.topics,
    url: chapterId ? `${URLS.topics}${chapterId}/` : null,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!chapterId && !!session?.accessToken
  })

  const { data: questionList } = useGetQuery({
    key: KEYS.questionList,
    url: `${URLS.questionList}${topicId}/`,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!topicId && !!session?.accessToken
  })

  const { mutate: createQuestion } = usePostQuery({ key: 'create-question' })
  const { mutate: updateQuestion } = usePutQuery({ listKeyId: 'edit-created-question' })
  const { mutate: deleteQuestion, isLoading: isDeleting } = useDeleteQuestion(() => {
    setIsDeleteModalOpen(false)
  })

  // Computed Values
  const filteredTopic = get(topics, 'data', [])?.find((topic) => topic.id === Number(topicId))
  const filteredQuestions = get(questionList, 'data', []).filter((item) =>
    levelTab === 'all' ? true : item.level?.toString() === levelTab
  )

  // Handlers
  const handleCreateQuestion = () => {
    resetForm()
    setIsCreateModalOpen(true)
  }

  const handleEditQuestion = (question) => {
    loadQuestionData(question)
    setSelectedQuestion(question)
    setIsEditModalOpen(true)
  }

  const handleDeleteQuestion = (question) => {
    setSelectedQuestion(question)
    setIsDeleteModalOpen(true)
  }

  const handleSubmitCreate = () => {
    const formDataObj = buildFormData(topicId)

    createQuestion(
      {
        url: URLS.createQuestion,
        attributes: formDataObj,
        config: { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false)
          resetForm()
          queryClient.invalidateQueries([KEYS.questionList])
          toast.success(t('questionCreatedSuccessfully'))
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || t('errorCreatingQuestion'))
        }
      }
    )
  }

  const handleSubmitEdit = () => {
    const formDataObj = buildFormData(topicId)

    updateQuestion(
      {
        url: `${URLS.updateQuestion}${selectedQuestion.id}/`,
        attributes: formDataObj,
        config: { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false)
          resetForm()
          queryClient.invalidateQueries([KEYS.questionList])
          toast.success(t('questionUpdatedSuccessfully'))
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || t('errorUpdatingQuestion'))
        }
      }
    )
  }

  const handleConfirmDelete = () => {
    if (!selectedQuestion?.id || !session?.accessToken) {
      toast.error(t('errorDeletingQuestion'))
      return
    }

    deleteQuestion(`${config.API_URL}${URLS.deleteQuestion}${selectedQuestion.id}/`, {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    })
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <TopicHeader
          topic={filteredTopic}
          onWatchVideo={() => setShowPlayer(true)}
          onCreateTest={handleCreateQuestion}
        />

        <LevelTabs activeLevel={levelTab} onLevelChange={setLevelTab} />
        <QuestionTable questions={filteredQuestions} onEdit={handleEditQuestion} onDelete={handleDeleteQuestion} />
      </div>

      {/* Video Player */}
      {showPlayer && (
        <VideoPlayer
          url={i18n.language === 'uz' ? filteredTopic?.video_url_uz : filteredTopic?.video_url_ru}
          title={i18n.language === 'uz' ? filteredTopic?.name_uz : filteredTopic?.name_ru}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {/* Create Modal */}
      <QuestionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        formData={formData}
        onFormChange={updateFormField}
        onSubmit={handleSubmitCreate}
      />

      {/* Edit Modal */}
      <QuestionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        onFormChange={updateFormField}
        onSubmit={handleSubmitEdit}
        isEditMode
      />

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <SimpleModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <div className="flex justify-between px-4 py-5">
            <h3 className="text-lg font-semibold">Savolni o&apos;chirish</h3>
            <button onClick={() => setIsDeleteModalOpen(false)} className="rounded">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>

          <div className="w-full h-px bg-[#E9E9E9]" />

          <p className="px-4 py-5">Belgilangan savolni o&apos;chirganingizdan so&apos;ng, uni tiklab bo&apos;lmaydi.</p>

          <div className="w-full h-px bg-[#E9E9E9]" />

          <div className="px-4 py-3 flex justify-center">
            <Button classname="!py-2" disabled={isDeleting} onclick={handleConfirmDelete}>
              {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  )
}

export default SubjectDetail
