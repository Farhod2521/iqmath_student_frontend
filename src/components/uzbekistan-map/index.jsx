import { useMemo } from 'react'
import { regionsUz } from '@/data/region'
import { UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths } from '@/data/uzbekistanMapPaths'

const normalize = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .replace(/[ʻʼ'’`]/g, '')
    .trim()

const stripSuffix = (str = '') =>
  normalize(str)
    .replace(/\s*(respublikasi|viloyati|shahri|tumani)\s*$/, '')
    .trim()

const regionNameById = regionsUz.regions.reduce((acc, region) => {
  acc[region.id] = region.name
  return acc
}, {})

const UzbekistanMap = ({ regionName, className }) => {
  const exact = useMemo(() => normalize(regionName), [regionName])
  const base = useMemo(() => stripSuffix(regionName), [regionName])

  return (
    <svg viewBox={UZBEKISTAN_MAP_VIEWBOX} className={className} role="img" aria-label="O'zbekiston xaritasi">
      {uzbekistanMapPaths.map((region) => {
        if (region.pathId === 'aral-sea') {
          return <path key={region.pathId} d={region.d} fill="#dbeafe" stroke="#ffffff" strokeWidth={0.6} />
        }

        const name = regionNameById[region.regionId] || ''
        const isActive = !!regionName && (normalize(name) === exact || (!!base && stripSuffix(name) === base))

        return (
          <path
            key={region.pathId}
            d={region.d}
            fill={isActive ? '#2563eb' : '#e5e7eb'}
            stroke="#ffffff"
            strokeWidth={1}
            style={{ transition: 'fill 0.3s ease' }}
          >
            <title>{name}</title>
          </path>
        )
      })}
    </svg>
  )
}

export default UzbekistanMap
