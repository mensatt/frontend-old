import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo, useState } from 'react';
import Table, { TableDataRow, TableHeaderRow } from 'src/components/table';
import {
  GetAdminPanelOccurrencesQuery,
  GetAdminPanelOccurrencesQueryVariables,
  ReviewStatus,
  SetReviewStatusMutation,
  SetReviewStatusMutationVariables,
} from 'src/graphql/graphql-types';
import { SET_REVIEW_STATUS } from 'src/graphql/mutations/';
import {
  GET_ADMIN_PANEL_OCCURRENCES,
  GET_NAVIGATION,
  Navigation,
} from 'src/graphql/queries/';
import { DATE_FORMAT } from 'src/util';

import { useMutation, useQuery } from '@apollo/client';

const AdminOccurrencesPage: NextPage = () => {
  const { t } = useTranslation('common');
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);

  // TODO: In the future this can/should be updated to display/hide columns dynamically
  const [headerRows] = useState<TableHeaderRow[]>([
    { fieldName: 'name', displayName: 'Name' },
    { fieldName: 'reviewStatus', displayName: 'Review Status' },
    { fieldName: 'date', displayName: 'Date' },
  ]);

  const { data, loading, error } = useQuery<
    GetAdminPanelOccurrencesQuery,
    GetAdminPanelOccurrencesQueryVariables
  >(GET_ADMIN_PANEL_OCCURRENCES, {
    variables: { date: navData?.selectedDate as string },
    skip: !navData || navData.selectedDate.length < DATE_FORMAT.length,
  });

  const [setReviewStatus, { loading: mutationLoading }] = useMutation<
    SetReviewStatusMutation,
    SetReviewStatusMutationVariables
  >(SET_REVIEW_STATUS, {
    // TODO: In the future it might be better to just update the apollo cache
    // if the mutation was successful instead of refetching the data.
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_OCCURRENCES,
        variables: { date: navData?.selectedDate as string },
      },
    ],
  });

  const rows: TableDataRow[] = useMemo(() => {
    if (!data || data.occurrencesAfterInclusiveDate.length < 1) return [];

    return data.occurrencesAfterInclusiveDate.map((elem) => ({
      name: elem.dish.nameDe,
      reviewStatus: {
        node: (
          <>
            <select
              disabled={mutationLoading}
              value={elem.reviewStatus}
              onChange={(e) =>
                setReviewStatus({
                  variables: {
                    id: elem.id,
                    status: e.target.value as ReviewStatus,
                  },
                })
              }
            >
              <option value={ReviewStatus.Approved}>
                {ReviewStatus.Approved}
              </option>
              <option value={ReviewStatus.AwaitingApproval}>
                {ReviewStatus.AwaitingApproval}
              </option>
              <option value={ReviewStatus.Confirmed}>
                {ReviewStatus.Confirmed}
              </option>
              <option value={ReviewStatus.PendingDeletion}>
                {ReviewStatus.PendingDeletion}{' '}
              </option>
              <option value={ReviewStatus.Updated}>
                {ReviewStatus.Updated}
              </option>
            </select>
          </>
        ),
        value: elem.reviewStatus,
      },
      date: elem.date,
      ...(headerRows.find((elem) => elem.fieldName === 'id') && {
        id: elem.id,
      }),
    }));
  }, [data, headerRows, mutationLoading, setReviewStatus]);

  return (
    <>
      {loading && t('loading')}
      {error && error.message}
      {data && <Table headerRow={headerRows} dataRows={rows} />}
    </>
  );
};

export default AdminOccurrencesPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
