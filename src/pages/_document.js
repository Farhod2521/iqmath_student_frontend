import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Manrope — bosh sahifa menyusi uchun; Playfair Display — o'quvchi bannerining "35 YIL" yozuvi */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
        <script
          src="https://styleguide.brainly.com/images/math-symbols-icons-76ec20f543.js"
          strategy="afterInteractive"
        ></script>

        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-691ESLP31P"></script>
        {/* <script src="./metrika/google.js" /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-691ESLP31P');
            `
          }}
        />
        {/* Yandex Metrika — standart kod (oldin ./metrika/yandex.js nisbiy yo'l bilan ulanib 404 qaytarardi) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
              })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108997206','ym');
              ym(108997206,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',accurateTrackBounce:true,trackLinks:true});
            `
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108997206" alt="" style={{ position: 'absolute', left: '-9999px' }} />
          </div>
        </noscript>
      </body>
    </Html>
  )
}
