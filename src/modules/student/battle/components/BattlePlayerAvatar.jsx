const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-violet-400 to-violet-600',
  'from-pink-400 to-pink-600',
  'from-emerald-400 to-emerald-600',
  'from-cyan-400 to-cyan-600',
  'from-indigo-400 to-indigo-600',
  'from-rose-400 to-rose-600',
  'from-teal-400 to-teal-600'
]

const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() || '?'
const getColor = (name) => AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length]

const BattlePlayerAvatar = ({ name, size = 56, ringColor }) => (
  <div
    style={{ width: size, height: size, border: ringColor ? `3px solid ${ringColor}` : undefined }}
    className={`flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br font-bold text-white ${getColor(
      name
    )}`}
  >
    <span style={{ fontSize: size * 0.4 }}>{getInitial(name)}</span>
  </div>
)

export default BattlePlayerAvatar
