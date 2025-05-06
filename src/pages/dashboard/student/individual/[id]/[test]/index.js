"use client";
import { useRouter } from "next/router";
import { questions } from "@/dummy-data";
import { useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import InfoCircleIcon from "@/components/icons/info-circle";
import WarningModal from "@/components/modal/warning-modal";
import { AnimatePresence, motion } from "framer-motion";
import SimpleModal from "@/components/modal/simple-modal";
import { dropRight } from "lodash";
import Link from "next/link";

const mathSymbols = {
  "√x": "\\sqrt{x}",
  "∛": "\\sqrt[3]{}",
  "√": "\\sqrt{}",
  π: "\\pi",
  "¼": "\\frac{1}{4}",
  "≤": "\\leq",
  "≥": "\\geq",
  "<": "<",
  ">": ">",
  "∩": "\\cap",
  "∪": "\\cup",
  fx: "f_x",
  "f(x)": "f(x)",
  "%": "%",
  "-": "-",
  "×": "\\times",
  "÷": "\\div",
};

const buttons = [
  "√x",
  "4",
  "8",
  "9",
  "≤",
  "π",
  "y",
  "Z",
  "▦",
  "-",
  "∛",
  "3",
  "7",
  "0",
  "≥",
  "¼",
  "x",
  "▥",
  "{}",
  "×",
  "√",
  "2",
  "6",
  "<",
  "∩",
  "fx",
  "e",
  "▧",
  "⦅⦆",
  "÷",
  "%",
  "1",
  "5",
  ">",
  "∪",
  "f(x)",
  "i",
  "▤",
  "XY",
  "+",
];

const Index = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMistake, setShowMistake] = useState(false);

  const handleShowWarning = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 5000);
  };

  const [input, setInput] = useState("");

  const handleClick = (btn) => {
    setInput((prev) => prev + (mathSymbols[btn] || btn));
  };

  return (
    <div className="font-sf">
      <div className="flex justify-between pl-[24px] pr-[16px] py-[14px] border-b border-b-[#F2F2F7] items-center">
        <div className="flex items-center gap-x-[12px]">
          <h1 className="text-[22px] font-semibold">Теория</h1>
          <div className="w-[1px] h-[26px] bg-[#E9E9E9]"></div>
          <p className="text-[17px] text-[#525252]">
            Задача (Elixir.Task_5_3_5(x1))
          </p>
        </div>

        <div>
          <button onClick={() => router.back()} className="float-right rounded">
            <Image
              src={"/icons/close.svg"}
              alt="circle"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 p-[24px]">
        <div className="col-span-6 overflow-y-auto max-h-screen border-r border-r-[#F2F2F7]">
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <li
                key={index}
                className={`p-3  rounded-md flex items-center gap-x-[12px] cursor-pointer `}
                onClick={() => setSelectedQuestion(question)}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center border-2  ${
                    selectedQuestion === question
                      ? "border-[#007AFF]"
                      : "hover:bg-gray-100 border-gray-300"
                  } rounded-full text-black font-bold`}
                >
                  {index + 1}
                </div>
                <p>{question}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 py-[24px] px-[50px]">
          <div className="flex justify-between p-[4px] border border-[#E9E9E9] rounded-[12px] mb-[60px]">
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
                <h3 className="text-[17px] font-medium">Видео подсказка</h3>
                <p className="text-[#8A8A8E]">
                  Посмотрите перед тем как начать
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-[8px]">
              <Button
                border={"border border-[#D1D1D6]"}
                px="px-[16px]"
                py="py-[11px]"
              >
                Смотреть
              </Button>
            </div>
          </div>
          {selectedQuestion ? (
            <div className="">
              <MathJaxContext>
                <div className="space-y-[32px] p-4">
                  <p className="text-black text-[19px] font-medium text-center">
                    {selectedQuestion}
                  </p>

                  {/* Matematik ifodani ko'rsatish */}
                  <div className="w-full px-4 py-[16px] text-center border-none rounded-[12px] text-lg bg-gray-100 min-h-[50px] flex items-center justify-center">
                    <MathJax>{`\\(${input}\\)`}</MathJax>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex relative">
                      <Button
                        onclick={() => setShowMistake(true)}
                        px="px-[16px]"
                        py="py-[11px]"
                      >
                        Проверить
                      </Button>

                      <Button
                        px="px-[16px]"
                        py="py-[11px]"
                        classname={
                          "bg-[#EDEDF2] !text-black ml-[12px] mr-[20px]"
                        }
                      >
                        Показать решение
                      </Button>

                      <div className="p-[6px] mr-[20px] cursor-pointer flex items-center ">
                        <button onClick={handleShowWarning}>
                          <InfoCircleIcon
                            color={!showWarning ? "#4D555DFF" : "#F97316FF"}
                          />
                        </button>

                        {showWarning && (
                          <WarningModal
                            classname={
                              "absolute w-full max-w-[351px] -top-[80px]"
                            }
                          >
                            Чтобы получить кешбек, вам нужно решить задачу c
                            первого раза, без подсказки
                          </WarningModal>
                        )}
                      </div>

                      <div className="p-[6px] mr-[20px] cursor-pointer flex items-center">
                        <button
                          onClick={() => setShowCalculator(!showCalculator)}
                        >
                          <Image
                            src="/icons/calculator.svg"
                            alt="info"
                            width={28}
                            height={28}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="p-[4px]">3 попытки</div>
                  </div>

                  {!showCalculator && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className=""
                      >
                        <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                        <div className="space-y-[32px] p-4">
                          <div className="grid grid-cols-10 gap-2">
                            {buttons.map((btn, i) => (
                              <button
                                key={i}
                                className={`p-3 w-[60px] h-[50px] text-xl font-normal rounded shadow ${
                                  ["-", "×", "÷", "+"].includes(btn)
                                    ? "text-white bg-orange-500 hover:bg-orange-600"
                                    : "text-[#59626B] bg-[#F5F6F8] hover:bg-gray-300"
                                }`}
                                onClick={() => handleClick(btn)}
                              >
                                <MathJax>{`\\(${
                                  mathSymbols[btn] || btn
                                }\\)`}</MathJax>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </MathJaxContext>

              {showMistake && (
                <SimpleModal>
                  <div>
                    <div className="flex justify-between px-[16px] py-[18px]">
                      <h3 className="text-[19px] font-semibold">Мои ошибки</h3>
                      <button
                        onClick={() => setShowMistake(false)}
                        className="rounded"
                      >
                        <Image
                          src={"/icons/close.svg"}
                          alt="circle"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                    <div className="py-[16px] px-[24px]">
                      <ul className="space-y-2">
                        {dropRight(questions, 10).map((question, index) => (
                          <li
                            key={index}
                            className={`p-3  rounded-md flex items-center gap-x-[12px] cursor-pointer `}
                            onClick={() => setSelectedQuestion(question)}
                          >
                            <div
                              className={`min-w-10 min-h-10 flex items-center justify-center border-2 border-[#FF3B30]  bg-[#FFEBEA] rounded-full text-black font-bold`}
                            >
                              {index + 1}
                            </div>
                            <p>{question}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                    <Link
                      href={"/dashboard/student/subjects/1"}
                      className="flex items-center justify-center py-[16px]"
                    >
                      <Button>Рекомендация</Button>
                    </Link>
                  </div>
                </SimpleModal>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 italic">Savolni tanlang...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
