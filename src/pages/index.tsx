import { NextPage } from 'next';
import Head from 'next/head';

import Navigation from '../components/navigation';
import styles from '../styles/pages/index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mensatt</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Navigation />
      <main></main>
    </div>
  );
};

export default Home;
