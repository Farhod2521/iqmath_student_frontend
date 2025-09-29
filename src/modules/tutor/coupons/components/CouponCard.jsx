import { Card, Button } from '@heroui/react'
import TrashIcon from '@/components/icons/trash'
import EditIcon from '@/components/icons/edit'

const CouponCard = ({ coupon, onEdit, onDelete, isDeleting }) => {
  return (
    <Card className="border border-[#E9E9E9] rounded-[12px] p-6 hover:shadow-lg transition-all duration-300 hover:border-[#5d87ff]/30 bg-white">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-[#5d87ff] to-[#4a6bcc] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {coupon.code}
            </div>
            <div className="flex gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(coupon)}
                className="text-[#5d87ff] hover:bg-[#5d87ff]/10 transition-colors rounded-lg"
                title="Tahrirlash"
              >
                <EditIcon />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onDelete(coupon.id)}
                className="text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                isLoading={isDeleting}
                title="O'chirish"
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">ID:</span>
              <span className="text-sm font-medium text-gray-700">{coupon.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Holat:</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Faol
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CouponCard
