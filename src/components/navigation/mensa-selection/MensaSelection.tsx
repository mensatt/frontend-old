import React, { useCallback, useEffect, useMemo } from 'react';
import { activeMensaIdxVar } from 'src/apollo';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

import styles from './MensaSelection.module.scss';

type Props = {
  className?: string;
};

const MensaSelection = ({ className }: Props) => {
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

  const onMensaClick = useCallback(() => {
    if (!data) return;
    if (typeof window !== 'undefined') {
      // On client, set localStorage item
      localStorage.setItem(
        'backendURL',
        data.mensas[(data.activeMensaIdx + 1) % 2].url,
      );
      // Reloading is needed to "apply" change (Apollo would cache otherwise)
      location.reload();
    }
  }, [data]);

  const activeMensa = useMemo(
    () => data && data.mensas[data.activeMensaIdx],
    [data],
  );

  return (
    <div className={className + ' ' + styles.content}>
      {activeMensa && <p onClick={onMensaClick}>{activeMensa.name}</p>}
    </div>
  );
};
export default MensaSelection;
