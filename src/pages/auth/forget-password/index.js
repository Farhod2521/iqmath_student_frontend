import Brand from "@/components/brand";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Header from "@/components/header";
const Index = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: forgetPassword } = usePostQuery({
    listKeyId: KEYS.forgetPassword,
  });

  const onSubmit = ({ phone }) => {
    let formData = new FormData();
    formData.append("phone", `${String(998) + String(phone)}`);
    forgetPassword(
      {
        url: URLS.forgetPassword,
        attributes: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/auth/forget-password/verify-sms/${phone}`);
        },
        onError: (error) => {
          console.log("Full error response:");

          toast.error(
            `${error.response?.data.retry_after} dan keyin sinab ko'ring`
          );

          toast.error(error.response?.data.error);
        },
      }
    );
  };
  return (
    <div
      className="min-h-screen bg-center bg-cover  font-sf flex flex-col"
      style={{ backgroundImage: `url(/images/bg-main-img.png)` }}
    >
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white mx-auto rounded-[12px] p-6 sm:p-8 shadow-md">
          <p className="text-xl sm:text-[26px] font-extrabold  text-center mb-[32px]">
            {t("resetPassword")}
          </p>

          <div className="w-full mt-4 sm:mt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5  rounded-md"
            >
              <div className="min-h-[46px]">
                {/* <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                      {t("phone number")}
                    </label> */}

                <div className="border border-[#E9E9E9] flex items-center rounded-[12px] px-3 py-2">
                  <p className="text-[17px] font-medium text-black">+998</p>
                  <div className="w-px h-[20px] bg-[#59626B] mx-2"></div>
                  <input
                    type="tel"
                    maxLength="9"
                    {...register("phone", { required: true })}
                    className="w-full bg-white text-[17px] text-black  focus:outline-none"
                    placeholder="Номер телефона"
                  />
                </div>
              </div>

              <div className="flex gap-x-[16px]">
                <button
                  onClick={() => router.back()}
                  className="bg-[#EDEDF2] hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
                >
                  {t("back")}
                </button>
                <button className="bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 sm:py-3 w-1/2 rounded-md transition-all duration-300">
                  {t("sendCode")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
