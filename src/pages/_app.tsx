import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div id="styling" className="theme-TODO">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
