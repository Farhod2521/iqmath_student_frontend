// TODO: static placeholder data — swap for real API responses once tutor group/lesson
// tracking exists on the backend (tutor role currently only has referral/coupon data).

export const mockTutorStats = {
  groups_count: 4,
  groups_new_this_month: 1,
  active_students: 20,
  active_students_percent: 83,
  average_result_percent: 78,
  average_result_growth: 12,
  today_lessons: 2
}

export const mockTutorGroups = [
  { key: 1, name: 'Matematika-1', students_count: 8, progress: 75 },
  { key: 2, name: 'Matematika-2', students_count: 6, progress: 68 },
  { key: 3, name: 'Abituriyent', students_count: 7, progress: 82 },
  { key: 4, name: '9-sinf', students_count: 3, progress: 60 }
]

export const mockResultsChart = {
  labels: ['3 Nov', '10 Nov', '17 Nov', '24 Nov', '3 Dec'],
  values: [42, 55, 63, 70, 78]
}
