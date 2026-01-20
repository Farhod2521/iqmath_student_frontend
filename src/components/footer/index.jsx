import Brand from '../brand'
import Image from 'next/image'
import { TelegramIcon } from '../icons/social-media/telegram'
import { InstagramIcon } from '../icons/social-media/instagram'
import YoutubeIcon from '../icons/social-media/youtube'
import { Container } from '@mui/material'
const Footer = () => {
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Kurslar', href: '/' },
        { name: 'Narxlar', href: '/prices' },
        { name: 'Biz haqimizda', href: '/about' }
        // { name: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Yordam',
      links: [
        { name: 'FAQs', href: '/faqs' },
        { name: "Qo'llab-quvvatlash", href: '/' },
        { name: 'Aloqa', href: 'tel:+998881989000' }
        // { name: 'Dokumentatsiya', href: '/docs' }
      ]
    }
    // {
    //   title: 'Huquqiy',
    //   links: [
    //     { name: 'Maxfiylik siyosati', href: '/privacy' },
    //     { name: 'Foydalanish shartlari', href: '/terms' },
    //     { name: 'Qaytarish siyosati', href: '/return-policy' },
    //     // { name: 'Cookie siyosati', href: '/cookies' }
    //   ]
    // }
  ]

  const contactInfo = [
    {
      icon: '/icons/phone.svg',
      label: 'Telefon',
      value: '+998 88 198 90 00',
      href: 'tel:+998881989000',
      type: 'phone'
    },
    {
      icon: '/icons/mail.svg',
      label: 'Email',
      value: 'info@iqmath.uz',
      href: 'mailto:info@iqmath.uz',
      type: 'email'
    },
    {
      icon: '/icons/address.svg',
      label: 'Manzil',
      value: "Toshkent, O'zbekiston",
      href: '#',
      type: 'address'
    }
  ]

  const socialLinks = [
    {
      icon: <TelegramIcon />,
      name: 'Telegram',
      href: 'https://t.me/iqmath',
      color: 'hover:bg-blue-500'
    },
    {
      icon: <InstagramIcon />,
      name: 'Instagram',
      href: 'https://instagram.com/iqmath',
      color: 'hover:bg-pink-500'
    },
    {
      icon: <YoutubeIcon />,
      name: 'YouTube',
      href: 'https://youtube.com/iqmath',
      color: 'hover:bg-red-500'
    }
  ]

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sf">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 bg-blue-500 rounded-full w-96 h-96 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full w-96 h-96 filter blur-3xl"></div>
      </div>
      <Container
        sx={{
          maxWidth: '1400px !important'
        }}
      >
        <div className="relative z-10 ">
          {/* Main Footer Content */}
          <div className="pt-16 pb-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
              {/* Brand & Description */}
              <div className="lg:col-span-4">
                <div className="mb-6">
                  <Brand />
                </div>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-6 max-w-sm">
                  IQmath - matematikani samarali o'rganish uchun innovatsion elektron platforma. Zamonaviy ta'lim
                  texnologiyalari bilan bilimingizni yangi bosqichga olib chiqing.
                </p>

                {/* Newsletter */}
                {/* <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-300">Yangiliklar uchun obuna bo'ling</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                  />
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition transform hover:scale-105 text-sm whitespace-nowrap">
                    Obuna
                  </button>
                </div>
              </div> */}
              </div>

              {/* Footer Links */}
              {footerLinks.map((section, idx) => (
                <div key={idx} className="lg:col-span-2">
                  <h3 className="mb-4 text-base font-semibold text-white">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition text-[15px] inline-flex items-center group"
                        >
                          <span className="transition-transform group-hover:translate-x-1">{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact Info */}
              <div className="lg:col-span-4">
                <h3 className="mb-4 text-base font-semibold text-white">Aloqa ma'lumotlari</h3>
                <ul className="space-y-4">
                  {contactInfo.map((contact, idx) => (
                    <li key={idx}>
                      <a
                        href={contact.href}
                        className="flex items-start gap-3 text-gray-400 transition hover:text-white group"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition bg-gray-800 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                          <Image
                            src={contact.icon}
                            alt={contact.label}
                            width={20}
                            height={20}
                            className="filter brightness-0 invert group-hover:brightness-100"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">{contact.label}</p>
                          <p className="text-[15px] font-medium">{contact.value}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

          {/* Bottom Footer */}
          <div className="py-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {/* Copyright */}
              <div className="flex flex-wrap items-center gap-4 text-[14px] text-gray-400">
                <p className="flex items-center gap-2">
                  <span>© 2025 IQmath</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Barcha huquqlar himoyalangan</span>
                </p>
              </div>
              {/* Social Media */}
              <div className="lg:col-span-4">
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:text-white transition transform hover:scale-110 hover:shadow-lg ${social.color} group`}
                      aria-label={social.name}
                    >
                      <div className="transition-transform group-hover:scale-110">{social.icon}</div>
                    </a>
                  ))}
                </div>
              </div>
              {/* Payment & Security Badges */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-400">Xavfsiz to'lov</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Made with</span>
                  <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>in Uzbekistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Scroll to Top Button
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed z-50 flex items-center justify-center w-12 h-12 text-white transition transform rounded-full shadow-lg bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-110 group"
        aria-label="Yuqoriga"
      >
        <svg
          className="w-6 h-6 transition-transform group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button> */}
    </footer>
  )
}

export default Footer
