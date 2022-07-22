import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { Url } from 'url';

import { useQuery } from '@apollo/client';

type Props = {
  children: ReactNode;
};

// This code is adapted from
// https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated
const RouteGuard = ({ children }: Props) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { data } = useQuery<Navigation>(GET_NAVIGATION);

  // Construct allowed paths
  const langPrefixes = useMemo(() => ['/', '/en'], []);
  const publicPaths = useMemo(() => ['/login', '/contact', '/privacy'], []);
  const publicPathsWithLangPrefixes = useMemo(
    () =>
      langPrefixes.flatMap((prefix) => {
        if (prefix === '/') {
          return [prefix, ...publicPaths];
        } else {
          return [prefix, ...publicPaths.map((path) => prefix + path)];
        }
      }),
    [langPrefixes, publicPaths],
  );

  const authCheck = useCallback(
    (url: string) => {
      const path = url.split('?')[0];

      if (!data) {
        setAuthorized(false);
        return;
      }

      /**
       * TODO: Simply checking if the token is non-empty will allow access to every page that is not in
       * `publicPathsWithLangPrefixes` if a token is present.
       * If in the future there should be more than one level of access this approach has to be refined
       * or a better one found.
       **/
      // Redirect to login page if accessing a private page and not logged in
      if (!data.isLoggedIn && !publicPathsWithLangPrefixes.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: '/login',
          query: { redirectURL: url },
        });
      } else {
        setAuthorized(true);
      }
    },
    [data, publicPathsWithLangPrefixes, router],
  );

  useEffect(() => {
    // On initial load (and every time token changes) - run auth check
    authCheck(router.asPath);

    // On route change start - hide page content by setting authorized to false
    // Note if we are shallow routing we stay on the same page and therefore don't have to hide the content
    // TODO: Could use a better type for `transitionOptions`.
    // The ideal solution (to use the type from next/router) sadly is not possible as that type is not exported
    const hideContent = (_: Url, transitionOptions: { shallow: boolean }) =>
      setAuthorized(transitionOptions.shallow);
    router.events.on('routeChangeStart', hideContent);

    // On route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // Unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{authorized && children}</>;
};

export default RouteGuard;
