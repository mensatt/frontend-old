import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  GET_NAVIGATION,
  GET_OCCURRENCES_BY_DATE,
  Navigation,
} from 'src/apollo';
import {
  GetOccurrenceByDateQuery,
  GetOccurrenceByDateQueryVariables,
} from 'src/graphql/graphql-types';
import { startOfWeek } from 'src/util';

import { useQuery } from '@apollo/client';

import Dish from '../dish/';

import styles from './TodayOverview.module.scss';

const TodayOverview = () => {
  const { t } = useTranslation('common');
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const { loading, data, error } = useQuery<
    GetOccurrenceByDateQuery,
    GetOccurrenceByDateQueryVariables
  >(GET_OCCURRENCES_BY_DATE, {
    variables: {
      date: startOfWeek
        .add(navData ? navData.selectedWeekday : 0, 'day')
        .toISOString(),
    },
  });

  const content =
    data &&
    data.getOccurrencesByDate.map((elem) => {
      return <Dish name={elem.dish.name} key={elem.id} />;
    });

  const contentWithMessage =
    data && data.getOccurrencesByDate.length > 0 ? content : t('noFoodMsg');

  return (
    <div className={styles.container}>
      {loading ? 'Loading...' : error ? error.message : contentWithMessage}
    </div>
  );
};
export default TodayOverview;
