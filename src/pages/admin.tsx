import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo, useState } from 'react';
import AdminNavigation from 'src/components/admin-navigation';
import DishGrid from 'src/components/dish-gird';
import {
  Categories,
  login,
  selectAdminNav,
  useAppDispatch,
  useAppSelector,
} from 'src/store';

const AdminPage: NextPage = () => {
  const adminNav = useAppSelector(selectAdminNav);
  const dispatch = useAppDispatch();

  const selectedComponent = useMemo(() => {
    switch (adminNav.activeCategoryIdx) {
      case Categories.Occurrences:
        return <DishGrid />;
    }
  }, [adminNav.activeCategoryIdx]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <AdminNavigation />
      <input onChange={(event) => setEmail(event.target.value)} value={email} />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
      />
      <button
        onClick={() => {
          setEmail('');
          setPassword('');
          dispatch(login({ email: email, password: password }));
        }}
      >
        Get Token
      </button>

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
