import Brand from "@/components/brand";
import Link from "next/link";
import { useState } from "react";
import ContentLoader from "@/components/loader/content-loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import LanguageDropdown from "@/components/language";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import Header from "@/components/header";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, isEmpty } from "lodash";
import { howItWorks } from "@/dummy-data";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import SimpleLoader from "@/components/loader/simple-loader";
import ScrollToTopButton from "@/components/scroll-to-top";
const Home = () => {
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: faqsData,
    isLoading: isLoadingFAQs,
    isFetching: isFetchingFAQS,
  } = useGetQuery({
    key: KEYS.faqs,
    url: URLS.faqs,
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const onSubmit = async ({ phone, password }) => {
    setIsLoading(true);
    const formattedPhone = `998${phone.replace(/[^0-9]/g, "")}`;
    const result = await signIn("credentials", {
      phone: formattedPhone,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/dashboard/student/subjects");
    }

    setIsLoading(false);
  };

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", // Redirect to iq-math.uz after sign out
    });

    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div>
      <Header />
      <main>
        <ScrollToTopButton />
        <div
          style={{ backgroundImage: `url(/images/bg-main-img.png)` }}
          className="bg-center bg-cover bg-no-repeat min-h-screen flex flex-col font-sf"
        >
          <div className="flex flex-grow items-center justify-center p-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-[486px] bg-white mx-auto rounded-lg p-6 md:p-8 shadow-lg">
              {!session?.accessToken ? (
                <div className="w-full">
                  <div className="flex items-center justify-center">
                    <Brand />
                  </div>
                  {/* Tab Buttons */}
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

                  {/* Form Section */}
                  <div className="w-full">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-[12px] "
                    >
                      <div className="min-h-[46px]">
                        {/* <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                      {t("phone number")}
                    </label> */}

                        <div className="border border-[#E9E9E9] flex items-center rounded-[12px] px-3 py-2">
                          <p className="text-[17px] font-medium text-black">
                            +998
                          </p>
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

                      <div>
                        {/* <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                      {t("password")}
                    </label> */}
                        <div className="relative ">
                          <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
                            placeholder="Введите пароль"
                            className="border border-[#E9E9E9] bg-white rounded-[12px] text-black w-full px-3 min-h-[46px] focus:outline-none relative"
                          />
                          <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-3 right-3 bottom-0 cursor-pointer"
                          >
                            {showPassword ? (
                              <Image
                                src={"/icons/eye.svg"}
                                alt={"edit"}
                                width={24}
                                height={24}
                              />
                            ) : (
                              <Image
                                src={"/icons/eye-off.svg"}
                                alt={"edit"}
                                width={24}
                                height={24}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center mt-4">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4"
                          />
                          <span>{t("remember")}</span>
                        </label>

                        <Link
                          href="/auth/forget-password"
                          className="text-[#5D87FF] font-medium hover:underline transition duration-200"
                        >
                          {t("forget password")}
                        </Link>
                      </div>

                      <button
                        disabled={isLoading}
                        className={`w-full ${
                          isLoading
                            ? "bg-[#8D97B2]"
                            : "bg-[#5D87FF] hover:bg-[#4570EA]"
                        } text-white py-2 rounded-md transition-all duration-300`}
                      >
                        {isLoading ? <SimpleLoader /> : t("login")}
                      </button>
                    </form>
                  </div>
                  {/* {isEmpty(get(banner, "data", [])) ? "" : <Modal />} */}
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="text-2xl font-medium mb-5">{t("welcome")}!</h1>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => router.push("/dashboard/student/subjects")}
                      className="bg-[#5D87FF] hover:bg-[#4570EA] py-3  w-1/2 text-white rounded-md transition-all"
                    >
                      {t("enter")}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-[#EDEDF2]  hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
                    >
                      {t("left")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section id="about-us" className="bg-[#F5F6F8] py-[120px] font-sf">
          <div className="container">
            <h1 className="text-center text-[34px] font-semibold mb-[60px]">
              Наши преимущества
            </h1>

            <ul className="grid grid-cols-12 gap-[24px]">
              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Consultation
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>

              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Consultation
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>

              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Consultation
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>

              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Consultation
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>

              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Consultation
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>

              <li className="col-span-12 md:col-span-6 lg:col-span-4 bg-white px-[24px] py-[20px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] rounded-full inline-block">
                  <div className="w-[26px] h-[26px] rounded-full border-[2px] bg-transparent border-[#59626B]"></div>
                </div>

                <h4 className="text-[24px] font-semibold mt-[16px] mb-[10px]">
                  Konsultatsiya
                </h4>

                <p className="text-[#8A8A8E] text-[17px]">
                  Comprehensive evaluation of your business objectives
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white py-[100px] font-sf ">
          <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-[72px]">
              {/* Chap taraf (sarlavha, paragraf va rasm) */}
              <div className="col-span-12 lg:col-span-6">
                <h3 className="text-[28px] md:text-[32px] lg:text-[34px] font-semibold">
                  Как это работает?
                </h3>

                <p className="text-[16px] md:text-[18px] lg:text-[19px] text-[#8A8A8E] mt-4">
                  Каждый ученик имеет возможность совершенствовать свои
                  математические знания, выполняя задания. Учащийся выполняет не
                  повторяющиеся задания и видит путь решения неправильно
                  решенных задач – это помогает ребёнку освоить материал и
                  учиться на своих ошибках.
                </p>

                <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-[40px]">
                  <Image
                    src={"/images/how-it-works.png"}
                    alt="how-it-works"
                    width={513}
                    height={320}
                    className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[513px] mx-auto"
                  />
                </div>
              </div>

              {/* O'ng taraf (Ro‘yxat) */}
              <div className="col-span-12 lg:col-span-6">
                <ul className="space-y-4 md:space-y-6 lg:space-y-[32px]">
                  {howItWorks.map((item, index) => (
                    <li key={index} className="">
                      <div className="font-semibold flex text-[18px] md:text-[20px] lg:text-[22px] gap-x-[6px]">
                        <span>{item.id}.</span>
                        <h4>{item.title}</h4>
                      </div>

                      <p className="text-[16px] md:text-[18px] lg:text-[19px] text-[#8A8A8E]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F6F8] py-[100px] font-sf">
          <div className="container">
            <h1 className="text-center text-[34px] font-semibold mb-[60px]">
              Подходит для
            </h1>

            <div className="grid grid-cols-12 gap-[24px]">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-[24px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] inline-block rounded-full">
                  <Image
                    src={"/icons/teacher.svg"}
                    alt="teacher"
                    width={23}
                    height={22}
                  />
                </div>

                <h4 className="text-[24px] font-semibold">Учителя</h4>
                <p className="text-[17px] text-[#8A8A8E]">
                  Comprehensive evaluation of your business objectives
                </p>

                <ul className="mt-[24px] space-y-[20px]">
                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Сразу получает результаты заданий и контрольных работ
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Имеется возможность проведения контрольной работы для
                        отдельного ученика или класса
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Доступна информация о неправильных решенных задачах ,
                        тем, показателей знаний каждого учащегося
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-[24px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] inline-block rounded-full">
                  <Image
                    src={"/icons/parents.svg"}
                    alt="parents"
                    width={23}
                    height={22}
                  />
                </div>
                <h4 className="text-[24px] font-semibold">Родителя</h4>
                <p className="text-[17px] text-[#8A8A8E]">
                  Comprehensive evaluation of your business objectives
                </p>

                <ul className="mt-[24px] space-y-[20px]">
                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Сразу получает результаты заданий и контрольных работ
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Имеется возможность проведения контрольной работы для
                        отдельного ученика или класса
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Доступна информация о неправильных решенных задачах ,
                        тем, показателей знаний каждого учащегося
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-[24px] rounded-[12px] shadow-md">
                <div className="bg-[#F5F6F8] p-[22px] inline-block rounded-full">
                  <Image
                    src={"/icons/pupil.svg"}
                    alt="pupil"
                    width={23}
                    height={22}
                  />
                </div>

                <h4 className="text-[24px] font-semibold">Ученика</h4>
                <p className="text-[17px] text-[#8A8A8E]">
                  Comprehensive evaluation of your business objectives
                </p>

                <ul className="mt-[24px] space-y-[20px]">
                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Сразу получает результаты заданий и контрольных работ
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Имеется возможность проведения контрольной работы для
                        отдельного ученика или класса
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="flex justify-between items-start gap-x-[16px]">
                      <Image
                        src={"/icons/checked.svg"}
                        alt="checked"
                        width={28}
                        height={28}
                      />

                      <p className="text-[15px]">
                        Доступна информация о неправильных решенных задачах ,
                        тем, показателей знаний каждого учащегося
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-[100px] font-sf">
          <div className="container">
            <h1 className="text-center text-[34px] font-semibold mb-[60px]">
              FAQ, часто задаваемые вопросы
            </h1>

            {isLoadingFAQs || isFetchingFAQS ? (
              <ContentLoader />
            ) : (
              get(faqsData, "data")?.map((faq, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button
                    className="w-full flex justify-between items-center py-[25px] text-left text-base md:text-lg lg:text-[22px] font-semibold hover:bg-gray-100 transition-all duration-300"
                    onClick={() => toggleAccordion(index)}
                  >
                    {i18n.language === "uz"
                      ? get(faq, "question_uz")
                      : get(faq, "question_ru")}
                    {openIndex === index ? (
                      <Image
                        src={"/icons/minus.svg"}
                        alt="plus"
                        width={28}
                        height={28}
                      />
                    ) : (
                      <Image
                        src={"/icons/plus.svg"}
                        alt="plus"
                        width={28}
                        height={28}
                      />
                    )}
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, translateY: "30px" }}
                      animate={{ opacity: 1, translateY: "0px" }}
                      transition={{ duration: 0.2 }}
                      className="p-4  text-gray-700"
                    >
                      {i18n.language === "uz" ? (
                        <div className="faq text-[17px] text-[#8A8A8E]">
                          {parse(get(faq, "answer_uz") || "")}
                        </div>
                      ) : (
                        <div className="faq">
                          {parse(get(faq, "answer_ru") || "")}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
