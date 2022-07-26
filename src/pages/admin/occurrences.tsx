import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo, useState } from 'react';
import Table, { TableDataRow, TableHeaderRow } from 'src/components/table';
import {
  GetAdminPanelOccurrencesQuery,
  GetAdminPanelOccurrencesQueryVariables,
  OccurrenceStatus,
  SetOccurrenceStatusMutation,
  SetOccurrenceStatusMutationVariables,
} from 'src/graphql/graphql-types';
import { SET_OCCURRENCE_STATUS } from 'src/graphql/mutations/';
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
    { fieldName: 'occurrenceStatus', displayName: 'Review Status' },
    { fieldName: 'date', displayName: 'Date' },
  ]);

  const { data, loading, error } = useQuery<
    GetAdminPanelOccurrencesQuery,
    GetAdminPanelOccurrencesQueryVariables
  >(GET_ADMIN_PANEL_OCCURRENCES, {
    variables: { date: navData?.selectedDate as string },
    skip: !navData || navData.selectedDate.length < DATE_FORMAT.length,
  });

  const [setOccurrenceStatus, { loading: mutationLoading }] = useMutation<
    SetOccurrenceStatusMutation,
    SetOccurrenceStatusMutationVariables
  >(SET_OCCURRENCE_STATUS, {
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
    if (!data || data.occurrences.length < 1) return [];

    return data.occurrences.map((occurrence) => ({
      name: occurrence.dish.nameDe,
      occurrenceStatus: {
        node: (
          <>
            <select
              disabled={mutationLoading}
              value={occurrence.status}
              onChange={(e) =>
                setOccurrenceStatus({
                  variables: {
                    id: occurrence.id,
                    status: e.target.value as OccurrenceStatus,
                  },
                })
              }
            >
              <option value={OccurrenceStatus.Approved}>
                {OccurrenceStatus.Approved}
              </option>
              <option value={OccurrenceStatus.AwaitingApproval}>
                {OccurrenceStatus.AwaitingApproval}
              </option>
              <option value={OccurrenceStatus.Confirmed}>
                {OccurrenceStatus.Confirmed}
              </option>
              <option value={OccurrenceStatus.PendingDeletion}>
                {OccurrenceStatus.PendingDeletion}{' '}
              </option>
              <option value={OccurrenceStatus.Updated}>
                {OccurrenceStatus.Updated}
              </option>
            </select>
          </>
        ),
        value: occurrence.status,
      },
      date: occurrence.date,
      ...(headerRows.find((elem) => elem.fieldName === 'id') && {
        id: occurrence.id,
      }),
    }));
  }, [data, headerRows, mutationLoading, setOccurrenceStatus]);

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
