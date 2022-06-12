import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import {
  GetOccurrencesByDateQuery,
  GetOccurrencesByDateQueryVariables,
} from 'src/graphql/graphql-types';
import {
  GET_NAVIGATION,
  GET_OCCURRENCES_BY_DATE,
  Navigation,
} from 'src/graphql/queries';
import { DATE_FORMAT } from 'src/util';

import { useQuery } from '@apollo/client';

import Dish from '../dish/';

import styles from './TodayOverview.module.scss';

const TodayOverview = () => {
  const { locale: routerLocale } = useRouter();
  const locale = useMemo(
    () => (routerLocale ? routerLocale : 'de'),
    [routerLocale],
  );

  const { t } = useTranslation('common');
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const { loading, data, error } = useQuery<
    GetOccurrencesByDateQuery,
    GetOccurrencesByDateQueryVariables
  >(GET_OCCURRENCES_BY_DATE, {
    variables: {
      // We can safely cast to string (aka remove undefined) here
      // as the query would be skipped if this is not a string
      date: (navData && navData.selectedDate) as string,
    },
    skip: !navData || navData.selectedDate.length < DATE_FORMAT.length,
  });

  const content =
    data &&
    data.occurrencesByDate.map(({ dish: { nameDe, nameEn }, id }) => {
      // Fallback to german value if no english value is present
      return (
        <Dish name={locale == 'en' ? nameEn ?? nameDe : nameDe} key={id} />
      );
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
