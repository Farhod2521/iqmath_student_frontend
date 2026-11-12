import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowRight, CalendarCheck, ClipboardList, Gift, Trophy, X } from 'lucide-react'
import toast from 'react-hot-toast'
import LigaJoinModal from '@/components/liga/LigaJoinModal'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { releaseModal, requestModal } from '@/utils/modalQueue'
import { LIGA_JOINED_EVENT } from '@/modules/student/daily-reward/DailyRewardModal'

const MODAL_ID = 'liga-announce'

const TEXT = {
  uz: {
    badge: 'Yangi mavsum boshlandi!',
    title: (n) => `Matematik Liga — ${n}-mavsum ochildi`,
    text: 'Ligaga qo‘shiling, har hafta test ishlang, sinfingiz reytingida yuqoriga ko‘tariling va sovg‘alarni yutib oling!',
    weeks: (n) => `${n} hafta`,
    weekly: 'Haftalik testlar',
    prizes: 'Sovg‘alar',
    gol: 'Har kuni +1 gol',
    join: 'Ishtirok etish',
    pay: 'Tarifni tanlash',
    needPay: 'Ligada qatnashish uchun obuna faol bo‘lishi kerak.',
    later: 'Keyinroq',
    joined: 'Ligaga qo‘shildingiz! Omad!'
  },
  ru: {
    badge: 'Начался новый сезон!',
    title: (n) => `Математическая лига — открыт сезон ${n}`,
    text: 'Вступайте в лигу, проходите тесты каждую неделю, поднимайтесь в рейтинге своего класса и выигрывайте призы!',
    weeks: (n) => `${n} нед.`,
    weekly: 'Еженедельные тесты',
    prizes: 'Призы',
    gol: 'Каждый день +1 гол',
    join: 'Участвовать',
    pay: 'Выбрать тариф',
    needPay: 'Для участия в лиге нужна активная подписка.',
    later: 'Позже',
    joined: 'Вы вступили в лигу! Удачи!'
  }
}

const today = () => new Date().toISOString().slice(0, 10)

/**
 * Mavsum ochiq deb e'lon qilinganda ligaga qo'shilmagan o'quvchiga chiqadigan oyna.
 * "Ishtirok etish" → sinf tanlash oynasi → ligaga qo'shiladi (bugungi gol ham shu zahoti beriladi).
 * Kuniga bir marta ko'rsatiladi; liga sahifalarida chiqmaydi (u yerda qo'shilish kartasi bor).
 */
export default function LigaAnnounceModal() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [grades, setGrades] = useState([])

  const onLigaPage = router.pathname.startsWith('/dashboard/student/liga')
  const { data: response } = useGetQuery({ key: 'liga-current', url: URLS.ligaCurrent, enabled: !onLigaPage })
  const data = response?.data
  const season = data?.season
  const userId = session?.id || session?.user?.id || 'user'
  const storageKey = season ? `iq_liga_announce_${userId}_${season.id}` : null

  const eligible = Boolean(season) && !season.is_closed && data && data.joined === false && !onLigaPage

  useEffect(() => {
    if (!eligible || !storageKey) return undefined
    try {
      if (localStorage.getItem(storageKey) === today()) return undefined
    } catch {}
    let alive = true
    const cancel = requestModal(MODAL_ID, () => {
      if (!alive) return
      try {
        localStorage.setItem(storageKey, today())
      } catch {}
      setOpen(true)
    })
    return () => {
      alive = false
      cancel()
    }
  }, [eligible, storageKey])

  const close = useCallback(() => {
    setOpen(false)
    setJoinOpen(false)
    releaseModal(MODAL_ID)
  }, [])

  useEffect(() => {
    if (!open || joinOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, joinOpen, close])

  const openJoin = async () => {
    let list = data?.grades || []
    if (!list.length) {
      // Eski backend `grades` yubormasa — umumiy sinflar ro'yxati
      try {
        const { data: classes } = await request.get('/api/v1/auth/class/class_name_listview/')
        const order = (item) => parseInt(String(item.name).match(/\d+/)?.[0] || '999', 10)
        list = [...(classes || [])].sort((a, b) => order(a) - order(b))
      } catch {}
    }
    setGrades(list)
    setJoinOpen(true)
  }

  const join = async (grade) => {
    setBusy(true)
    try {
      await request.post(`/api/v1/liga/seasons/${season.id}/join/`, { grade, accept_rules: true })
      toast.success(text.joined)
      close()
      queryClient.invalidateQueries(['liga-current'])
      window.dispatchEvent(new Event(LIGA_JOINED_EVENT))
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Xatolik')
    } finally {
      setBusy(false)
    }
  }

  if (!open || !season || typeof document === 'undefined') return null

  const features = [
    [CalendarCheck, text.weeks(season.weeks_count)],
    [ClipboardList, text.weekly],
    [Gift, text.prizes],
    [Trophy, text.gol]
  ]

  return (
    <>
      {!joinOpen
        ? createPortal(
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0B1B3F]/55 p-4 backdrop-blur-[2px]" onClick={close}>
              <div
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
                className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(11,27,63,0.6)]"
              >
                <button
                  onClick={close}
                  aria-label="Yopish"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#475569] transition hover:bg-white"
                >
                  <X size={18} />
                </button>

                <div className="relative flex flex-col items-center bg-gradient-to-b from-[#E8F1FF] via-[#F3F8FF] to-white px-6 pb-2 pt-7 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1F7AEC] px-3 py-1 text-xs font-bold text-white shadow-[0_8px_18px_-10px_rgba(31,122,236,0.9)]">
                    <Trophy size={13} />
                    {text.badge}
                  </span>
                  <Image
                    src="/images/league/join-trophy.webp"
                    alt=""
                    width={150}
                    height={150}
                    className="mt-3 h-[130px] w-auto animate-[pulse_3s_ease-in-out_infinite] object-contain drop-shadow-[0_18px_24px_rgba(245,158,11,0.35)]"
                    priority
                  />
                </div>

                <div className="px-6 pb-6 text-center">
                  <h2 className="text-xl font-extrabold leading-tight text-[#191C1D] sm:text-2xl">{text.title(season.number)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{text.text}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {features.map(([Icon, label]) => (
                      <div key={label} className="flex items-center gap-2 rounded-2xl bg-[#F7FAFE] px-3 py-2.5 text-left">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1F7AEC]">
                          <Icon size={17} />
                        </span>
                        <span className="text-[13px] font-semibold text-[#191C1D]">{label}</span>
                      </div>
                    ))}
                  </div>

                  {!data.subscription_active ? <p className="mt-3 text-xs font-medium text-[#B45309]">{text.needPay}</p> : null}

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={close}
                      className="h-12 flex-1 rounded-2xl bg-[#F1F5FB] text-sm font-semibold text-[#475569] transition hover:bg-[#E6ECF5]"
                    >
                      {text.later}
                    </button>
                    {data.subscription_active ? (
                      <button
                        onClick={openJoin}
                        className="inline-flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B8BFF] to-[#1F6FE5] text-sm font-bold text-white shadow-[0_14px_26px_-14px_rgba(31,122,236,0.95)] transition hover:brightness-105"
                      >
                        {text.join}
                        <ArrowRight size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          close()
                          router.push('/prices')
                        }}
                        className="inline-flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B8BFF] to-[#1F6FE5] text-sm font-bold text-white"
                      >
                        {text.pay}
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      <LigaJoinModal
        open={joinOpen}
        lang={lang}
        grades={grades}
        initialGrade={data?.profile_grade_id}
        busy={busy}
        onConfirm={join}
        onClose={() => setJoinOpen(false)}
      />
    </>
  )
}
