import Button from "@/components/button";
import Dashboard from "@/components/dashboard";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { fractionsData } from "@/dummy-data";

const topics = [
  { title: "Пропорции и проценты", link: "topic/percentages", locked: false },
  { title: "Натуральные числа и ноль", link: "topic/numbers", locked: true },
  {
    title: "Натуральные числа и арифметические действия",
    link: "topic/arithmetics",
    locked: true,
  },
  { title: "Дроби и действия с ними", link: "topic/fractions", locked: true },
  {
    title: "Геометрия: линии, углы, фигуры",
    link: "topic/geometry",
    locked: false,
  },
];

const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleSelect = (topic) => {
    if (topic.locked) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      return;
    }
    setSelectedTopic(topic);
    setOpen(false);
    router.push(topic.link);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <Dashboard>
      <div
        className="my-[24px] relative border border-[#E9E9E9] rounded-[12px] mx-[169px] font-sf"
        ref={dropdownRef}
      >
        <div className="py-[12px]">
          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            <h1 className="text-[17px] text-center">
              <h1 className="text-[17px] text-center">{selectedTopic.title}</h1>
            </h1>
          </div>

          {open && (
            <motion.div
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.2 }}
              className="absolute max-w-[438px] max-h-[178px] overflow-y-auto w-full rounded-[4px] shadow-md bg-white top-[52px] left-0 right-0 mx-auto"
            >
              <ul className="p-[4px]">
                {topics.map((topic, index) => (
                  <li
                    key={index}
                    className={`py-[8px] px-[12px] flex justify-between ${
                      topic.locked
                        ? "text-gray-400 cursor-not-allowed"
                        : "cursor-pointer hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(topic)}
                  >
                    <p>{topic.title}</p>
                    {topic.locked && (
                      <Image
                        src="/icons/lock.svg"
                        alt="lock"
                        width={19}
                        height={19}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

        <div className="flex justify-between py-[12px] px-[24px]">
          <div className="flex gap-x-[15px] items-center">
            <div className="w-[60px] h-[60px] bg-[#EDEDF2] flex items-center justify-center rounded-[8px]">
              <Image
                src={"/icons/play.svg"}
                alt="play"
                width={24}
                height={24}
              />
            </div>

            <div className="space-y-[4px]">
              <h3 className="text-[17px] font-medium">Видео объяснение</h3>
              <p className="text-[#8A8A8E]">Посмотрите перед тем как начать</p>
            </div>
          </div>

          <div className="flex items-center gap-x-[8px]">
            <Button
              border={"border border-[#D1D1D6]"}
              px="px-[16px]"
              py="py-[11px]"
              classname={"bg-white !text-black"}
            >
              Смотреть
            </Button>

            <Button
              px="px-[16px]"
              py="py-[11px]"
              onclick={() =>
                router.push("/dashboard/student/individual/undefined/1")
              }
            >
              Пройти тест
            </Button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

        <div className=" py-[22px] px-[24px]">
          <div className=" mx-auto p-6 bg-white">
            {fractionsData.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  {index + 1}. {section.title}
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {section.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-1/2 max-w-[320px] transform -translate-x-1/2 bg-[#FFF4E5] border border-[#FF9500]  p-[16px] rounded-md shadow-lg "
          >
            <div className="flex justify-between">
              <p className="text-[17px] font-medium">Тема не доступна!</p>
              <Image
                src="/icons/info-octagon.svg"
                alt="info"
                width={22}
                height={22}
              />
            </div>
            <p className="text-[#524E49] mt-[12px]">
              Вы не можете открыть новую тему, пока не решите текущую тему на
              80%.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="text-orange-900 font-bold absolute -top-5 -right-4 shadow-md text-[19px] py-[6px] px-[10px] bg-white rounded-full"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Dashboard>
  );
};

export default Index;
