import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import AdminNavigation from 'src/components/admin-navigation';
import DishGrid from 'src/components/dish-gird';
import Login from 'src/components/login/Login';
import { Categories, selectAdminNav, useAppSelector } from 'src/store';

const AdminPage: NextPage = () => {
  const adminNav = useAppSelector(selectAdminNav);

  const selectedComponent = useMemo(() => {
    switch (adminNav.activeCategoryIdx) {
      case Categories.Occurrences:
        return <DishGrid />;
    }
  }, [adminNav.activeCategoryIdx]);

  const adminPageContent = useMemo(
    () => (
      <>
        <AdminNavigation />
        {selectedComponent}
      </>
    ),
    [selectedComponent],
  );

  return adminNav.token ? adminPageContent : <Login />;
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
