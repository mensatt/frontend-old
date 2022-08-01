import dayjs from 'dayjs';
import { NextRouter, useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { selectedDateVar } from 'src/apollo';
import {
  DATE_FORMAT,
  afterFriday,
  currentDate,
  getStartOfWeek,
} from 'src/util/';

import { useReactiveVar } from '@apollo/client';

import Weekday from './Weekday';
import styles from './WeekdaySelection.module.scss';

const WeekdaySelection = () => {
  const router = useRouter();

  const selectedDateString = useReactiveVar(selectedDateVar);
  const selectedDate = useMemo(
    () => dayjs(selectedDateString, DATE_FORMAT),
    [selectedDateString],
  );
  const selectedDateVarWrapper = useCallback(
    (date: dayjs.Dayjs) => selectedDateVar(date.format(DATE_FORMAT)),
    [],
  );

  const [dateChangedManually, setDateChangedManually] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (dateChangedManually)
      router.push(
        {
          pathname: router.pathname,
          query: {
            date: selectedDate.format(DATE_FORMAT),
          },
        },
        undefined,
        { shallow: true },
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateChangedManually, selectedDate]);

  // Computes the date that is set by the `useEffect` below
  const determineDateToSet = useCallback(
    (dateUrl: NextRouter['query'][string], afterFriday: boolean) => {
      const dateUrlParsed =
        typeof dateUrl === 'string'
          ? dayjs(dateUrl, DATE_FORMAT, true)
          : undefined;
      const nextMonday = currentDate.add(1, 'week').weekday(0);

      // Priority is as follows
      //  - date from URL (if present (and valid))
      //  - next monday (if currentDate is after friday)
      //  - currentDate
      if (dateUrlParsed?.isValid()) return dateUrlParsed;
      if (afterFriday) return nextMonday;
      return currentDate;
    },
    [],
  );

  useEffect(() => {
    // Skip execution until router is ready
    // This is done to avoid undefined query params
    // Also see: https://stackoverflow.com/a/66162437
    if (!router.isReady) return;

    // Get and parse the date from URL
    const { date: dateURL } = router.query;

    selectedDateVar(
      determineDateToSet(dateURL, afterFriday).format(DATE_FORMAT),
    );
  }, [determineDateToSet, router]);

  const week = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((_, idx) => {
        const thisWeekdaysDate = getStartOfWeek(selectedDate).add(idx, 'day');
        return (
          <Weekday
            key={idx}
            date={thisWeekdaysDate}
            selected={thisWeekdaysDate.isSame(selectedDate, 'day')}
            onClick={() => {
              setDateChangedManually(true);
              selectedDateVarWrapper(thisWeekdaysDate);
            }}
          />
        );
      }),
    [selectedDate, selectedDateVarWrapper],
  );

  return <div className={styles.container}>{week}</div>;
};

export default WeekdaySelection;
