import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { login, selectToken, useAppDispatch, useAppSelector } from 'src/store';

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = useAppSelector(selectToken);

  const router = useRouter();
  const { redirectURL } = router.query;

  const redirectToParamOrRoot = useCallback(() => {
    if (typeof redirectURL === 'string') {
      router.push(redirectURL);
    } else {
      router.push('/');
    }
  }, [redirectURL, router]);

  // Redirect a user back where he came from (or to / if the argument is no string) if he has a token
  // This is only run one time on page load
  useEffect(() => {
    if (token) redirectToParamOrRoot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This redirect in this useEffect is (only) run once the login token was successfully acquired
  useEffect(() => {
    if (token) redirectToParamOrRoot();
  }, [redirectToParamOrRoot, redirectURL, token]);

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
