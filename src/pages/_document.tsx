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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default render;
