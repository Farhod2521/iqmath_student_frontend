// TODO: static placeholder data — swap for real API responses once tutor group/lesson
// tracking exists on the backend (tutor profile endpoint currently returns identity fields only).

export const mockProfileStatsByPeriod = {
  7: {
    students: 6,
    students_growth: 1,
    groups: 4,
    groups_growth: 0,
    lessons: 8,
    lessons_growth: 3,
    average_result_percent: 74,
    average_result_growth: 2
  },
  30: {
    students: 24,
    students_growth: 3,
    groups: 4,
    groups_growth: 1,
    lessons: 32,
    lessons_growth: 12,
    average_result_percent: 78,
    average_result_growth: 5
  },
  90: {
    students: 41,
    students_growth: 9,
    groups: 6,
    groups_growth: 2,
    lessons: 96,
    lessons_growth: 27,
    average_result_percent: 81,
    average_result_growth: 8
  }
}

export const mockProfileActivity = [
  { key: 'student', type: 'student', subtitle: 'Aliyev Behruz', hours: 2 },
  { key: 'group', type: 'group', subtitle: 'Matematika-2', hours: 5 },
  { key: 'coupon', type: 'coupon', subtitle: 'IQMATH2025', days: 1 },
  { key: 'payment', type: 'payment', subtitle: "O'quvchi: Karimova Sevinch", days: 1 }
]
