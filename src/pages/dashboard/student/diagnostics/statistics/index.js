import Dashboard from "@/components/dashboard";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: levelStatistics, isLoading } = useGetQuery({
    key: KEYS.levelStatistics,
    url: URLS.levelStatistics,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });
  return (
    <Dashboard headerTitle={t("diagnostics")}>
      <div className="grid grid-cols-12 gap-[24px] rounded-[12px]">
        <div className="col-span-8 rounded-[12px]">
          <div className="space-y-[12px]">
            {get(levelStatistics, "data", []).map((item, index) => (
              <div
                key={index}
                className="border border-[#E9E9E9] py-[12px] px-[24px] rounded-[12px] bg-white flex justify-between items-center"
              >
                <div className="w-1/3">
                  <p className="text-[17px] font-medium">
                    {get(item, "level")} - {t("degree")}
                  </p>
                </div>

                <div className="w-1/3 flex items-center gap-x-[10px]">
                  <div className="w-[80px] bg-gray-200 rounded-full h-[12px] overflow-hidden">
                    <div
                      className="bg-[#FF9500] h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${
                          get(item, "score", "") === null
                            ? 0
                            : get(item, "score", "")
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[17px] font-medium text-gray-700">
                    {get(item, "score", "") === null
                      ? 0
                      : get(item, "score", "")}
                    %
                  </p>
                </div>

                <div className="w-1/3 flex justify-end">
                  {get(item, "message", "") ? (
                    <button
                      onClick={() => {
                        router.push("/dashboard/student/diagnostics");
                      }}
                      className="py-[9px] px-[33px] bg-[#EDEDF2] hover:bg-[#c0c0c0] rounded-[8px] transition-all duration-300"
                    >
                      {t("begin")}
                    </button>
                  ) : (
                    <div className="flex items-center gap-x-[17px]">
                      <button
                        onClick={() => {
                          router.push("/dashboard/student/diagnostics");
                        }}
                        className="py-[9px] px-[13px] bg-[#5D87FF] text-white rounded-[8px]"
                      >
                        {t("continueTest")}
                      </button>
                      <button
                        onClick={() => {
                          router.push("/dashboard/student/diagnostics");
                        }}
                        className="rotate-0 hover:rotate-90 transition-all duration-200"
                      >
                        <Image
                          src={"/icons/refresh.svg"}
                          alt="refresh"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
