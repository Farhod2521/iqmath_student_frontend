import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { request } from '@/services/api'
import { Pencil, Trash2, Plus, Sparkles, X } from 'lucide-react'

const subscriptionAPI = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/payments/superadmin/subscription-categories/')
    return data
  },
  create: async (payload) => {
    const { data } = await request.post('/api/v1/payments/superadmin/subscription-categories/', payload)
    return data
  },
  update: async ({ id, ...payload }) => {
    const { data } = await request.put(`/api/v1/payments/superadmin/subscription-categories/${id}/`, payload)
    return data
  },
  delete: async (id) => {
    await request.delete(`/api/v1/payments/superadmin/subscription-categories/${id}/`)
  }
}

export default function Category() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title_uz: '',
    title_ru: '',
    slug: '',
    is_active: true
  })

  const {
    data: categories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['subscription-categories'],
    queryFn: subscriptionAPI.getAll,
    refetchOnWindowFocus: false
  })

  const createMutation = useMutation({
    mutationFn: subscriptionAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-categories'])
      resetForm()
    }
  })

  const updateMutation = useMutation({
    mutationFn: subscriptionAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-categories'])
      resetForm()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: subscriptionAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscription-categories'])
    }
  })

  const resetForm = () => {
    setOpen(false)
    setEditing(null)
    setForm({
      title_uz: '',
      title_ru: '',
      slug: '',
      is_active: true
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form })
    } else {
      createMutation.mutate(form)
    }
  }

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
        <div className="p-4 text-red-600">Xatolik: {error.message}</div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center sm:gap-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Obuna Kategoriyalari</h1>
            </div>
            <p className="text-sm text-gray-600 sm:text-base">Barcha obuna rejalari uchun kategoriyalarni boshqaring</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all sm:px-4 sm:py-3 sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Yangi Kategoriya
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-scroll sm:overflow-x-auto ">
          <table className="w-full min-w-[600px] sm:min-w-full text-sm sm:text-base border-collapse">
            <thead className="top-0 z-10 bg-gray-100 ">
              <tr>
                <th className="p-2 text-left sm:p-3">Title (UZ)</th>
                <th className="p-2 text-left sm:p-3">Title (RU)</th>
                <th className="p-2 text-left sm:p-3">Slug</th>
                <th className="p-2 text-center sm:p-3">{t('status')}</th>
                <th className="p-2 text-center sm:p-3">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2 sm:p-3">{item.title_uz}</td>
                  <td className="p-2 sm:p-3">{item.title_ru}</td>
                  <td className="p-2 text-gray-500 sm:p-3">{item.slug}</td>
                  <td className="p-2 text-center sm:p-3">{item.is_active ? '✅' : '❌'}</td>
                  <td className="p-2 sm:p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditing(item)
                          setForm(item)
                          setOpen(true)
                        }}
                        className="p-2 border rounded"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="p-2 text-red-600 border rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!categories.length && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    {benefits.length > 0 && (
                      <tr>
                        <td colSpan="6" className="p-6 text-center text-gray-400">
                          <div className="w-full p-8 text-center bg-white border border-gray-200 rounded-2xl ">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                              Hozircha kategoriyalar mavjud emas
                            </h3>
                            <p className="mb-6 text-gray-600">'Obuna rejalari uchun birinchi kategoriyani yarating</p>

                            <button
                              onClick={() => {
                                setEditing(null)
                                setOpen(true)
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg sm:py-3 sm:px-6 hover:bg-blue-700"
                            >
                              <Plus className="w-5 h-5" />
                              Birinchi kategoriyani yarating
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 sm:p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md p-4 bg-white shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:p-6 md:p-8 rounded-xl"
            >
              <div className="flex flex-col items-start justify-between gap-3 mb-6 sm:flex-row sm:items-center sm:gap-0">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {editing ? 'Kategoriyani Tahrirlash' : 'Yangi Kategoriya'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 sm:text-base">
                    {editing ? 'Kategoriyani yangilash' : 'Yangi kategoriya yaratish'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 sm:text-base">Sarlavha (Uz) *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 sm:px-4 sm:py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-base"
                    value={form.title_uz}
                    onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 sm:text-base">Sarlavha (Ru) *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 sm:px-4 sm:py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-base"
                    value={form.title_ru}
                    onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 sm:text-base">Slug</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 sm:px-4 sm:py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-base"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                  />
                </div>

                <div className="p-3 mb-4 border border-gray-200 sm:p-4 rounded-xl">
                  <div className="flex items-center">
                    <input
                      id="is_active"
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer sm:w-5 sm:h-5 focus:ring-blue-500"
                    />

                    <div className="ml-2 sm:ml-3">
                      <label htmlFor="is_active" className="text-sm font-medium text-gray-700 sm:text-base">
                        Faol holatda
                      </label>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        Agar belgilansa, kategoriya foydalanuvchilarga ko'rinadi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2 mt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm sm:w-auto sm:px-6 sm:py-3 sm:text-base rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm sm:w-auto sm:px-6 sm:py-3 sm:text-base rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}
