import { useRouter } from "next/router";
import Brand from "@/components/brand";
import Image from "next/image";
import { useState, useEffect } from "react";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useForm } from "react-hook-form";
import { regionsUz } from "@/data/region";
import { regionsRu } from "@/data/regions_ru";
import { academicLyseums } from "@/data/litsey";
import { academicLyseumsRu } from "@/data/litsey_ru";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "@/components/language";
import { motion } from "framer-motion";
import UserAgreement from "@/components/oferta";
import Header from "@/components/header";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import DropdownArrow from "@/components/icons/dropdownArrow";

const Register = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const [tab, setTab] = useState("register");

  const [submitError, setSubmitError] = useState("");

  const [dropdownOpenCourse, setDropdownOpenCourse] = useState(false);
  const [selectedOptionCourse, setSelectedOptionCourse] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } =
    useGetQuery({
      key: KEYS.schoolClasses,
      url: URLS.schoolClasses,
    });

  console.log(schoolClasses);

  const filteredCourses = get(schoolClasses, "data", []);

  // kursni tanlash
  const handleCourseSelect = (course) => {
    setSelectedOptionCourse(course);
    setDropdownOpenCourse(false);
  };

  console.log(selectedOptionCourse);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleTab = (tab) => {
    setTab(tab);
  };

  const { mutate: registerRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.register,
  });

  const onSubmit = ({ full_name, phone }) => {
    let formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("phone", `${String(998) + String(phone)}`);
    formData.append("class_name", selectedId);
    registerRequest(
      {
        url: URLS.register,
        attributes: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");
          router.push(`/auth/recieve-code/${phone}`);
        },
        onError: (error) => {
          console.log("Full error response:", error.response?.data);

          if (error.response?.data?.errors) {
            const errors = error.response.data.errors;

            toast.error(Object.values(errors).flat().join("\n"));
          } else {
            console.log("error occured");
          }
        },
      }
    );
  };

  return (
    <div
      className="bg-no-repeat bg-center bg-cover min-h-screen flex flex-col font-sf"
      style={{ backgroundImage: `url(/images/bg-main-img.png)` }}
    >
      <Header />
      <div className={" flex flex-grow items-center justify-center "}>
        {submitError && (
          <p className="text-red-500 text-sm mt-1">
            {Object.entries(submitError)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </p>
        )}

        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto bg-white  mx-auto md:my-[30px] my-[50px] rounded-[8px] p-6 md:p-8  ">
          <div className="flex justify-center items-center">
            <Brand />
          </div>

          <div className="flex bg-[#F2F2F7] p-[4px] my-[32px] rounded-[8px]">
            <button
              onClick={() => {
                handleTab("login");
                router.push("/");
              }}
              className={`py-[6px]  rounded-md text-[15px] font-medium   w-1/2 transition-all duration-300 capitalize ${
                tab === "login"
                  ? "bg-white text-black shadow-md"
                  : "text-[#5A6A85] hover:bg-[#ECF2FF]"
              }`}
            >
              {t("login")}
            </button>

            <button
              onClick={() => {
                handleTab("register");
                router.push("/register");
              }}
              className={`py-2 px-4 w-2/3 rounded-md transition-all duration-300 ${
                tab === "register"
                  ? "bg-white text-black shadow-md"
                  : "text-[#5A6A85] hover:bg-[#ECF2FF]"
              }`}
            >
              {t("sign in")}
            </button>
          </div>

          <div className="w-full mt-[30px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-[10px] text-[17px]  rounded-[4px]"
            >
              {/* Ism */}
              <div className="">
                <input
                  type="text"
                  {...register("full_name", { required: true })}
                  className="border border-[#EAEFF4] bg-white  text-[#2A3547] rounded-[12px] w-full px-[16px] py-[10px]"
                  placeholder={`${t("full name")}`}
                />
              </div>

              <div>
                <div className="border border-[#EAEFF4] flex gap-x-[10px] items-center rounded-[12px] px-[16px] ">
                  <p className=" font-medium text-black">+998</p>
                  <div className="w-px h-[20px] bg-[#59626B] mx-2"></div>

                  <input
                    type="tel"
                    maxLength="9"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full  bg-white text-[#2A3547] py-[10px]  focus:outline-none placeholder:font-normal"
                    placeholder="Номер телефона"
                  />
                </div>
                {submitError?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {submitError.phone}
                  </p>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.3 }}
                className="relative text-[#2A3547] cursor-pointer"
              >
                <div
                  onClick={() => setDropdownOpenCourse((prev) => !prev)}
                  className="w-full text-left px-[16px] py-[10px] border border-[#EAEFF4] rounded-[12px] bg-white focus:outline-none flex items-center justify-between"
                >
                  <span>{selectedOptionCourse || `Sinfni tanlang`}</span>
                  <svg
                    className={`w-5 h-5 transform ${
                      dropdownOpenCourse ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown options */}
                {dropdownOpenCourse && (
                  <ul className="absolute w-full top-12 bg-white border border-gray-300 rounded-md shadow-md z-50">
                    {filteredCourses.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedOptionCourse(option.class_uz);
                          setDropdownOpenCourse(false);
                          setSelectedId(option.id);
                        }}
                      >
                        {i18n.language === "uz"
                          ? option.class_uz
                          : option.class_ru}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              <UserAgreement />

              <button
                // disabled={!isFormValid}
                className={
                  "bg-[#5D87FF] hover:bg-[#4570EA] text-white transition-all duration-300  py-[8px] px-[16px] w-full rounded-[4px]"
                }
              >
                {t("enter")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
