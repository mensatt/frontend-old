import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Footer from 'src/components/footer';

import { store } from '../store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Mensatt</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div id="styling" className="theme-TODO">
        <div className={'container'}>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
