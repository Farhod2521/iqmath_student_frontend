import { useState, useEffect, useContext } from "react";
import Brand from "@/components/brand";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";

import { useRouter } from "next/router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { phone } = router.query;
  const [verifyCode, setVerifyCode] = useState("");
  const [code, setCode] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(20);

  const formatPhoneNumber = (phone) => {
    if (phone?.length !== 9) return phone; // Noto'g'ri uzunlikda bo'lsa, o'zgartirmaymiz
    return `+998 (${phone.slice(0, 2)}) ${phone.slice(2, 5)}-${phone.slice(
      5,
      7
    )}-${phone.slice(7, 9)}`;
  };

  const formattedPhone = formatPhoneNumber(phone);

  useEffect(() => {
    // Get saved timestamp from localStorage
    const savedTimestamp = localStorage.getItem("timerTimestampForgetPassword");
    const savedTime = parseInt(localStorage.getItem("timerForgetPassword"), 10);

    if (savedTimestamp && savedTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedTimestamp, 10)) / 1000
      );
      const newTime = Math.max(savedTime - elapsedTime, 0); // Ensure timer never goes negative
      setTimer(newTime);
    } else {
      setTimer(120);
      localStorage.setItem("timerForgetPassword", 120);
      localStorage.setItem(
        "timerTimestampForgetPassword",
        Date.now().toString()
      );
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        localStorage.setItem("timerForgetPassword", prev - 1);
        localStorage.setItem(
          "timerTimestampForgetPassword",
          Date.now().toString()
        );
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value, index) => {
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus the next input
      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const { mutate: resendSMSCodeForget, isLoading } = usePostQuery({
    listKeyId: KEYS.resendSMSCodeForget,
  });

  const onSubmit = () => {
    const formattedPhone = `998${phone.replace(/[^0-9]/g, "")}`;
    resendSMSCodeForget(
      {
        url: URLS.resendSMSCodeForget,
        attributes: {
          phone: parseInt(`998${phone.replace(/[^0-9]/g, "")}`),
          sms_code: verifyCode,
        },
      },

      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/auth/new-password/${phone}`);
        },
        onError: (error) => {
          console.log("Full error response:");

          toast.error(error.response?.data.error);
        },
      }
    );
  };

  // const handleKeyDown = (e, index) => {
  //   if (e.key === "Backspace") {
  //     const newCode = [...code];

  //     if (code[index] !== "") {
  //       // Remove the digit from the current input
  //       newCode[index] = "";
  //       setCode(newCode);
  //     } else if (index > 0) {
  //       // Move focus to the previous input
  //       document.getElementById(`input-${index - 1}`).focus();
  //     }
  //   }
  // };

  // const isCodeComplete = code.every((digit) => digit !== "");

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <div
      className="min-h-screen bg-center bg-cover bg-no-repeat flex flex-col "
      style={{ backgroundImage: `url(/images/bg-main-img.png)` }}
    >
      <Header />
      <div className="flex flex-grow items-center justify-center font-sf">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white mx-auto rounded-lg p-6 sm:p-8 shadow-md">
          <h3 className="font-extrabold text-[26px] text-center">
            Подтвердите номер телефона
          </h3>
          <p className="text-sm sm:text-[19px] font-medium text-center mt-[8px] mb-[32px]">
            Мы отправили смс на номер <br />
            {formattedPhone}
          </p>

          <div className="flex flex-col  justify-center">
            <div className=" rounded-lg">
              {/* <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`input-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </div> */}
              <div className="flex items-center w-full gap-x-[12px] mb-[50px]">
                <div className="w-full">
                  <input
                    type="text"
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Код из смс"
                    className="border border-[#E9E9E9] bg-white rounded-[12px] text-black w-full px-3 min-h-[46px] focus:outline-none relative text-[17px] placeholder:text-[17px]"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <span className="text-black text-sm sm:text-[22px] py-[9px] px-[27px] border border-[#D1D1D6] rounded-[10px]">
                    {formattedTime}
                  </span>
                </div>
              </div>

              <div className="flex gap-x-[16px]">
                <button
                  onClick={() => router.back()}
                  className="bg-[#EDEDF2] hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
                >
                  {t("back")}
                </button>
                <button
                  onClick={onSubmit}
                  className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 sm:py-3 w-1/2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
                >
                  {t("submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
