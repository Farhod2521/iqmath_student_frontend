import { Award, Calendar } from 'lucide-react'

export function SubjectCard({ subject, language, trend, getTrendIcon, getTrendText, getAverageProgress }) {
  const getGradeColor = (percent) => {
    if (percent >= 70) return 'text-green-600 bg-green-50'
    if (percent >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {language === 'uz' ? subject.class_uz : subject.class_ru}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {subject.class_name}-{language === 'uz' ? 'sinf' : 'класс'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            {getTrendIcon(trend)}
            <span className="text-sm font-medium text-gray-700">{getTrendText(trend)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award
                className={`w-5 h-5 ${
                  subject.progress_percent >= 70
                    ? 'text-green-500'
                    : subject.progress_percent >= 40
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              />
              <span className="text-sm text-gray-600">
                {language === 'uz' ? 'Oxirgi natija' : 'Последний результат'}
              </span>
            </div>
            <span className={`text-2xl font-bold ${getGradeColor(subject.progress_percent).split(' ')[0]}`}>
              {subject.progress_percent}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                subject.progress_percent >= 70
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : subject.progress_percent >= 40
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${subject.progress_percent}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                {language === 'uz' ? 'Topshirgan soni' : 'Количество попыток'}
              </p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                {subject.progress_history.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">
                {language === 'uz' ? "O'rtacha natija" : 'Средний результат'}
              </p>
              <p className="text-lg font-semibold text-gray-900">{getAverageProgress(subject.progress_history)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
