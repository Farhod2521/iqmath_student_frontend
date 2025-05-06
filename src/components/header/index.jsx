import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../language";
import Brand from "../brand";
import { TelegramIcon } from "../icons/social-media/telegram";
import { InstagramIcon } from "../icons/social-media/instagram";
import PhoneIcon from "../icons/social-media/phone";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get, isEmpty } from "lodash";
import Image from "next/image";
const navLinks = [
  { href: "/", label: "Главная" },
  { href: "#about-us", label: "О нас" },
  // { href: "https://iqmath.uz/", label: "courses" },
  { href: "#faq", label: "Вопросы и ответы" },
  // { href: "/about-olympics", label: "Об олимпиаде" },
];

const Header = ({ color = "white" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // const {
  //   data: networkings,
  //   isLoading,
  //   isFetching,
  // } = useGetQuery({
  //   key: KEYS.networkings,
  //   url: URLS.networkings,
  // });

  return (
    <header className="relative z-20 py-3 bg-white">
      <div className="container mx-auto font-sf  px-4">
        <div className="flex gap-x-[50px] justify-between ">
          <Brand />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center gap-4 items-center">
            {navLinks.map(({ href, label }) =>
              href.startsWith("http") ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-3 rounded-md  font-medium uppercase text-[17px]  transition ${
                    router.pathname === href
                      ? "text-[#5D87FF]"
                      : "text-[#8A8A8E]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(label)}
                </a>
              ) : (
                <a
                  key={href}
                  href={href}
                  className={`py-2 px-3 rounded-md  font-medium  text-[17px] transition ${
                    router.pathname === href
                      ? "text-[#5D87FF]"
                      : "text-[#8A8A8E]"
                  }`}
                >
                  {t(label)}
                </a>
              )
            )}
          </nav>
          <div className=" flex items-center lg:gap-x-[32px]">
            <LanguageDropdown />

            <div className="hidden lg:flex items-center gap-x-[10px]">
              <Image
                src={"/icons/phone.svg"}
                alt="phone"
                width={24}
                height={24}
              />

              <a
                className="text-[15px] font-medium text-black"
                href="tel:+998 88 198 90 00"
              >
                +998 88 198 90 00
              </a>
            </div>

            {/* Burger Menu Button */}
            <button
              className="ml-4 lg:hidden p-2 rounded-md transition hover:bg-gray-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Language & Mobile Menu */}
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Brand />
          <button onClick={() => setMenuOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-3 px-4 text-lg transition ${
                router.pathname === href
                  ? "bg-[#3965c6] text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t(label)}
            </Link>
          ))}
        </nav>

        {/* Social Media Icons in Mobile Menu */}

        {/* <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 border-t pt-4">
          {isEmpty(get(networkings, "data", []))
            ? ""
            : get(networkings, "data", []).map((networking, index) => (
                <div key={get(networking, "id") || index}>
                  {get(networking, "name") === "telegram" ? (
                    <a href={get(networking, "link")} target="_blank">
                      <TelegramIcon className="text-black hover:text-[#5d87ff]" />
                    </a>
                  ) : get(networking, "name") === "instagram" ? (
                    <a href={get(networking, "link")} target="_blank">
                      <InstagramIcon className="text-black hover:text-[#5d87ff]" />
                    </a>
                  ) : (
                    <a href="tel: +998 78 888 08 00" className="text-sm">
                      {" "}
                      <PhoneIcon className="text-black hover:text-[#5d87ff]" />{" "}
                    </a>
                  )}
                </div>
              ))}
        </div> */}
      </aside>
    </header>
  );
};

export default Header;
