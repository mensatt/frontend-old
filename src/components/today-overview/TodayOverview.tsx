import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
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
  const navigation = useAppSelector(selectNavigation);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch(
      getDishesOfDate({
        date: thisWeeksMonday.add(navigation.weekday, 'day').toISOString(),
      }),
    );
    // Note: Not adding thisWeeksMonday here as it would cause an endless loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigation.weekday]);

  const content = todaysDishes.map((elem) => {
    return <Dish name={elem.dish.name} key={elem.id} />;
  });

  const contentWithMessage = todaysDishes.length > 0 ? content : t('noFoodMsg');

  return (
    <div className={styles.container}>
      {error.message ? error.message : contentWithMessage}
    </div>
  );
};
export default TodayOverview;
