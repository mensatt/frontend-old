import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { selectError } from 'src/store/actions/error';
import { startOfWeek } from 'src/util';

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
  const navigation = useAppSelector(selectNavigation);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (navigation.weekday === -1) return;
    dispatch(
      getDishesOfDate({
        date: startOfWeek.add(navigation.weekday, 'day').toISOString(),
      }),
    );
  }, [dispatch, navigation.weekday]);

  const content = todaysDishes.map((elem) => {
    return <Dish dish={elem.dish} key={elem.id} />;
  });

  const contentWithMessage = todaysDishes.length > 0 ? content : t('noFoodMsg');

  return (
    <div className={styles.container}>
      {error.message ? error.message : contentWithMessage}
    </div>
  );
};
export default TodayOverview;
