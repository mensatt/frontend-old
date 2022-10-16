import { useTranslation } from 'next-i18next';
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

import Occurrence from '../occurrence';

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
      // as the query would be skipped if this is not a string
      date: (navData && navData.selectedDate) as string,
      locationId: (navData && navData.activeLocationId) as string,
    },
    skip: !navData || navData.selectedDate.length < DATE_FORMAT.length,
  });

  // Remove duplicate occurrences. This hack is needed because there were
  // bugs in the backend that caused duplicate occurrences
  // TODO: Remove once those duplicated entries are deleted
  const uniqueOccurrences = useMemo(() => {
    const uniqueDishIds = data?.occurrences
      .map((occ) => occ.dish.id)
      // Only pick the first occurrence of each id
      .filter((val, idx, arr) => arr.indexOf(val) === idx);

    return (
      data?.occurrences &&
      uniqueDishIds?.map(
        (id) =>
          // Find (first) occurrence with that id or just use the first one
          // Note: The latter should not occur and is a quick workaround to achieve proper typing
          data.occurrences.find((occ) => occ.dish.id == id) ||
          data.occurrences[0],
      )
    );
  }, [data?.occurrences]);

  const content =
    uniqueOccurrences &&
    uniqueOccurrences.map((occurrence) => (
      <Occurrence occurrence={occurrence} key={occurrence.id} />
    ));

  const contentWithMessage =
    data && data.occurrences.length > 0 ? content : t('noFoodMsg');

  return (
    <div className={styles.container}>
      {loading && t('loading')}
      {error && error.message}
      {!loading && !error && contentWithMessage}
    </div>
  );
};
export default TodayOverview;
