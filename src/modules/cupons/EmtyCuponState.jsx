import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

const EmptyCuponState = ({ onAddNew }) => {
  return (
    <div className="text-center py-16">
      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <PlusIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Kuponlar yo'q</h3>
      <p className="text-gray-600 mb-6">Birinchi kuponingizni yarating va boshqaring</p>
      <Button
        onPress={onAddNew}
        className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Birinchi kuponni yarating
      </Button>
    </div>
  )
}

export default EmptyCuponState
