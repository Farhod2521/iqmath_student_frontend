import Brand from "../brand";
import Image from "next/image";
import { TelegramIcon } from "../icons/social-media/telegram";
import { InstagramIcon } from "../icons/social-media/instagram";
import YoutubeIcon from "../icons/social-media/youtube";
const Footer = () => {
  return (
    <footer className="border-t font-sf">
      <div className="container">
        <div className="pt-[24px] flex gap-x-[50px] flex-wrap">
          <Brand />
          <ul className="flex gap-[24px] items-center flex-wrap">
            <li className="flex gap-[12px] items-center">
              <Image
                src={"/icons/phone.svg"}
                alt="phone"
                width={28}
                height={28}
              />

              <a
                className="text-[15px] font-medium text-black"
                href="tel:+998 88 198 90 00"
              >
                +998 88 198 90 00
              </a>
            </li>

            <li className="flex gap-x-[12px] items-center">
              <Image
                src={"/icons/mail.svg"}
                alt="phone"
                width={28}
                height={28}
              />

              <a
                className="text-[15px] font-medium text-black"
                href="mailto:+998 88 198 90 00"
              >
                test@gmail.com
              </a>
            </li>

            <li className="flex gap-x-[12px] items-center">
              <Image
                src={"/icons/address.svg"}
                alt="phone"
                width={28}
                height={28}
              />

              <a
                className="text-[15px] font-medium text-black"
                href="tel:+998 88 198 90 00"
              >
                +998 88 198 90 00
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#E9E9E9] my-[24px]"></div>

        <div className="py-[9px] flex justify-between flex-wrap">
          <ul className="flex flex-wrap items-center gap-[24px] text-[15px] ">
            <li>
              <p>© 2025 iqmath.com</p>
            </li>

            <li className="flex gap-x-[6px] items-center">
              <p>FAQs</p>
              <Image
                src={"/icons/footer-icon-right.svg"}
                alt="phone"
                width={16}
                height={16}
              />
            </li>

            <li className="flex gap-x-[6px] items-center">
              <p>Return policy</p>
              <Image
                src={"/icons/footer-icon-right.svg"}
                alt="phone"
                width={16}
                height={16}
              />
            </li>

            <li className="flex gap-x-[6px] items-center">
              <p>Privacy policy</p>
              <Image
                src={"/icons/footer-icon-right.svg"}
                alt="phone"
                width={16}
                height={16}
              />
            </li>

            <li className="flex gap-x-[6px] items-center">
              <p>Terms and conditions</p>
              <Image
                src={"/icons/footer-icon-right.svg"}
                alt="phone"
                width={16}
                height={16}
              />
            </li>

            <li className="flex gap-x-[6px] items-center">
              <p>Contact info</p>
              <Image
                src={"/icons/footer-icon-right.svg"}
                alt="phone"
                width={16}
                height={16}
              />
            </li>
          </ul>

          <ul className="flex gap-x-[24px]">
            <li>
              <TelegramIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>

            <li>
              <YoutubeIcon />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
