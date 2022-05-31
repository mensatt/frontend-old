import React, { useEffect, useMemo } from 'react';
import {
  SortOrder,
  selectNavigation,
  selectOccurrenceOrderType,
  selectOccurrencesSortedByName,
  setOccurrenceSortOrder,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { getAdminPanelOccurrences } from 'src/store';
import { startOfWeek } from 'src/util';

import styles from './DishGrid.module.scss';
import DishGridEntry from './DishGridEntry';

const DishGrid = () => {
  const dispatch = useAppDispatch();
  const occurrences = useAppSelector(selectOccurrencesSortedByName);
  const sortOrder = useAppSelector(selectOccurrenceOrderType);
  const navigation = useAppSelector(selectNavigation);

  useEffect(() => {
    dispatch(
      getAdminPanelOccurrences({
        date: startOfWeek.add(navigation.weekday, 'day').toISOString(),
      }),
    );
  }, [dispatch, navigation.weekday]);

  const dishes = useMemo(
    () =>
      occurrences.map((elem) => (
        <DishGridEntry
          key={elem.id}
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
                  dispatch(setOccurrenceSortOrder(SortOrder.Desc));
                  break;
                case SortOrder.Desc:
                  dispatch(setOccurrenceSortOrder(SortOrder.Asc));
                  break;
                case SortOrder.Asc:
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
      {/* <button
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
      </button> */}
    </div>
  );
};

export default DishGrid;
