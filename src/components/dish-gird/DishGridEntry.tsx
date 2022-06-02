import React from 'react';
import { Occurrence, ReviewStatus } from 'src/graphql/graphql-types';
import { useAppDispatch } from 'src/store';
import { updateReviewStatus } from 'src/store/actions/admin-page/updateReviewStatus';

import styles from './DishGrid.module.scss';

type Props = {
  displayName: string;
  sourceName: string;
  status: Occurrence['reviewStatus'];
  occurrenceUUID: string;
  dishUUID: string;
  date: Occurrence['date'];
};

const DishGridEntry = ({
  displayName,
  sourceName,
  status,
  occurrenceUUID,
  dishUUID,
  date,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.row}>
      <p>{displayName}</p>
      <p>{sourceName}</p>
      <div>
        <p>{status}</p>
        <button
          onClick={() =>
            dispatch(
              updateReviewStatus({
                dishUUID: dishUUID,
                occurrenceUUID: occurrenceUUID,
                status: ReviewStatus['Approved'],
                editDate: date,
              }),
            )
          }
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default DishGridEntry;
