import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import AdminNavigation from 'src/components/admin-navigation';
import DishGrid from 'src/components/dish-gird';
import { useAppSelector } from 'src/store';
import { Categories, selectAdminNav } from 'src/store/actions/admin-nav';

const AdminPage: NextPage = () => {
  const adminNav = useAppSelector(selectAdminNav);

  const selectedComponent = useMemo(() => {
    switch (adminNav.activeCategoryIdx) {
      case Categories.Occurrences:
        return <DishGrid />;
    }
  }, [adminNav.activeCategoryIdx]);

  return (
    <>
      <AdminNavigation />
      {selectedComponent}
    </>
  );
};

export default AdminPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
