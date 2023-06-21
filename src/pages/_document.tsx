import { Head, Html, Main, NextScript } from 'next/document';

const render = function () {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
        <link rel="icon" href="/favicon-32.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to use this page!</noscript>
        <script
          async
          src="https://umami.mensatt.de/script.js"
          data-website-id="3e757e9e-d5a2-43d8-b62f-73b155f99800"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default render;
