import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import { activeBackendIdxVar, activeLocationIdVar } from 'src/apollo';
import {
  GetLocationsQuery,
  GetLocationsQueryVariables,
} from 'src/graphql/graphql-types';
import { GET_LOCATIONS, GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { isDev } from 'src/util';

import { useQuery } from '@apollo/client';

import styles from './MensaSelection.module.scss';

// Note: This is a fallback for the fallback. It should not be needed in normal use
// and will only be used if the backend is not working (as expected)
const fallbackLocation = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Offline',
};

const MensaSelection = () => {
  const { t } = useTranslation('common');
  const { data } = useQuery<Navigation>(GET_NAVIGATION);

  const [popupOpen, setPopupOpen] = useState(false);

  const { data: locationData, loading: locationDataLoading } = useQuery<
    GetLocationsQuery,
    GetLocationsQueryVariables
  >(GET_LOCATIONS);

  // TODO: In the future change the filter function below to display other locations
  const filteredLocations = useMemo(
    () =>
      locationData?.locations
        .filter((location) => location.name.includes('Erlangen '))
        .map((location) => ({
          ...location,
          name: location.name.split('Erlangen ')[1],
        })),
    [locationData?.locations],
  );

  useEffect(() => {
    if (!data) return;
    if (typeof window !== 'undefined') {
      // We only want to use the backendUrl from localStorage in dev
      if (isDev) {
        // Read localStorage item if present
        const cookieBackendIdx = data.backends.findIndex(
          (elem) => elem.url === localStorage.getItem('backendURL'),
        );
        if (cookieBackendIdx != -1) activeBackendIdxVar(cookieBackendIdx);
      }

      // Read localStorage item if present
      const cookieLocationId = filteredLocations?.find(
        (elem) => elem.id === localStorage.getItem('locationId'),
      );
      // If possible use first location as fallback
      activeLocationIdVar(
        cookieLocationId?.id ||
          (filteredLocations && filteredLocations.length > 0
            ? filteredLocations[0].id
            : fallbackLocation.id),
      );
    }
  }, [data, filteredLocations]);

  const onMensaClick = useCallback((id: string) => {
    activeLocationIdVar(id);
    if (typeof window !== 'undefined') {
      // On client, set localStorage item
      localStorage.setItem('locationId', id);
    }
  }, []);

  const onBackendChange = useCallback(
    (idx: number) => {
      if (!data) return;
      if (typeof window !== 'undefined') {
        // On client, set localStorage item
        localStorage.setItem('backendURL', data.backends[idx].url);
        // Reloading is needed to "apply" change (Apollo would cache otherwise)
        location.reload();
      }
    },
    [data],
  );

  const button = useMemo(() => {
    if (!data) return;

    const foundMensa = filteredLocations?.find(
      (location) => location.id === data.activeLocationId,
    );

    // If possible use first location as fallback
    const activeMensa =
      foundMensa ||
      (filteredLocations && filteredLocations?.length > 0
        ? filteredLocations[0]
        : fallbackLocation);

    return (
      <button
        className={styles.button}
        tabIndex={0}
        onClick={() => setPopupOpen(!popupOpen)}
        disabled={locationDataLoading}
      >
        <p>{locationDataLoading ? t('loading') : activeMensa.name}</p>
      </button>
    );
  }, [data, filteredLocations, locationDataLoading, popupOpen, t]);

  /*
    NOTE: This is a VERY hacky workaround that is needed because at the time of writing reduxjs-popup did not support
    using `open => ReactNode` as children (even though it was documented). So I had to work around it.
    
    TODO: Investigate if this is still needed in the future or perhaps even replace popups with own implementation
  */
  return !popupOpen ? (
    <>{button}</>
  ) : (
    <Popup
      trigger={button}
      open={popupOpen}
      position={['bottom center', 'bottom right']}
      closeOnDocumentClick
      on="click"
      arrow={false}
    >
      {isDev &&
        data?.backends.map((backend, idx) => (
          <label key={idx}>
            <input
              type="radio"
              checked={data.activeBackendIdx === idx}
              onChange={() => {
                onBackendChange(idx);
                setPopupOpen(false);
              }}
            />
            {backend.name}
          </label>
        ))}

      {filteredLocations?.map((location) => (
        <button
          key={location.id}
          tabIndex={0}
          onClick={() => {
            onMensaClick(location.id);
            setPopupOpen(false);
          }}
        >
          {location.name}
        </button>
      ))}
    </Popup>
  );
};
export default MensaSelection;
