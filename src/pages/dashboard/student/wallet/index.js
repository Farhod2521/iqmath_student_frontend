import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { Button, Card } from '@heroui/react'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        <HeaderTitle title={t('wallet')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 lg:gap-x-[24px]">
        <div className="col-span-6 space-y-[12px]">
          <Card className="rounded-[12px] ">
            <div className="border border-[#E9E9E9] py-[16px] px-[24px]  flex items-center justify-between">
              <div>
                <h5 className="text-[17px] font-medium mb-[12px]">Общий баланс</h5>
                <p className="font-semibold text-[26px]">0.00</p>
              </div>

              <Button className="text-white bg-[#5D87FF] text-[15px] font-medium py-[13px] px-[16px] rounded-[10px]">
                Пополнить
              </Button>
            </div>
          </Card>
          <Card>
            <div
              style={{
                backgroundImage: `url(/images/bg-img.png)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              className="  py-[16px] px-[24px] rounded-[12px] flex items-start justify-between bg-no-repeat bg-cover text-white"
            >
              <div>
                <h5 className="text-[15px] font-medium ">Тарифный план</h5>
                <p className="font-semibold text-[28px] my-[12px]">499,000 so'm</p>
                <p className="text-[15px] font-medium ">Следующее списание 21 марта</p>
              </div>

              <Button
                variant="bordered"
                className="text-white bg-transparent border border-white text-[15px] font-medium py-[9px] px-[16px] rounded-[10px]"
              >
                Оплатить
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
