import React, { useCallback, useEffect, useMemo } from 'react';
import Popup from 'reactjs-popup';
import { activeMensaIdxVar } from 'src/apollo';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

import styles from './MensaSelection.module.scss';

const MensaSelection = () => {
  const { data } = useQuery<Navigation>(GET_NAVIGATION);

  useEffect(() => {
    if (!data) return;
    if (typeof window !== 'undefined') {
      // Read localStorage item if present
      const cookeMensaIdx = data.mensas.findIndex(
        (elem) => elem.url === localStorage.getItem('backendURL'),
      );
      // Setting the value a second time is needed to get the information to the component below
      if (cookeMensaIdx != -1) activeMensaIdxVar(cookeMensaIdx);
    }
  }, [data]);

  const onMensaClick = useCallback(
    (idx: number) => {
      if (!data) return;
      if (typeof window !== 'undefined') {
        // On client, set localStorage item
        localStorage.setItem('backendURL', data.mensas[idx].url);
        // Reloading is needed to "apply" change (Apollo would cache otherwise)
        location.reload();
      }
    },
    [data],
  );

  const activeMensa = useMemo(
    () => data && data.mensas[data.activeMensaIdx],
    [data],
  );

  const display = activeMensa && (
    <button className={styles.button} tabIndex={0}>
      <p>{activeMensa.name}</p>
    </button>
  );

  const options =
    data &&
    data.mensas.map((mensa, idx) => (
      <button key={mensa.url} onClick={() => onMensaClick(idx)} tabIndex={0}>
        {mensa.name}
      </button>
    ));

  return (
    <Popup
      trigger={display}
      position={['bottom center', 'bottom right']}
      closeOnDocumentClick
      on="click"
      arrow={false}
    >
      {options}
    </Popup>
  );
};
export default MensaSelection;
