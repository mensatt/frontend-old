import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import {
  selectNavigation,
  setWeekday,
  useAppDispatch,
  useAppSelector,
} from '../../../store';

import Weekday from './Weekday';
import styles from './WeekdaySelection.module.scss';

type Props = {
  className?: string;
};

const WeekdaySelection = ({ className }: Props) => {
  const thisWeeksMonday = dayjs().weekday(0);
  const { weekday } = useAppSelector(selectNavigation);
  const dispatch = useAppDispatch();

  const week = useMemo(() => {
    return [0, 1, 2, 3, 4].map((elem) => {
      return (
        <Weekday
          key={elem}
          date={thisWeeksMonday.add(elem, 'day')}
          selected={elem === weekday}
          onClick={() => dispatch(setWeekday(elem))}
        />
      );
    });
  }, [dispatch, thisWeeksMonday, weekday]);
  return <div className={className + ' ' + styles.container}>{week}</div>;
};

export default WeekdaySelection;
