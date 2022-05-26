import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ReviewStatus } from 'src/graphql/graphql-types';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  addOccurrence,
  selectOccurrencesSortedByName,
  setOccurrenceSortOrder,
} from 'src/store/actions/admin-page';

import styles from './DishGrid.module.scss';
import DishGridEntry from './DishGridEntry';

const DishGrid = () => {
  const dispatch = useAppDispatch();
  const occurrences = useAppSelector(selectOccurrencesSortedByName);
  const dishes = useMemo(
    () =>
      occurrences.map((elem) => (
        <DishGridEntry
          key={elem.dish.name}
          displayName={elem.dish.name}
          sourceName={elem.dish.sourceName}
          status={elem.reviewStatus}
        />
      )),
    [occurrences],
  );

  return (
    <div className={styles.grid}>
      {/* TODO: Add special styling for header row */}
      <div className={styles.row}>
        <div>
          <button onClick={() => dispatch(setOccurrenceSortOrder('asc'))}>
            Sort asc
          </button>
          <button onClick={() => dispatch(setOccurrenceSortOrder('desc'))}>
            Sort desc
          </button>
          <button onClick={() => dispatch(setOccurrenceSortOrder('none'))}>
            Sort none
          </button>
          <p>Display Name</p>
        </div>
        <p>Source Name</p>
        <p>Status</p>
      </div>
      {dishes}
      <button
        onClick={() =>
          dispatch(
            addOccurrence({
              date: dayjs().toISOString(),
              dish: { name: 'Test', sourceName: 'Täst' },
              reviewStatus: ReviewStatus.Approved,
            }),
          )
        }
      >
        Add occurrence
      </button>
    </div>
  );
};

export default DishGrid;
