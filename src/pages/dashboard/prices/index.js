import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { request } from '@/services/api'
import LayoutAdmin from '@/layout/LayoutAdmin'

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
  const [formData, setFormData] = useState({
    name: '',
    months: 1,
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
      months: 1,
      discount_percent: 0,
      price_per_month: '',
      is_active: true
    })
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
      months: plan.months,
      discount_percent: plan.discount_percent,
      price_per_month: plan.price_per_month,
      is_active: plan.is_active
    })
    setIsModalOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, ...formData })
    } else {
      createMutation.mutate(formData)
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <LayoutAdmin>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">Xatolik: {error.message}</div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Obuna Rejalari</h1>
            <p className="text-sm text-gray-600 mt-1">Barcha obuna rejalarini boshqaring</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yangi reja
          </button>
        </div>

        {/* Error Messages */}
        {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {createMutation.error?.message ||
              updateMutation.error?.message ||
              deleteMutation.error?.message ||
              'Xatolik yuz berdi'}
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{plan.months} oylik reja</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      plan.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {plan.is_active ? 'Faol' : 'Nofaol'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Oylik narx:</span>
                    <span className="font-semibold text-gray-900">
                      {parseFloat(plan.price_per_month).toLocaleString()} so'm
                    </span>
                  </div>

                  {plan.discount_percent > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Chegirma:</span>
                      <span className="font-semibold text-green-600">{plan.discount_percent}%</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Jami narx:</span>
                      <div className="text-right">
                        {plan.discount_percent > 0 && (
                          <div className="text-xs text-gray-400 line-through">
                            {(parseFloat(plan.price_per_month) * plan.months).toLocaleString()} so'm
                          </div>
                        )}
                        <div className="text-lg font-bold text-blue-600">
                          {parseFloat(
                            calculateTotalPrice(plan.months, plan.price_per_month, plan.discount_percent)
                          ).toLocaleString()}{' '}
                          so'm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 flex gap-2">
                <button
                  onClick={() => openEditModal(plan)}
                  disabled={isDeleting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  disabled={isDeleting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hozircha obuna rejalari yo'q</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPlan ? 'Rejani tahrirlash' : 'Yangi reja yaratish'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reja nomi</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Premium 3 oylik"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oylar soni</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oylik narx (so'm)</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chegirma (%)</label>
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Faol
                  </label>
                </div>

                {/* Preview */}
                {formData.price_per_month && formData.months && (
                  <div className="p-4 bg-blue-50 rounded-lg space-y-1">
                    <p className="text-sm text-gray-600">Jami narx:</p>
                    {formData.discount_percent > 0 && (
                      <p className="text-sm text-gray-400 line-through">
                        {(parseFloat(formData.price_per_month) * formData.months).toLocaleString()} so'm
                      </p>
                    )}
                    <p className="text-lg font-bold text-blue-600">
                      {parseFloat(
                        calculateTotalPrice(formData.months, formData.price_per_month, formData.discount_percent)
                      ).toLocaleString()}{' '}
                      so'm
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
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saqlanmoqda...' : editingPlan ? 'Saqlash' : 'Yaratish'}
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
