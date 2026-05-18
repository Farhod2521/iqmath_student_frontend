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

const LibraryPage = () => {
  const [filters, setFilters] = useState({})
  const { t } = useTranslation()

  const {
    data: libraryBooks,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.libraryBooks,
    url: URLS.libraryBooks
  })

  console.log('Library Books Data:', libraryBooks)

  // Filterlangan kitoblar
  const filteredBooks = useMemo(() => {
    if (!libraryBooks?.data) return []

    let books = [...libraryBooks.data]

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
  }, [libraryBooks?.data, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleBuyBook = (book) => {
    // Sotib olish logikasi
    console.log('Sotib olinayotgan kitob:', book)
    // Bu yerda modal ochish yoki API call qilish mumkin
    // alert(`${book.name_uz || book.name} kitobini sotib olish uchun tizimga murojaat qiling`)
  }

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

      <div className="p-4">
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
              <BookCard key={book.id} book={book} onBuy={handleBuyBook} />
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
      </div>
    </LayoutAdmin>
  )
}

export default LibraryPage
