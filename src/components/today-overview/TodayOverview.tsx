import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { selectError } from 'src/store/actions/error';

import {
  selectNavigation,
  selectTodaysDishes,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { getDishesOfDate } from '../../store/actions/todays-dishes/getDIshesOfDate';
import Dish from '../dish/';

import styles from './TodayOverview.module.scss';

const TodayOverview = () => {
  const todaysDishes = useAppSelector(selectTodaysDishes);
  const thisWeeksMonday = dayjs().weekday(0);
  const { weekday } = useAppSelector(selectNavigation);
  const { message: errorMessage } = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getDishesOfDate({
        date: thisWeeksMonday.add(weekday, 'day').toISOString(),
      }),
    );
    // Note: Not adding thisWeeksMonday here as it would cause an endless loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, weekday]);

  const content = todaysDishes.map((elem) => {
    return <Dish name={elem.dish.name} key={elem.id} />;
  });

  const contentWithMessage =
    todaysDishes.length > 0
      ? content
      : 'Es scheint als gäbe es heute nix zu Essen :(';

  return (
    <div className={styles.container}>
      {errorMessage ? errorMessage : contentWithMessage}
    </div>
  );
};
export default TodayOverview;
