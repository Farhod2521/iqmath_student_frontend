// pages/admin/library/index.js (yoki pages/kutubxona/index.js)
import React, { useState, useMemo } from 'react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { useTranslation } from 'react-i18next'
import BookFilter from '@/modules/library/components/BookFilter'
import BookCard from '@/modules/library/components/BookCard'
import MyPurchasedBooks from '@/modules/library/components/MyPurchasedBooks'
import toast from 'react-hot-toast'

const LibraryPage = () => {
  const [filters, setFilters] = useState({})
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'purchased'
  const { t } = useTranslation()

  const {
    data: libraryBooks,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.libraryBooks,
    url: URLS.libraryBooks
  })

  // Sotib olingan kitoblar — /api/v1/book/my-purchases/
  const {
    data: purchasedData,
    isLoading: isPurchasesLoading,
    isFetching: isPurchasesFetching
  } = useGetQuery({
    key: KEYS.bookMyPurchases,
    url: URLS.bookMyPurchases
  })

  const data = libraryBooks?.data
  const purchases = purchasedData?.data

  const purchasedCount = (purchases?.online_count || 0) + (purchases?.offline_count || 0)

  // Allaqachon sotib olingan kitoblarning id lari — kartada belgilash uchun
  const purchasedBookIds = useMemo(() => {
    const list = [...(purchases?.online_books || []), ...(purchases?.offline_books || [])]
    return new Set(list.map((item) => item?.book?.id).filter(Boolean))
  }, [purchases])

  // Filterlangan kitoblar
  const filteredBooks = useMemo(() => {
    if (!data?.results) return []

    let books = [...data?.results]

    // Kategoriya bo'yicha filter
    if (filters.category) {
      books = books.filter(
        (book) =>
          book.category?.id === parseInt(filters.category) ||
          book.category?.name?.toLowerCase().includes(filters.category.toLowerCase())
      )
    }

    // Status bo'yicha filter
    if (filters.status) {
      books = books.filter((book) => book.status === filters.status)
    }

    // Teg bo'yicha filter
    if (filters.tag) {
      books = books.filter((book) =>
        book.tags?.some(
          (tag) => tag.id === parseInt(filters.tag) || tag.name?.toLowerCase().includes(filters.tag.toLowerCase())
        )
      )
    }

    // Student uchun filter
    if (filters.for_student) {
      books = books.filter((book) => book.for_student === true)
    }

    // O'qituvchi uchun filter
    if (filters.for_teacher) {
      books = books.filter((book) => book.for_teacher === true)
    }

    return books
  }, [data?.results, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleBuyBook = (book) => {
    toast.success(book?.detail)
  }

  const TABS = [
    { key: 'all', label: t('library.allBooks'), count: data?.results?.length },
    { key: 'purchased', label: t('library.myBooks'), count: purchasedCount }
  ]

  if (isLoading) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('library.page_title')} />
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('library.page_title')} />

      <div className="pt-4">
        {/* Tablar: Barcha kitoblar / Mening kitoblarim */}
        <div className="flex items-center gap-1 p-1 mb-5 bg-gray-100 rounded-xl w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                activeTab === tab.key
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                    activeTab === tab.key ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'purchased' ? (
          <MyPurchasedBooks data={purchases} isLoading={isPurchasesLoading || isPurchasesFetching} />
        ) : (
          <>
            {/* Filter qismi */}
            <BookFilter onFilterChange={handleFilterChange} />

            {/* Natijalar soni */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                {filteredBooks.length} {t('library.results.count')}
              </p>
              {isFetching && <span className="text-sm text-gray-500">{t('library.results.updating')}</span>}
            </div>

            {/* Kitoblar grid ko'rinishida */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBuy={handleBuyBook}
                    isPurchased={purchasedBookIds.has(book.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center rounded-lg bg-gray-50">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">{t('library.empty.title')}</h3>
                <p className="mt-1 text-sm text-gray-500">{t('library.empty.description')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default LibraryPage
