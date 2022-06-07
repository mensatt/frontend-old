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
    <div>
      <h2>{formState.login ? t('login') : t('register')}</h2>
      {error && <p>{t('loginError')}</p>}
      <div>
        {signupEnabled && !formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder={t('chooseUsername')}
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder={t('yourEmail')}
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder={
            formState.login ? t('yourPassword') : t('choosePassword')
          }
        />
      </div>
      <div>
        <button onClick={() => login()} disabled={loading}>
          {formState.login ? t('login') : t('register')}
        </button>
        {signupEnabled && (
          <button
            onClick={() =>
              setFormState({
                ...formState,
                login: !formState.login,
              })
            }
          >
            {formState.login ? t('switchToRegister') : t('switchToLogin')}
          </button>
        )}
      </div>
    </div>
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
