import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Footer from 'src/components/footer';
import Navigation from 'src/components/navigation';

import { NavigaitonDisplayOptions } from '../components/navigation/Navigation';
import { store } from '../store';
import '../styles/globals.scss';

type Features = {
  nav: NavigaitonDisplayOptions;
};

const layoutFeatures: Record<string, Features> = {
  index: {
    nav: {
      action: 'weekday-selection',
      brand: true,
      mensa: true,
      language: true,
    },
  },
  default: {
    nav: {
      action: 'back-button',
      brand: true,
      mensa: false,
      language: true,
    },
  },
};

function MyApp({ Component, pageProps, router }: AppProps) {
  /*
   * normalizedPath only contains the letters of the current path and in lower case
   *
   * / -> index
   * /privacy -> privacy
   * /acCOuNt/edIT/ -> account/edit
   */
  const normalizedPath =
    router.pathname
      .toLowerCase()
      .replace(/[^a-z\/]/g, '')
      .replace(/^\/|\/$/g, '') || 'index';

  const layout = layoutFeatures[normalizedPath] || layoutFeatures.default;
  const navOpts = layout.nav;

  return (
    <Provider store={store}>
      <Head>
        <title>Mensatt</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div id="styling" className="theme-TODO">
        <div className={'container'}>
          <Navigation opts={navOpts} />
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
