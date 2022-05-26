import React from 'react';
import { Occurrence } from 'src/graphql/graphql-types';

import styles from './DishGrid.module.scss';

type Props = {
  displayName: string;
  sourceName: string;
  status: Occurrence['reviewStatus'];
};

const DishGridEntry = ({ displayName, sourceName, status }: Props) => {
  return (
    <div className={styles.row}>
      <p>{displayName}</p>
      <p>{sourceName}</p>
      <p>{status}</p>
    </div>
  );
};

export default DishGridEntry;
