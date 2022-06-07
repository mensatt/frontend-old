import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { selectedWeekdayVar } from 'src/apollo';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { afterFriday, currentWeekday, startOfWeek } from 'src/util/';

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

    // Get and parse the weekday from URL
    const { weekday: weekdayUrl } = router.query;
    const weekdayUrlParsed =
      typeof weekdayUrl === 'string' ? parseInt(weekdayUrl) : -1;

    const nextOpenWeekday = afterFriday ? 0 : currentWeekday;
    const weekdayToSet =
      weekdayUrlParsed >= 0 ? weekdayUrlParsed : nextOpenWeekday;

    selectedWeekdayVar(weekdayToSet);
  }, [router]);

  const week = useMemo(
    () =>
      data &&
      [0, 1, 2, 3, 4].map((elem) => {
        return (
          <Weekday
            key={elem}
            date={startOfWeek.add(elem, 'day')}
            selected={elem === data.selectedWeekday}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { weekday: elem },
              });
              selectedWeekdayVar(elem);
            }}
          />
        );
      }),
    [data, router],
  );

  return <div className={styles.container}>{week}</div>;
};

export default WeekdaySelection;
