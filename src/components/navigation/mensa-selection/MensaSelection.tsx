import React, { useCallback, useEffect, useMemo } from 'react';
import {
  selectNavigation,
  setActiveMensaIdx,
  useAppDispatch,
  useAppSelector,
} from 'src/store';

import styles from './MensaSelection.module.scss';

type Props = {
  className?: string;
};

const MensaSelection = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useAppSelector(selectNavigation);
  const { activeMensaIdx, mensas } = navigation;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Read localStorage item if present
      const cookeMensaIdx = mensas.findIndex(
        (elem) => elem.url === localStorage.getItem('backendURL'),
      );
      // Dispatching is needed to get the information to the component below
      if (cookeMensaIdx != -1) dispatch(setActiveMensaIdx(cookeMensaIdx));
    }
  }, [dispatch, mensas]);

  const onMensaClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      // On client, set localStorage item
      localStorage.setItem('backendURL', mensas[(activeMensaIdx + 1) % 2].url);
      // Reloading is needed to "apply" change (Apollo would cache otherwise)
      location.reload();
    }
  }, [activeMensaIdx, mensas]);

  const activeMensa = useMemo(
    () => mensas[activeMensaIdx],
    [activeMensaIdx, mensas],
  );

  return (
    <div className={className + ' ' + styles.content}>
      <p onClick={onMensaClick}>{activeMensa.name}</p>
    </div>
  );
};
export default MensaSelection;
