/**
 * Login'dan keyin avtomatik chiqadigan oynalar navbati (kundalik mukofot, obuna taklifi va h.k.).
 * Bir vaqtda faqat bittasi ochiladi; yopilgach navbatdagisi chiqadi.
 *
 *   const cancel = requestModal('daily-reward', () => setOpen(true))
 *   ...yopilganda: releaseModal('daily-reward')
 */
let active = null
let waiters = []

export function requestModal(id, open) {
  if (!active || active === id) {
    active = id
    open()
    return () => {}
  }
  const waiter = { id, open }
  waiters.push(waiter)
  return () => {
    waiters = waiters.filter((item) => item !== waiter)
  }
}

export function releaseModal(id) {
  if (active !== id) return
  active = null
  const next = waiters.shift()
  if (next) {
    active = next.id
    next.open()
  }
}
