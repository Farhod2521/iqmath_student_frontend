import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={"  "}>
      <Link href={"/"} className="flex gap-x-[16px] items-center">
        <Image src={"/icons/brand.svg"} alt="brand" width={34} height={34} />
        <h1
          className={` font-normal text-[32px] font-bicubik text-black font-myriad   ${
            router.pathname === "/" ? "dark:text-[#3965c6]" : "dark:text-white"
          }`}
        >
          IQmath
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
