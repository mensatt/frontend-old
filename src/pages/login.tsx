import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { login, selectToken, useAppDispatch, useAppSelector } from 'src/store';

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = useAppSelector(selectToken);

  const router = useRouter();
  const { redirect } = router.query;

  // Redirect a user back where he came from (or to /) if he has a token
  useEffect(() => {
    if (token) {
      if (typeof redirect === 'string') {
        router.push(redirect);
      } else {
        router.push('/');
      }
    }
  }, [token, router, redirect]);

  return !token ? (
    <>
      <input
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        placeholder="E-Mail"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button
        onClick={() => {
          setEmail('');
          setPassword('');
          dispatch(login({ email: email, password: password }));
        }}
      >
        Log in
      </button>
    </>
  ) : (
    <></>
  );
};

export default LoginPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
