import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div id="styling" className="theme-TODO">
        <div className={'container'}>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
