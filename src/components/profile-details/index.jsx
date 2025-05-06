import Image from "next/image";

const ProfileDetails = ({ detailIcon, title, desc }) => {
  return (
    <div className="flex justify-between py-[12px]">
      <div className="flex  items-center gap-x-[8px]">
        <Image
          src={`/icons/${detailIcon}.svg`}
          alt={`${detailIcon}`}
          width={20}
          height={20}
        />
        <p className="text-[15px] text-[#8A8A8E]">{title}</p>
      </div>

      <p className="text-[15px]">{desc}</p>
    </div>
  );
};

export default ProfileDetails;
