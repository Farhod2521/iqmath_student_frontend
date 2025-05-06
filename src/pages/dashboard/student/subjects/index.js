import Dashboard from "@/components/dashboard";
import { useSession } from "next-auth/react";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { config } from "@/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import SimpleModal from "@/components/modal/simple-modal";
import ContentLoader from "@/components/loader/content-loader";

const Index = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  const [isExiting, setIsExiting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [showModal, setShowModal] = useState(!!phone);

  // Copy login/password to clipboard
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
      router.push("/dashboard/student/diagnostics");
    }, 300);
  };

  const {
    data: studentSubjects,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  if (isLoading || isFetching) {
    return (
      <Dashboard headerTitle={"Предметы"}>
        <ContentLoader />
      </Dashboard>
    );
  }
  return (
    <Dashboard headerTitle={"Предметы"}>
      {showModal && phone && (
        <SimpleModal>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">
              {" "}
              {t("confidentiality")}
            </h3>
            <button onClick={closeModal} className="rounded">
              <Image
                src={"/icons/close.svg"}
                alt="circle"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="px-[16px] py-[24px]">
            <div className="flex items-center gap-x-[5px]">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 text-[#13DEB9]"></h2>
            </div>
            <h2 className="lg:text-lg md:text-base text-sm font-semibold mb-1">
              {t("userLoginandPassword")}
            </h2>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-2">
              {t("yourLogin")}: {session?.login}
            </p>
            <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-4">
              {t("yourPassword")}: {session?.password}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#7C8FAC]">
              {t("WantchangePassword")}
            </p>
          </div>
          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
            <button
              onClick={handleCopy}
              className="bg-[#5D87FF] text-white py-2 px-4 rounded w-full sm:w-auto"
            >
              {copied ? `${t("copied")}` : `${t("copy")}`}
            </button>
          </div>
        </SimpleModal>
      )}

      <div className="flex items-start flex-wrap gap-[24px]">
        {get(studentSubjects, "data", []).map((item, index) => (
          <div
            key={index}
            className={`space-y-[12px] w-[200px] cursor-pointer group `}
            onClick={() =>
              router.push(`/dashboard/student/subjects/${get(item, "id")}`)
            }
          >
            <div className="rounded-[12px]">
              <Image
                src={
                  i18n.language === "uz"
                    ? `${config.API_URL}${get(item, "image_uz")}`
                    : `${config.API_URL}${get(item, "image_ru")}`
                }
                alt="math"
                width={95}
                height={124}
                className=" w-full object-contain shadow-lg hover:-translate-y-[12px] transition-all duration-300 group-hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)]  bg-white"
              />
            </div>

            <p className="text-[20px] font-medium text-center group-hover:text-[#007AFF] transition-all duration-300">
              {i18n.language === "uz"
                ? get(item, "class_uz")
                : get(item, "class_ru")}
            </p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Index;
