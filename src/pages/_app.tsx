import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import apolloClient from 'src/apollo/client';
import Footer from 'src/components/footer';
import Navigation from 'src/components/navigation';
import BackButton from 'src/components/navigation/back-button';
import WeekdaySelection from 'src/components/navigation/weekday-selection';
import RouteGuard from 'src/hocs/route-guard/RouteGuard';

import { ApolloProvider } from '@apollo/client';

import { NavigationDisplayOptions } from '../components/navigation/Navigation';
import '../styles/globals.scss';

type Features = {
  nav: NavigationDisplayOptions;
};

const layoutFeatures: Record<string, Features> = {
  index: {
    nav: {
      topLeftComp: <WeekdaySelection />,
      showBrand: true,
      showMensa: true,
      showLanguage: true,
      showProfile: true,
    },
  },
  default: {
    nav: {
      topLeftComp: <BackButton url="/" />,
      showBrand: true,
      showMensa: false,
      showLanguage: true,
      showProfile: true,
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /*
   * normalizedPath only contains the letters of the current path and in lower case
   *
   * / -> index
   * /privacy -> privacy
   * /acCOuNt/edIT/ -> account/edit
   */
  const normalizedPath = useMemo(
    () =>
      router.pathname
        .toLowerCase()
        .replace(/[^a-z\/]/g, '')
        .replace(/^\/|\/$/g, '') || 'index',
    [router.pathname],
  );

  /*
   * Everything before the first / from normalizedPath
   *
   * index -> index
   * privacy -> privacy
   * account/edit -> account
   */
  const category = useMemo(() => {
    const idx = normalizedPath.indexOf('/');
    return normalizedPath.substring(0, idx >= 0 ? idx : undefined);
  }, [normalizedPath]);

  const layout =
    layoutFeatures[normalizedPath] ||
    layoutFeatures[category] ||
    layoutFeatures.default;
  const navOpts = layout.nav;

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Mensatt</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className={'app-container'}>
        <Navigation opts={navOpts} />
        <div className={'page-content'}>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
