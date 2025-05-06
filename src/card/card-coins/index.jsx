import Image from "next/image";

const PresentCard = ({ img, title, coin, onclick = () => {} }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={`/images/${img}.png`}
          alt={`${img}`}
          width={234}
          height={234}
        />
      </div>
      <p className="text-[17px] font-medium">{title}</p>
      <p className="text-[19px] font-semibold mt-[8px]">{coin} баллов</p>

      <button
        onClick={onclick}
        className="bg-[#5D87FF] text-white py-[13px] w-full rounded-[12px] mt-[16px]"
      >
        Обменять
      </button>
    </div>
  );
};

export default PresentCard;
