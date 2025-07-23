import * as XLSX from 'xlsx'

export const exportToExcel = (data, filename = 'export.xlsx') => {
  try {
    // Ma'lumotlarni Excel formatiga moslashtiramiz
    const worksheet = XLSX.utils.json_to_sheet(data)
    
    // Workbook yaratamiz
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    
    // Excel faylini yuklab olish
    XLSX.writeFile(workbook, filename)
    
    return true
  } catch (error) {
    console.error('Excel export xatosi:', error)
    return false
  }
}

// O'quvchilar ma'lumotlarini Excel formatiga o'tkazish
export const formatStudentsForExcel = (students) => {
  return students.map((student, index) => ({
    '№': index + 1,
    'O\'quvchi': student.full_name || '',
    'Sinf': student.class_name_uz || '',
    'Telefon': student.phone || '',
    'Viloyat': student.region || '',
    'ID': student.id || ''
  }))
} 