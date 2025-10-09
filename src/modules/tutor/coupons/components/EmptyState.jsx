import { Users2Icon } from 'lucide-react'

const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Users2Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Kupondan foydalanga o'quvchilar yo'q</h3>
      <p className="text-gray-600 mb-6">Bu sahifada kupondan foydalangan o'quvchilar ro'yxati chiqadi</p>
    </div>
  )
}

export default EmptyState
