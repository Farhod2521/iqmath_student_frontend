import { create } from 'zustand'
import LigaSeasonEmpty from '@/components/liga/LigaSeasonEmpty'
import { useGetQuery } from '@/hooks'
import { LigaHero } from './LigaParts'
import { API, isNumberGrade } from './utils'

export const MAIN_HERO = {
  image: '/images/league/trophy-hero.webp',
  width: 1000,
  height: 499,
  subtitle: "Sinflar bo'yicha matematika ligasi natijalari va statistikasi"
}

// Tanlangan mavsum Liga sahifalari orasida o'tganda ham saqlanadi
const useSeasonStore = create((set) => ({
  seasonId: null,
  setSeasonId: (seasonId) => set({ seasonId })
}))

export const useLigaSeason = () => {
  const { seasonId, setSeasonId } = useSeasonStore()
  const { data: seasonsResponse, refetch } = useGetQuery({ key: 'liga-seasons-admin', url: `${API}seasons/`, staleTime: 0, refetchOnMount: 'always' })
  const { data: metaResponse } = useGetQuery({ key: 'liga-meta', url: `${API}meta/` })

  const seasons = seasonsResponse?.data || []
  const grades = (metaResponse?.data?.grades || []).filter(isNumberGrade).sort((a, b) => Number(a.name) - Number(b.name))
  const season = seasons.find((item) => item.id === seasonId) || seasons[0]

  return { seasons, season, grades, setSeasonId, refetch, loaded: Boolean(seasonsResponse) }
}

export const SeasonSelect = ({ seasons, season, onChange }) => (
  <select
    value={season.id}
    onChange={(event) => onChange(Number(event.target.value))}
    className="h-11 rounded-full border border-[#EBEDF0] bg-white px-4 text-sm font-semibold text-[#191C1D] outline-none focus:border-[#5D87FF]"
  >
    {seasons.map((item) => (
      <option key={item.id} value={item.id}>
        {item.number}-mavsum{item.is_closed ? ' (yopilgan)' : ''}
      </option>
    ))}
  </select>
)

/** Liga ichki sahifasi: sarlavha, mavsum tanlash va mavsumga bog'liq jadval */
const LigaSeasonPage = ({ title, subtitle, children }) => {
  const { seasons, season, grades, setSeasonId, loaded } = useLigaSeason()

  return (
    <div className="flex flex-col gap-4">
      <LigaHero {...MAIN_HERO} title={title} subtitle={subtitle} />
      {season ? (
        <>
          <div className="flex justify-end">
            <SeasonSelect seasons={seasons} season={season} onChange={setSeasonId} />
          </div>
          {children(season, grades)}
        </>
      ) : loaded ? (
        <LigaSeasonEmpty
          title={['Hali', 'mavsum', "yo'q"]}
          text="Hozirda Matematika Ligasida faol mavsum mavjud emas. Yangi mavsum boshlanganda bu yerda testlar, reyting va natijalar paydo bo'ladi."
        />
      ) : (
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      )}
    </div>
  )
}

export default LigaSeasonPage
