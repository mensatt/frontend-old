import dayjs from 'dayjs';
import { NextRouter, useRouter } from 'next/router';
import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { selectedDateVar } from 'src/apollo';
import Icon from 'src/components/icon';
import {
  DATE_FORMAT,
  afterFriday,
  currentDate,
  getStartOfWeek,
} from 'src/util/';

import { useReactiveVar } from '@apollo/client';

import Weekday from './Weekday';
import styles from './WeekdaySelection.module.scss';

const DESKTOP_SWIPING_ENABLED = false;

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

  const [isDragging, setIsDragging] = useState(false);
  const [xCoordinate, setXCoordinate] = useState<number | null>(null);
  const [dragBeginX, setDragBeginX] = useState<number | null>(null);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [completedDragDirection, setCompletedDragDirection] = useState<
    'left' | 'right' | null
  >(null);

  const resetValues = useCallback(() => {
    setIsDragging(false);
    setXCoordinate(null);
    setDragDirection(null);
    setDragBeginX(null);
    setCompletedDragDirection(null);
  }, []);

  const handleMove = useCallback(
    (newXCoord: number) => {
      if (!isDragging || completedDragDirection) return;
      if (xCoordinate) {
        if (newXCoord > xCoordinate && dragDirection !== 'right') {
          setDragBeginX(newXCoord);
          setDragDirection('right');
        }
        if (newXCoord < xCoordinate && dragDirection !== 'left') {
          setDragBeginX(newXCoord);
          setDragDirection('left');
        }
      }

      setXCoordinate(newXCoord);
    },
    [completedDragDirection, dragDirection, isDragging, xCoordinate],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => DESKTOP_SWIPING_ENABLED && handleMove(event.screenX),
    [handleMove],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => handleMove(event.touches[0].screenX),
    [handleMove],
  );

  // Executed after values have been updated by `handleMove`
  useEffect(() => {
    if (!dragBeginX || !dragDirection || !xCoordinate) return;

    // How far (in percent relative to the screen size) have we swiped
    const distance =
      (Math.abs(dragBeginX - xCoordinate) * 100) / window.innerWidth;

    // If the user has swiped > 10% of his screen width consider a swipe completed
    // Note: This is only relevant on mobile where the navigation is full width
    if (distance > 10) setCompletedDragDirection(dragDirection);
  }, [dragBeginX, dragDirection, xCoordinate]);

  // Executed on completed drag
  useEffect(() => {
    if (!completedDragDirection) return;

    setDateChangedManually(true);
    selectedDateVarWrapper(
      selectedDate.add(completedDragDirection === 'right' ? 1 : -1, 'week'),
    );
    // Reset dragging values after setting new date
    resetValues();
  }, [
    completedDragDirection,
    resetValues,
    selectedDate,
    selectedDateVarWrapper,
  ]);

  return (
    <div
      className={styles.container}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => resetValues()}
      onMouseDown={() => DESKTOP_SWIPING_ENABLED && setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onMouseUp={() => DESKTOP_SWIPING_ENABLED && resetValues()}
      onMouseLeave={() => DESKTOP_SWIPING_ENABLED && resetValues()}
    >
      <div
        className={styles.button}
        onClick={() => {
          setDateChangedManually(true);
          selectedDateVarWrapper(selectedDate.subtract(1, 'week'));
        }}
      >
        <Icon name="arrow_left" />
      </div>
      {week}
      <div
        className={styles.button}
        onClick={() => {
          setDateChangedManually(true);
          selectedDateVarWrapper(selectedDate.add(1, 'week'));
        }}
      >
        <Icon name="arrow_right" />
      </div>
    </div>
  );
};

export default WeekdaySelection;
