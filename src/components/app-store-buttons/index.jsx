import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/appLinks'

export default function AppStoreButtons({ className = '' }) {
  return (
    <div className={`flex gap-3 max-[360px]:flex-col sm:flex-row sm:items-center ${className}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noreferrer"
        className="
          group flex h-[48px] w-full min-w-[160px] items-center gap-3
          rounded-xl border border-white/20 bg-black/70 px-3
          shadow-lg shadow-black/40 ring-1 ring-white/15 backdrop-blur-md
          transition hover:-translate-y-[1px] hover:bg-black/80 hover:shadow-black/50
          active:scale-[0.98] sm:h-[54px] sm:w-auto sm:min-w-[180px]
          sm:rounded-2xl sm:px-4 md:h-[60px] md:min-w-[200px] md:px-5
        "
      >
        <svg viewBox="0 0 25 25" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.7756 11.5149L17.4561 9.05957L14.0156 12.5L17.4561 15.9405L21.7756 13.4852C22.541 13.0532 22.541 11.9468 21.7756 11.5149Z"
            fill="url(#appStoreButtonsGp0)"
          />
          <path
            d="M14.0156 12.5001L3.73969 2.22412C3.53508 2.42873 3.40625 2.70154 3.40625 3.0274V21.9727C3.40625 22.2986 3.53508 22.579 3.73969 22.776L14.0156 12.5001Z"
            fill="url(#appStoreButtonsGp1)"
          />
          <path
            d="M17.456 9.05959L5.10369 2.04225C4.62626 1.76943 4.08064 1.89068 3.73962 2.22412L14.0156 12.5001L17.456 9.05959Z"
            fill="url(#appStoreButtonsGp2)"
          />
          <path
            d="M14.0156 12.5001L3.73962 22.776C4.08064 23.117 4.62626 23.2307 5.10369 22.9579L17.456 15.9405L14.0156 12.5001Z"
            fill="url(#appStoreButtonsGp3)"
          />

          <defs>
            <linearGradient id="appStoreButtonsGp0" x1="14.0156" y1="12.5" x2="22.3516" y2="12.5">
              <stop stopColor="#FFBD00" />
              <stop offset="1" stopColor="#FFE000" />
            </linearGradient>
            <linearGradient id="appStoreButtonsGp1" x1="14.0156" y1="12.5" x2="3.4" y2="23">
              <stop stopColor="#00BEFF" />
              <stop offset="1" stopColor="#00E3FF" />
            </linearGradient>
            <linearGradient id="appStoreButtonsGp2" x1="3.4" y1="1.8" x2="14.0156" y2="12.5">
              <stop stopColor="#15CF74" />
              <stop offset="1" stopColor="#00F076" />
            </linearGradient>
            <linearGradient id="appStoreButtonsGp3" x1="14.0156" y1="12.5" x2="3.4" y2="23">
              <stop stopColor="#FF3A44" />
              <stop offset="1" stopColor="#E12653" />
            </linearGradient>
          </defs>
        </svg>

        <span className="leading-tight text-left">
          <span className="block text-[9px] text-white/70 sm:text-[10px] md:text-[11px]">Android</span>
          <span className="block text-[13px] font-semibold text-white sm:text-[15px] md:text-[16px]">Google Play</span>
        </span>
      </a>

      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className="
          group flex h-[48px] w-full min-w-[160px] items-center gap-3
          rounded-xl border border-black/10 bg-white/90 px-3
          shadow-lg shadow-black/15 ring-1 ring-white/40
          transition hover:-translate-y-[1px] hover:bg-white hover:shadow-black/25
          active:scale-[0.98] sm:h-[54px] sm:w-auto sm:min-w-[180px]
          sm:rounded-2xl sm:px-4 md:h-[60px] md:min-w-[200px] md:px-5
        "
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.1475 0.75C16.2469 2.01122 15.8492 3.27244 15.0438 4.24338C14.2583 5.22433 13.0751 5.78488 11.8223 5.77487C11.7427 4.54367 12.1504 3.3325 12.9558 2.41161C13.7711 1.4707 14.9146 0.880126 16.1475 0.75ZM20.1292 8.17598C18.6806 9.06488 17.7915 10.623 17.7715 12.3208C17.7715 14.2385 18.9204 15.9663 20.6986 16.7154C20.3589 17.814 19.8495 18.8627 19.1801 19.8016C18.291 21.1399 17.352 22.4483 15.8635 22.4683C15.1551 22.4829 14.6784 22.2802 14.1823 22.0692C13.664 21.8488 13.1244 21.6193 12.277 21.6193C11.382 21.6193 10.8176 21.8551 10.2723 22.0828C9.80114 22.2796 9.34424 22.4705 8.70063 22.4982C7.28205 22.5582 6.20313 21.08 5.27406 19.7516C3.42592 17.045 1.98736 12.1311 3.91543 8.78523C4.82452 7.15725 6.51282 6.11854 8.38095 6.05861C9.18561 6.04161 9.95812 6.35239 10.6347 6.62457C11.1509 6.83223 11.6112 7.01742 11.9873 7.01742C12.3159 7.01742 12.7611 6.84099 13.2807 6.63506C14.1041 6.30877 15.1142 5.90844 16.1432 6.01866C17.7316 6.0686 19.2101 6.86761 20.1292 8.17598Z"
            fill="black"
          />
        </svg>

        <span className="leading-tight text-left">
          <span className="block text-[9px] text-black/60 sm:text-[10px] md:text-[11px]">iOS</span>
          <span className="block text-[13px] font-semibold text-black sm:text-[15px] md:text-[16px]">App Store</span>
        </span>
      </a>
    </div>
  )
}
