import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TodayOverview from '../components/today-overview/';

const Home: NextPage = () => {
  return (
    <>
      <TodayOverview />
    </>
  );
};

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}

export default Home;
