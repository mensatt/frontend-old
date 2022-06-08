import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { isLoggedInVar } from 'src/apollo';
import Icon from 'src/components/icon';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useLazyQuery } from '@apollo/client';

import styles from './LogoutButton.module.scss';

const LogoutButton = () => {
  const { t } = useTranslation('common');
  const [getNavigation, { data }] = useLazyQuery<Navigation>(GET_NAVIGATION);

  // We have to lazily call the query after the first page load to ensure proper hydration
  useEffect(() => {
    getNavigation();
  }, [getNavigation]);

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {data && (
        <Popup
          position="bottom right"
          on="click"
          closeOnDocumentClick
          open={popupOpen}
          onOpen={() => {
            localStorage.removeItem('token');
            isLoggedInVar(false);
            setPopupOpen(true);
            setTimeout(() => setPopupOpen(false), 1500);
          }}
          trigger={
            data.isLoggedIn ? (
              <button className={styles.button}>
                <Icon name={'logout'} />
              </button>
            ) : (
              <></>
            )
          }
        >
          <p>{t('logoutSuccessful')}</p>
        </Popup>
      )}
    </>
  );
};

export default LogoutButton;
