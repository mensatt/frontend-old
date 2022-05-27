import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ReviewStatus } from 'src/graphql/graphql-types';
import {
  SortOrder,
  addOccurrence,
  selectOccurrenceOrderType,
  selectOccurrencesSortedByName,
  setOccurrenceSortOrder,
  useAppDispatch,
  useAppSelector,
} from 'src/store';

import styles from './DishGrid.module.scss';
import DishGridEntry from './DishGridEntry';

const DishGrid = () => {
  const dispatch = useAppDispatch();
  const occurrences = useAppSelector(selectOccurrencesSortedByName);
  const sortOrder = useAppSelector(selectOccurrenceOrderType);
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
          <p
            onClick={() => {
              switch (sortOrder) {
                case SortOrder.None:
                  dispatch(setOccurrenceSortOrder(SortOrder.Asc));
                  break;
                case SortOrder.Asc:
                  dispatch(setOccurrenceSortOrder(SortOrder.Desc));
                  break;
                case SortOrder.Desc:
                  dispatch(setOccurrenceSortOrder(SortOrder.None));
                  break;
              }
            }}
          >
            {'Display Name' +
              (sortOrder !== SortOrder.None ? ' (' + sortOrder + ')' : '')}
          </p>
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
