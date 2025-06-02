export const groupSubjectsByType = (data, language) => {
  const types = [...new Set(data.map((i) => (language === 'uz' ? i.name_uz : i.name_ru)))]
  return types.map((type) => ({
    type,
    data: data.filter((j) => j.name_uz === type || j.name_ru === type)
  }))
}
