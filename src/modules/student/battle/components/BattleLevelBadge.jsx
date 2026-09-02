// 1 = gray, 2 = green, then a steady climb through blue/purple/orange to a
// gold top tier — each level visually distinct from its neighbor.
export const LEVEL_COLORS = {
  1: '#9ca3af',
  2: '#22c55e',
  3: '#16a34a',
  4: '#0ea5e9',
  5: '#2563eb',
  6: '#7c3aed',
  7: '#a855f7',
  8: '#f97316',
  9: '#ea580c',
  10: '#f59e0b'
}

const BattleLevelBadge = ({ level, size = 'md' }) => {
  const color = LEVEL_COLORS[level] || '#9ca3af'
  const dims = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'

  if (!level) {
    return (
      <span className={`inline-flex items-center justify-center ${dims} rounded-lg bg-gray-100 text-gray-400 font-bold`}>
        ?
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${dims} rounded-lg font-extrabold text-white shrink-0`}
      style={{ background: color }}
    >
      {level}
    </span>
  )
}

export default BattleLevelBadge
