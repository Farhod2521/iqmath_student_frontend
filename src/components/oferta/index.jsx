import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

export default function UserAgreement() {
  const { t, i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const iframeRef = useRef(null);

  // Qurilma turini aniqlash (mobil yoki desktop)
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && !isMobile) {
      iframe.onload = () => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.onscroll = () => {
          const { scrollTop, scrollHeight, clientHeight } =
            iframeDocument.documentElement;
          if (scrollTop + clientHeight >= scrollHeight - 5) {
            setIsScrolledToEnd(true);
          }
        };
      };
    }
  }, [isMobile]);

  const {
    data: ofertas,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.ofertas,
    url: URLS.ofertas,
  });

  const handleAgree = () => {
    setIsChecked(true);
    setIsModalOpen(false);
  };

  // PDF manzilini olish
  const pdfUrl =
    i18n.language === "uz"
      ? get(ofertas, "data[0].pdf_uz")
      : get(ofertas, "data[0].pdf_ru");

  return (
    <div className="flex items-center space-x-2">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsModalOpen(true)}
        className="w-5 h-5 cursor-pointer accent-blue-500"
      />
      <label
        className="cursor-pointer text-sm my-[10px]"
        onClick={() => setIsModalOpen(true)}
      >
        {t("oferta")}
      </label>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center w-full justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl shadow-lg w-[1200px]">
            {/* Scrollable PDF */}
            <div className="h-[500px] overflow-y-auto border relative">
              {/* <object
                data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&embedded=true`}
                type="application/pdf"
                className="w-full h-full"
              ></object> */}

              <embed
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                type="application/pdf"
                width="100%"
                height="100%"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleAgree}
                className={`px-4 py-2 bg-blue-500 text-white rounded `}
              >
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
