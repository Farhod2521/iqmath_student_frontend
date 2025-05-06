import Dashboard from "@/components/dashboard";

const Index = () => {
  return (
    <Dashboard headerTitle={"Кошелек"}>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div className="col-span-6 space-y-[12px]">
          <div className=" border border-[#E9E9E9] py-[16px] px-[24px] rounded-[12px] flex items-center justify-between">
            <div>
              <h5 className="text-[17px] font-medium mb-[12px]">
                Общий баланс
              </h5>
              <p className="font-semibold text-[26px]">0.00</p>
            </div>

            <button className="text-white bg-[#5D87FF] text-[15px] font-medium py-[13px] px-[16px] rounded-[10px]">
              Пополнить
            </button>
          </div>
          <div
            style={{ backgroundImage: `url(/images/bg-img.png)` }}
            className="  py-[16px] px-[24px] rounded-[12px] flex items-start justify-between bg-no-repeat bg-cover text-white"
          >
            <div>
              <h5 className="text-[15px] font-medium ">Тарифный план</h5>
              <p className="font-semibold text-[28px] my-[12px]">145,000 сум</p>
              <p className="text-[15px] font-medium ">
                Следующая списания 21 марта
              </p>
            </div>

            <button className="text-white bg-transparent border border-white text-[15px] font-medium py-[9px] px-[16px] rounded-[10px]">
              Оплатить
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
