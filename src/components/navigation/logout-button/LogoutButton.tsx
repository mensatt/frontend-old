import React, { useEffect } from 'react';
import { isLoggedInVar } from 'src/apollo';
import Icon from 'src/components/icon';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useLazyQuery } from '@apollo/client';

import styles from './LogoutButton.module.scss';

const LogoutButton = () => {
  const [getNavigation, { data }] = useLazyQuery<Navigation>(GET_NAVIGATION);

  // We have to lazily call the query after the first page load to ensure proper hydration
  useEffect(() => {
    getNavigation();
  }, [getNavigation]);

  return (
    <>
      {data && data.isLoggedIn && (
        <button
          onClick={() => {
            localStorage.removeItem('token');
            isLoggedInVar(false);
          }}
          className={styles.button}
        >
          <Icon name={'logout'} />
        </button>
      )}
    </>
  );
};

export default LogoutButton;
