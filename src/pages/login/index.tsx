import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { isLoggedInVar } from 'src/apollo';
import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from 'src/graphql/graphql-types';
import { LOGIN_USER } from 'src/graphql/mutations';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useMutation, useQuery } from '@apollo/client';

import styles from './page.module.scss';

// Set this to true, if you whish to enable signup
const signupEnabled = false;

// This code is adapted from
// https://www.howtographql.com/react-apollo/5-authentication/
const Login: NextPage = () => {
  const { t } = useTranslation('login');

  const router = useRouter();
  const redirectURL = useMemo(() => {
    const { redirectURL } = router.query;
    return typeof redirectURL === 'string' ? redirectURL : '/';
  }, [router.query]);

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });
  const [login, { loading, error }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER, {
    variables: { email: formState.email, password: formState.password },
    onCompleted: ({ loginUser }) => {
      localStorage.setItem('token', loginUser);
      isLoggedInVar(true);
      router.push(redirectURL);
    },
  });

  const { data } = useQuery<Navigation>(GET_NAVIGATION);

  useEffect(() => {
    if (data && data.isLoggedIn) router.push(redirectURL);
  }, [data, redirectURL, router]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (formState.login) login();
      }}
      className={styles.wrapper}
    >
      <div className={styles.content}>
        <h2>{formState.login ? t('login') : t('register')}</h2>
        {error && <p className={styles.error}>{t('loginError')}</p>}
        <div className={styles.inputs}>
          {signupEnabled && !formState.login && (
            <>
              <label htmlFor="login-username">{t('chooseUsername')}</label>
              <input
                id="login-username"
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                  })
                }
                type="text"
                placeholder={t('chooseUsernamePlaceholder')}
              />
            </>
          )}
          <label htmlFor="login-email">{t('yourEmail')}</label>
          <input
            id="login-email"
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="email"
            placeholder={t('yourEmailPlaceholder')}
          />
          <label htmlFor="login-password">
            {formState.login ? t('yourPassword') : t('choosePassword')}
          </label>
          <input
            id="login-password"
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="•••••••••••"
          />
        </div>
        <div className={styles.buttons}>
          <button disabled={loading} className={styles.buttonPrimary}>
            {formState.login ? t('login') : t('register')}
          </button>
          {signupEnabled && (
            <button
              type="button"
              onClick={() =>
                setFormState({
                  ...formState,
                  login: !formState.login,
                })
              }
              className={styles.buttonSecondary}
            >
              {formState.login ? t('switchToRegister') : t('switchToLogin')}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
