import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  GetOccurrencesByDateQuery,
  GetOccurrencesByDateQueryVariables,
} from 'src/graphql/graphql-types';
import {
  GET_NAVIGATION,
  GET_OCCURRENCES_BY_DATE,
  Navigation,
} from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

import Dish from '../dish/';

import styles from './TodayOverview.module.scss';

const TodayOverview = () => {
  const { t } = useTranslation('common');
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const { loading, data, error } = useQuery<
    GetOccurrencesByDateQuery,
    GetOccurrencesByDateQueryVariables
  >(GET_OCCURRENCES_BY_DATE, {
    variables: {
      // We can safely cast to string (aka remove undefined) here
      // as the query would be skipped if this is undefined
      date: (navData && navData.selectedDate) as string,
    },
    skip: !navData || !navData.selectedDate,
  });

  const content =
    data &&
    data.occurrencesByDate.map((elem) => {
      return <Dish name={elem.dish.nameDe} key={elem.id} />;
    });

  const contentWithMessage =
    data && data.occurrencesByDate.length > 0 ? content : t('noFoodMsg');

  return (
    <div className={styles.container}>
      {loading && t('loading')}
      {error && error.message}
      {!loading && !error && contentWithMessage}
    </div>
  );
};
export default TodayOverview;
