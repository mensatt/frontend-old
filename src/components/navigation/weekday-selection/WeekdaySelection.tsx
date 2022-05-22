import React, { useEffect, useMemo } from 'react';
import { afterFriday, currentWeekday, startOfWeek } from 'src/util/';

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
  const navigation = useAppSelector(selectNavigation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWeekday(afterFriday ? 0 : currentWeekday));
    // Disabling here because we only want to execute on initial page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const week = useMemo(() => {
    return [0, 1, 2, 3, 4].map((elem) => {
      return (
        <Weekday
          key={elem}
          date={startOfWeek.add(elem, 'day')}
          selected={elem === navigation.weekday}
          onClick={() => dispatch(setWeekday(elem))}
        />
      );
    });
  }, [dispatch, navigation.weekday]);
  return <div className={className + ' ' + styles.container}>{week}</div>;
};

export default WeekdaySelection;
