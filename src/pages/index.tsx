import { NextPage } from 'next';
import Head from 'next/head';

import Navigation from '../components/navigation';
import TodayOverview from '../components/today-overview/';
import '../services/i18n';
import styles from '../styles/pages/index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mensatt</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Navigation />
      <TodayOverview />
    </div>
  );
};

export default Home;
