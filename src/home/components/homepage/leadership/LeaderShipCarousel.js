import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { X, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const LeaderShipCarousel = () => {
  const { t } = useTranslation()
  const [selectedLeader, setSelectedLeader] = useState(null)

  const leaders = [
    {
      id: 1,
      name: 'Al-Xorazmiy',
      title: 'Algebra asoschilaridan biri',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      yearsActive: '780-850',
      shortBio: 'Algebra asoschilaridan muallifi',
      fullBio:
        "Muhammad ibn Muso al-Xorazmiy - buyuk o'zbek matematigi va astronomi. Algebra fanining asoschilaridan biri hisoblanadi. Uning 'Al-jabr' asari algebraning rivojlanishiga katta hissa qo'shgan.",
      achievements: [
        'Algebra fanining asoschilaridan',
        'Hind raqamlarini Yevropa va Sharqqa yoygan',
        'Algoritmlar nazariyasining asoschisi'
      ]
    },

    {
      id: 2,
      name: 'Marie Curie',
      position: 'Fizik va Kimyogar',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      shortBio: 'Radioaktivlik tadqiqotchisi',
      fullBio:
        "Mari Kyuri (1867-1934) - polshalik-fransuz fizik va kimyogar. Radioaktivlik sohasidagi tadqiqotlari uchun ikki marta Nobel mukofotiga sazovor bo'lgan yagona ayol. Poloniy va radiy elementlarini kashf etgan. Tibbiyot va fanга katta hissa qo'shgan.",
      achievements: ['2 ta Nobel mukofoti', 'Poloniy va Radiy kashfiyoti', 'Radioaktivlik tadqiqotlari'],
      yearsActive: '1891-1934'
    },
    {
      id: 3,
      name: 'Isaac Newton',
      position: 'Matematik va Fizik',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      shortBio: 'Klassik mexanika asoschilaridan',
      fullBio:
        "Isaak Nyuton (1643-1727) - ingliz fizigi, matematigi, astronomi va tabiat faylasufi. Gravitatsiya qonunini kashf etgan. Harakat qonunlari zamonaviy fizikaning asosini tashkil etadi. Matematik analizni yaratishda ham katta rol o'ynagan.",
      achievements: ['Gravitatsiya qonuni', 'Harakat qonunlari', 'Matematik analiz'],
      yearsActive: '1661-1727'
    },
    {
      id: 4,
      name: 'Nikola Tesla',
      position: 'Ixtirochi va Muhandis',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      shortBio: "O'zgaruvchan tok tizimi muallifi",
      fullBio:
        "Nikola Tesla (1856-1943) - serbiyalik-amerikalik ixtirochi, muhandis va fizik. O'zgaruvchan tok tizimini ishlab chiqqan. Simsiz energiya uzatish, radio, röntgen nurlari va boshqa ko'plab sohalarda tadqiqotlar olib borgan. Zamonaviy elektr energetikasi uning kashfiyotlariga asoslangan.",
      achievements: ["O'zgaruvchan tok tizimi", "Tesla g'altagi", 'Simsiz energiya uzatish'],
      yearsActive: '1875-1943'
    },
    {
      id: 5,
      name: 'Stephen Hawking',
      position: 'Nazariy Fizik',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      shortBio: 'Qora tuynuklar tadqiqotchisi',
      fullBio:
        "Stiven Xoking (1942-2018) - ingliz nazariy fizigi va kosmologi. Qora tuynuklar va koinotning kelib chiqishi bo'yicha fundamental tadqiqotlar olib borgan. 'Vaqt qisqacha tarixi' kitobi eng ko'p sotiladigan ilmiy asarlardan biri. Og'ir kasallikka qaramay, butun hayotini fanga bag'ishlagan.",
      achievements: ['Qora tuynuklar nazariyasi', 'Katta portlash nazariyasi', 'Mashhur kitoblar muallifi'],
      yearsActive: '1962-2018'
    },
    {
      id: 6,
      name: 'Ada Lovelace',
      position: 'Matematik',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      shortBio: 'Birinchi dasturchi',
      fullBio:
        'Ada Lavleys (1815-1852) - ingliz matematigi, dunyodagi birinchi kompyuter dasturchisi deb tan olingan. Charlz Bebbidjning analitik mashinasi uchun birinchi algoritmni yozgan. Zamonaviy dasturlash tillarining asoschilaridan biri hisoblanadi.',
      achievements: ['Birinchi kompyuter dasturi', 'Analitik mashina algoritmlari', 'Dasturlash asoschilaridan'],
      yearsActive: '1833-1852'
    }
  ]

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4500,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="w-full py-8 overflow-hidden">
      <Slider {...settings} className="leadership-carousel">
        {leaders?.map((leader) => (
          <div key={leader.id} className="px-3">
            <div
              className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg cursor-pointer rounded-xl hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedLeader(leader)}
              style={{ width: '380px', margin: '0 auto' }}
            >
              <div className="relative overflow-hidden group">
                <div className="overflow-hidden aspect-square">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    draggable="false"
                  />
                </div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {leader.name}
                </h3>
                <p className="mb-3 font-medium text-blue-600">{leader.position}</p>
                <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{leader.shortBio}</p>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span>{t('details')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Modal */}
      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 animate-fadeIn"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 sm:px-6">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">To'liq ma'lumot</h2>
              <button
                onClick={() => setSelectedLeader(null)}
                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-6 mb-6 sm:flex-row">
                <div className="sm:w-2/5">
                  <div className="relative overflow-hidden shadow-xl rounded-xl">
                    <img
                      src={selectedLeader.image}
                      alt={selectedLeader.name}
                      className="object-cover w-full aspect-square"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>
                <div className="sm:w-3/5">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{selectedLeader.name}</h3>
                  <p className="mb-4 text-lg font-medium text-blue-600 sm:text-xl">{selectedLeader.position}</p>
                  <div className="p-4 mb-4 border border-blue-100 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <p className="mb-1 text-sm font-medium text-gray-600">Faoliyat davri:</p>
                    <p className="text-lg font-semibold text-gray-900 sm:text-xl">{selectedLeader.yearsActive}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                  <span className="w-1 h-6 bg-blue-600 rounded"></span>
                  Biografiya
                </h4>
                <p className="leading-relaxed text-justify text-gray-700">{selectedLeader.fullBio}</p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                  <span className="w-1 h-6 bg-blue-600 rounded"></span>
                  Asosiy yutuqlari
                </h4>
                <div className="space-y-3">
                  {selectedLeader?.achievements?.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 transition-colors rounded-lg bg-gray-50 hover:bg-blue-50"
                    >
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 px-4 py-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white sm:px-6">
              <button
                onClick={() => setSelectedLeader(null)}
                className="w-full py-3 font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .leadership-carousel .slick-slide {
          padding: 0 8px;
        }

        .leadership-carousel .slick-list {
          margin: 0 -8px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default LeaderShipCarousel
