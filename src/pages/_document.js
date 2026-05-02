import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

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
        <script src="./metrika/yandex.js" />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108997206" alt="" style={{ position: 'absolute', left: '-9999px' }} />
          </div>
        </noscript>
      </body>
    </Html>
  )
}
