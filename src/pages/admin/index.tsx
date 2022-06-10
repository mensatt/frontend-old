import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const AdminPage: NextPage = () => {
  return <div>AdminPage</div>;
};

export default AdminPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
