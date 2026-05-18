// components/BookFilter.jsx
import React, { useState } from 'react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useTranslation } from 'react-i18next'

const INITIAL_FILTERS = {
  category: '',
  status: '',
  tag: '',
  for_student: false,
  for_teacher: false
}

// ─── Reusable select wrapper ───────────────────────────────────────────────
const FilterSelect = ({ icon, name, value, onChange, children, disabled }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-400">{icon}</div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full pl-7 pr-6 py-2 text-[13px] text-slate-700 border border-slate-200 rounded-lg bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </select>
    <div className="absolute inset-y-0 flex items-center pointer-events-none right-2 text-slate-400">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  </div>
)

// ─── Custom checkbox pill ──────────────────────────────────────────────────
const CheckPill = ({ name, checked, onChange, label, activeClass }) => (
  <label
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-150 select-none ${
      checked ? activeClass : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
    }`}
  >
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only" />
    <div
      className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
        checked ? 'bg-current border-current' : 'border-slate-300 bg-white'
      }`}
    >
      {checked && (
        <svg className="w-2 h-2 text-white" fill="none" stroke="white" strokeWidth="3.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )}
    </div>
    <span className="text-[12px] font-semibold whitespace-nowrap">{label}</span>
  </label>
)

// ─── Active tag chip ───────────────────────────────────────────────────────
const ActiveTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="flex items-center justify-center flex-shrink-0 w-3 h-3 transition-colors duration-100 rounded-full hover:bg-indigo-200"
    >
      <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
)

// ─── Main BookFilter ───────────────────────────────────────────────────────
const BookFilter = ({ onFilterChange, initialFilters = {} }) => {
  const { t, i18n } = useTranslation()
  const [filters, setFilters] = useState({ ...INITIAL_FILTERS, ...initialFilters })
  const [isOpen, setIsOpen] = useState(true)

  // API dan kategoriyalar
  const { data: categoriesData, isLoading: catLoading } = useGetQuery({
    key: KEYS.libraryCategories,
    url: URLS.libraryCategories
  })

  // API dan teglar
  const { data: tagsData, isLoading: tagLoading } = useGetQuery({
    key: KEYS.libraryTags,
    url: URLS.libraryTags
  })

  const categories = categoriesData?.data || []
  const tags = tagsData?.data || []

  const activeCount = [filters.category, filters.status, filters.tag, filters.for_student, filters.for_teacher].filter(
    Boolean
  ).length

  const update = (newFilters) => {
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    update({ ...filters, [name]: type === 'checkbox' ? checked : value })
  }

  const removeFilter = (key, fallback = '') => {
    update({ ...filters, [key]: fallback })
  }

  const handleReset = () => update(INITIAL_FILTERS)

  // Status label for active tag display
  const STATUS_LABELS = {
    active: t('library.status.active'),
    inactive: t('library.status.inactive'),
    draft: t('library.status.draft')
  }

  return (
    <div className="mb-6 overflow-hidden bg-white border shadow-sm border-slate-200/80 rounded-2xl">
      {/* ── Header ──────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-between w-full px-4 py-3 transition-colors duration-150 hover:bg-slate-50"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-lg w-7 h-7 bg-indigo-50">
            <svg
              className="w-3.5 h-3.5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-slate-700">{t('library.filter.title')}</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation()
                handleReset()
              }}
              className="text-[12px] font-medium text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              {t('library.filter.clear')}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* ── Body ────────────────────────────────────────────── */}
      {isOpen && (
        <div className="px-4 pt-3 pb-4 space-y-3 border-t border-slate-100">
          {/* Row 1: Selects */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {/* Kategoriya select (API) */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-0.5">
                {t('library.filter.category_label')}
              </label>
              <FilterSelect
                name="category"
                value={filters.category}
                onChange={handleChange}
                disabled={catLoading}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                }
              >
                <option value="">
                  {catLoading ? t('library.filter.loading') : t('library.filter.category_placeholder')}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {i18n.language === 'uz' ? cat.name_uz : cat.name_ru || cat.name}
                  </option>
                ))}
              </FilterSelect>
            </div>

            {/* Teg select (API) */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-0.5">
                {t('library.filter.tag_label')}
              </label>
              <FilterSelect
                name="tag"
                value={filters.tag}
                onChange={handleChange}
                disabled={tagLoading}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                }
              >
                <option value="">
                  {tagLoading ? t('library.filter.loading') : t('library.filter.tag_placeholder')}
                </option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {i18n.language === 'uz' ? tag.name_uz : tag.name_ru || tag.name}
                  </option>
                ))}
              </FilterSelect>
            </div>

            {/* Status select */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-0.5">Status</label>
              <FilterSelect
                name="status"
                value={filters.status}
                onChange={handleChange}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              >
                <option value="">{t('library.filter.status_placeholder')}</option>
                <option value="active">{t('library.status.active')}</option>
                <option value="inactive">{t('library.status.inactive')}</option>
                <option value="draft">{t('library.status.draft')}</option>
              </FilterSelect>
            </div>
          </div>

          {/* Row 2: Audience checkboxes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-0.5">
              {t('library.filter.audience_label')}:
            </span>
            <CheckPill
              name="for_student"
              checked={filters.for_student}
              onChange={handleChange}
              label={t('students')}
              activeClass="bg-sky-50 border-sky-300 text-sky-700"
            />
            <CheckPill
              name="for_teacher"
              checked={filters.for_teacher}
              onChange={handleChange}
              label={t('tutors')}
              activeClass="bg-violet-50 border-violet-300 text-violet-700"
            />
          </div>

          {/* Row 3: Active filter chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              {filters.category && (
                <ActiveTag
                  label={`${categories.find((c) => String(c.id) === String(filters.category))?.name_uz || 'Kategoriya'}`}
                  onRemove={() => removeFilter('category')}
                />
              )}
              {filters.tag && (
                <ActiveTag
                  label={`${tags.find((t) => String(t.id) === String(filters.tag))?.name_uz || 'Teg'}`}
                  onRemove={() => removeFilter('tag')}
                />
              )}
              {filters.status && (
                <ActiveTag
                  label={STATUS_LABELS[filters.status] || filters.status}
                  onRemove={() => removeFilter('status')}
                />
              )}
              {filters.for_student && (
                <ActiveTag label={t('students')} onRemove={() => removeFilter('for_student', false)} />
              )}
              {filters.for_teacher && (
                <ActiveTag label={t('tutors')} onRemove={() => removeFilter('for_teacher', false)} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BookFilter
