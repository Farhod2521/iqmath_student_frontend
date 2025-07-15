import Dashboard from "@/components/dashboard";
import { groupsPupil } from "@/dummy-data";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import SimpleModalTeacher from "@/components/modal/simple-modal-teacher";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Students from "@/modules/students/page/Students";
import MainWrapper from "@/layout/MainWrapper";
const Index = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [showModal, setShowModal] = useState(!!phone);

  const handleCopy = () => {
    const textToCopy = `Login: ${session.login}\nPassword: ${session.password}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false); 
    }, 300);
  };

  

  
  console.log(session);

  return (
     <MainWrapper title={t("pupils")}>
     
     <Students />
      {showModal && phone && (
        <SimpleModalTeacher>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold"> {t("confidentiality")}</h3>
            <button onClick={closeModal} className="rounded">
              <Image src={"/icons/close.svg"} alt="circle" width={24} height={24} />
            </button>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="px-[16px] py-[24px]">
            <div className="flex items-center gap-x-[5px]">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 text-[#13DEB9]"></h2>
            </div>
            <h2 className="lg:text-lg md:text-base text-sm font-semibold mb-1">{t("userLoginandPassword")}</h2>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-2">
              {t("yourLogin")}: {session?.login}
            </p>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-4">
              {t("yourPassword")}: {session?.password}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#7C8FAC]">{t("WantchangePassword")}</p>
          </div>
          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
            <button onClick={handleCopy} className="bg-[#5D87FF] text-white py-2 px-4 rounded w-full sm:w-auto">
              {copied ? `${t("copied")}` : `${t("copy")}`}
            </button>
          </div>
        </SimpleModalTeacher>
      )}
     </MainWrapper>
  );
};

export default Index; 