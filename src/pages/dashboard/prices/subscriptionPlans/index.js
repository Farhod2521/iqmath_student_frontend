import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { request } from '@/services/api'
import LayoutAdmin from '@/layout/LayoutAdmin'
import SubscriptionPlansGrid from './components/SubscriptionPlansGrid'
import { useTranslation } from 'react-i18next'

const commonAPI = {
  getCategories: async () => {
    const { data } = await request.get('/api/v1/payments/superadmin/subscription-categories/')
    return data
  },
  getBenefites: async () => {
    const { data } = await request.get('/api/v1/payments/superadmin/subscription-benefits/')
    return data
  }
}

// API functions
const subscriptionAPI = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/payments/superadmin/subscription-plan/')
    return data
  },

  create: async (planData) => {
    const { data } = await request.post('/api/v1/payments/superadmin/subscription-plan/', planData)
    return data
  },

  update: async ({ id, ...planData }) => {
    const { data } = await request.put(`/api/v1/payments/superadmin/subscription-plan/${id}/`, planData)
    return data
  },

  delete: async (id) => {
    const { data } = await request.delete(`/api/v1/payments/superadmin/subscription-plan/${id}/`)
    return data
  }
}

export default function SubscriptionPlans() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [selectedBenefits, setSelectedBenefits] = useState([])
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    months: 1,
    category: '',
    discount_percent: 0,
    price_per_month: '',
    is_active: true
  })

  // Fetch plans
  const {
    data: plans = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionAPI.getAll,
    refetchOnWindowFocus: false
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['subscription-categories'],
    queryFn: commonAPI.getCategories,
    refetchOnWindowFocus: false
  })

  const { data: allBenefits = [] } = useQuery({
    queryKey: ['subscription-benefites'],
    queryFn: commonAPI.getBenefites,
    refetchOnWindowFocus: false
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: subscriptionAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-plans'])
      setIsModalOpen(false)
      resetForm()
    }
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: subscriptionAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-plans'])
      setIsModalOpen(false)
      resetForm()
    }
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: subscriptionAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-plans'])
    }
  })

  function resetForm() {
    setFormData({
      name: '',
      category: '',
      months: 1,
      discount_percent: 0,
      price_per_month: '',
      is_active: true
    })
    setSelectedBenefits([])
    setEditingPlan(null)
  }

  function openCreateModal() {
    resetForm()
    setIsModalOpen(true)
  }

  function openEditModal(plan) {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      category: plan.category?.id,
      months: plan.months,
      discount_percent: plan.discount_percent,
      price_per_month: plan.price_per_month,
      is_active: plan.is_active
    })

    // Tanlangan benefit ID larini o'rnatish (faqat is_selected: true bo'lganlar)
    const selectedBenefitIds =
      plan.benefits?.filter((benefit) => benefit.is_selected)?.map((benefit) => benefit.id) || []
    setSelectedBenefits(selectedBenefitIds)

    setIsModalOpen(true)
  }

  function handleToggleBenefit(benefitId) {
    setSelectedBenefits((prev) => {
      if (prev.includes(benefitId)) {
        return prev.filter((id) => id !== benefitId)
      } else {
        return [...prev, benefitId]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const submitData = {
      ...formData,
      name: formData.name || null, // name null bo'lishi mumkin
      months: formData.months,
      discount_percent: formData.discount_percent,
      price_per_month: formData.price_per_month,
      is_active: formData.is_active
    }

    // Faqat tahrirlashda category va benefits qo'shamiz
    if (editingPlan) {
      // Category faqat tanlangan bo'lsa yuboriladi
      if (formData.category) {
        submitData.category = formData.category
      }

      // Benefits yuboriladi
      submitData.benefits = selectedBenefits
    } else {
      // Yangi yaratishda category va benefits yuborilmaydi
      submitData.category = formData.category || null
      submitData.benefits = []
    }

    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, ...submitData })
    } else {
      createMutation.mutate(submitData)
    }
  }

  function handleDelete(id) {
    if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      deleteMutation.mutate(id)
    }
  }

  function calculateTotalPrice(months, pricePerMonth, discount) {
    const total = parseFloat(pricePerMonth) * months
    const discountedTotal = total * (1 - discount / 100)
    return discountedTotal.toFixed(2)
  }

  function handleInputChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending
  const isDeleting = deleteMutation.isPending

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <LayoutAdmin>
        <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
          <div className="p-4 text-red-700 border border-red-200 rounded-lg bg-red-50">Xatolik: {error.message}</div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('subscriptionPlans')}</h1>
            <p className="mt-1 text-sm text-gray-600">{t('ManageSubscriptionPlans')}</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            {t('newPlans')}
          </button>
        </div>

        {/* Error Messages */}
        {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
          <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
            {createMutation.error?.message ||
              updateMutation.error?.message ||
              deleteMutation.error?.message ||
              t('errorTitle')}
          </div>
        )}

        {/* Plans Grid */}

        <SubscriptionPlansGrid plans={plans} onEdit={openEditModal} onDelete={handleDelete} isDeleting={isDeleting} />

        {plans.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">{t('NoSubscriptionPlans')}</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPlan ? t('plansEdit') : t('newPlansCreate')}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                  className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">{t('planName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Premium 3 oylik"
                  />
                </div>
                {/* Faqat tahrirlashda kategoriya ko'rsatiladi */}
                {editingPlan && categories.length > 0 && (
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">{t('categoryOptional')}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t('selectCategory')}</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {i18n.language === 'uz' ? category.title_uz : category.title_ru}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">{t('numberMonths')}</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.months}
                    onChange={(e) => handleInputChange('months', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">{t('monthlyPrice')}</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price_per_month}
                    onChange={(e) => handleInputChange('price_per_month', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000.00"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">{t('discount')} (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.discount_percent}
                    onChange={(e) => handleInputChange('discount_percent', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                {/* Faqat tahrirlashda imtiyozlar ko'rsatiladi */}
                {editingPlan && allBenefits.length > 0 && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">{t('benefits')}</label>
                    <div className="space-y-2 overflow-y-auto max-h-40">
                      {allBenefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          className="flex items-center gap-3 p-3 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => handleToggleBenefit(benefit.id)}
                        >
                          <div
                            className={`flex items-center justify-center w-5 h-5 border rounded ${
                              selectedBenefits.includes(benefit.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                            }`}
                          >
                            {selectedBenefits.includes(benefit.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {i18n.language === 'uz' ? benefit.title_uz : benefit.title_ru}
                            </p>
                            {benefit.description && <p className="text-xs text-gray-500">{benefit.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {t('selectedBenefits')}: {selectedBenefits.length}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    {t('active')}
                  </label>
                </div>

                {/* Preview */}
                {formData.price_per_month && formData.months && (
                  <div className="p-4 space-y-1 rounded-lg bg-blue-50">
                    <p className="text-sm text-gray-600">{t('totalPrice')}:</p>
                    {formData.discount_percent > 0 && (
                      <p className="text-sm text-gray-400 line-through">
                        {(parseFloat(formData.price_per_month) * formData.months).toLocaleString()} so'm
                      </p>
                    )}
                    <p className="text-lg font-bold text-blue-600">
                      {parseFloat(
                        calculateTotalPrice(formData.months, formData.price_per_month, formData.discount_percent)
                      ).toLocaleString()}{' '}
                      {t('sum')}
                    </p>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      resetForm()
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Loading...' : editingPlan ? t('save') : t('create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}
