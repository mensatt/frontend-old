import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { selectedDateVar } from 'src/apollo';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { DATE_FORMAT, afterFriday, currentDate, startOfWeek } from 'src/util/';

import { useQuery } from '@apollo/client';

import Weekday from './Weekday';
import styles from './WeekdaySelection.module.scss';

const WeekdaySelection = () => {
  const { data } = useQuery<Navigation>(GET_NAVIGATION);
  const router = useRouter();

  useEffect(() => {
    // Skip execution until router is ready
    // This is done to avoid undefined query params
    // Also see: https://stackoverflow.com/a/66162437
    if (!router.isReady) return;

    // Get and parse the date from URL
    const { date: dateURL } = router.query;
    const dateURLParsed =
      typeof dateURL === 'string'
        ? dayjs(dateURL, DATE_FORMAT, true)
        : undefined;
    const nextOpenDate = afterFriday ? startOfWeek : currentDate;
    const dateToSet = dateURLParsed?.isValid() ? dateURLParsed : nextOpenDate;

    selectedDateVar(dateToSet.format(DATE_FORMAT));
  }, [router]);

  const week = useMemo(
    () =>
      data &&
      [0, 1, 2, 3, 4].map((elem) => {
        const thisWeekdaysDate = startOfWeek.add(elem, 'day');
        const thisWeekdaysDateString = thisWeekdaysDate.format(DATE_FORMAT);
        return (
          <Weekday
            key={elem}
            date={thisWeekdaysDate}
            selected={thisWeekdaysDateString === data.selectedDate}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { date: thisWeekdaysDateString },
              });
              selectedDateVar(thisWeekdaysDateString);
            }}
          />
        );
      }),
    [data, router],
  );

  return <div className={styles.container}>{week}</div>;
};

export default WeekdaySelection;
