import Head from 'next/head'
import AppStoreButtons from '@/components/app-store-buttons'

export default function IqMathAppPage() {
  return (
    <>
      <Head>
        <title>IQ Math app</title>
        <meta
          name="description"
          content="IQ Math mobil ilovasini Android yoki IOS uchun yuklab oling. Скачайте мобильное приложение IQ Math для Android или IOS."
        />
      </Head>

      <main className="relative min-h-[100svh] overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-10">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-[1.1] bg-cover bg-center blur-[6px]"
            style={{ backgroundImage: 'url(https://api.iqmath.uz/Media/BANNER/bg-img.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90" />
        </div>

        <section className="relative mx-auto flex min-h-[calc(100svh-48px)] w-full max-w-3xl flex-col items-center justify-center text-center sm:min-h-[calc(100svh-64px)]">
          <div className="mb-7 flex items-center gap-2.5 sm:mb-8 sm:gap-3">
            <img
              src="https://api.iqmath.uz/system/logo/logo.png"
              alt="IQ Math"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
            />
            <span className="font-bicubik font-myriad text-2xl leading-none text-white sm:text-4xl md:text-5xl">
              MATH
            </span>
          </div>

          <div className="w-full">
            <h1 className="text-3xl mx-auto max-w-2xl text-[28px] font-bold leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Ilovani yuklab oling
            </h1>
            <h1 className="text-3xl mx-auto max-w-2xl text-[28px] font-bold leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Скачайте приложение
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Android yoki IOS ni tanlang / Выберите Android или IOS
            </p>
          </div>

          <AppStoreButtons className="mt-8 w-full justify-center sm:mt-10" />
        </section>
      </main>
    </>
  )
}
