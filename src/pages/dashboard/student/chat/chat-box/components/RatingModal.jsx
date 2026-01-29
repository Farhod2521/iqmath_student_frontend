import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Star, Send, MessageSquare } from 'lucide-react'

const RatingModal = ({ closeMutation, rating, setRating, setComment, comment, setIsRatingModalOpen }) => {
  const { t } = useTranslation()
  const [hoveredStar, setHoveredStar] = useState(0)

  const getRatingText = (stars) => {
    const texts = {
      1: t('chatBox.confirm_close.very_poor') || 'Juda yomon',
      2: t('chatBox.confirm_close.poor') || 'Yomon',
      3: t('chatBox.confirm_close.average') || "O'rtacha",
      4: t('chatBox.confirm_close.good') || 'Yaxshi',
      5: t('chatBox.confirm_close.excellent') || "A'lo"
    }
    return texts[stars] || ''
  }

  const getRatingStyle = (stars) => {
    const styles = {
      1: 'bg-red-100 text-red-700',
      2: 'bg-orange-100 text-orange-700',
      3: 'bg-yellow-100 text-yellow-700',
      4: 'bg-blue-100 text-blue-700',
      5: 'bg-green-100 text-green-700'
    }
    return styles[stars] || 'bg-transparent text-transparent'
  }

  const getStarColor = (stars) => {
    const colors = {
      1: 'text-red-500',
      2: 'text-orange-500',
      3: 'text-yellow-400',
      4: 'text-blue-500',
      5: 'text-green-500'
    }
    return colors[stars] || 'text-gray-300'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="relative p-6 text-center border-b border-gray-100">
          <button
            onClick={() => setIsRatingModalOpen(false)}
            className="absolute p-2 text-gray-400 transition rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900">{t('chatBox.confirm_close.rate_chat_session')}</h3>
          <p className="mt-2 text-sm text-gray-500">
            {t('chatBox.confirm_close.rate_experience') || 'Tajribangizni baholang va fikr-mulohaza qoldiring'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block mb-4 text-sm font-semibold text-center text-gray-700">
              {t('ratings')} <span className="text-red-500">*</span>
            </label>

            <div className="flex justify-center mb-3 space-x-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeStars = hoveredStar || rating
                const isActive = star <= activeStars

                return (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform focus:outline-none hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors duration-200 ${
                        isActive ? `fill-current ${getStarColor(activeStars)}` : 'text-gray-300'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                )
              })}
            </div>

            <div className="flex justify-center h-10">
              <span
                className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200
                  ${
                    hoveredStar || rating
                      ? `${getRatingStyle(hoveredStar || rating)} opacity-100 scale-100`
                      : 'opacity-0 scale-95'
                  }
                `}
              >
                {getRatingText(hoveredStar || rating)}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700">
              {t('comment')} <span className="text-xs font-normal text-gray-500">({t('optional') || 'ixtiyoriy'})</span>
            </label>

            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                placeholder={t('chatBox.confirm_close.enter_feedback') || 'Fikr-mulohazangizni yozing...'}
              />
              <div className="absolute text-xs text-gray-400 bottom-3 right-3">{comment.length}/500</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setIsRatingModalOpen(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-100"
          >
            {t('cancel')}
          </button>

          <button
            onClick={() => closeMutation.mutate({ stars: rating, comment })}
            disabled={!rating || closeMutation.isPending}
            className="px-6 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 disabled:opacity-50"
          >
            {closeMutation.isPending
              ? t('chatBox.confirm_close.submitting') || 'Yuborilmoqda...'
              : t('chatBox.chat_transfer.submit_and_close')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
