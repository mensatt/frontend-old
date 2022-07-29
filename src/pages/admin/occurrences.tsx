import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useMemo, useState } from 'react';
import Table, { TableDataRow, TableHeaderRow } from 'src/components/table';
import {
  GetAdminPanelOccurrencesQuery,
  GetAdminPanelOccurrencesQueryVariables,
  OccurrenceStatus,
  SetOccurrenceStatusMutation,
  SetOccurrenceStatusMutationVariables,
} from 'src/graphql/graphql-types';
import { SET_OCCURRENCE_STATUS } from 'src/graphql/mutations/';
import { GET_ADMIN_PANEL_OCCURRENCES } from 'src/graphql/queries/';

import { useLazyQuery, useMutation } from '@apollo/client';

const approvalStatuses = Object.values(OccurrenceStatus);

const AdminOccurrencesPage: NextPage = () => {
  const { t } = useTranslation('common');

  const [selectedReviewStatusFilter, setSelectedReviewStatusFilter] = useState(
    OccurrenceStatus.AwaitingApproval,
  );

  const [fetchOccurrences, { data, loading, error }] = useLazyQuery<
    GetAdminPanelOccurrencesQuery,
    GetAdminPanelOccurrencesQueryVariables
  >(GET_ADMIN_PANEL_OCCURRENCES, {
    variables: { status: selectedReviewStatusFilter },
  });

  useEffect(() => {
    fetchOccurrences({
      // Avoiding the cache here because it could be possible that an occurrenceStatus
      // was updated by the mutation below in the meantime which would not be reflected in the cache
      // TODO: Should be able to remove this if not using refetching anymore
      fetchPolicy: 'no-cache',
    });
  }, [fetchOccurrences]);

  const [setOccurrenceStatus, { loading: mutationLoading }] = useMutation<
    SetOccurrenceStatusMutation,
    SetOccurrenceStatusMutationVariables
  >(SET_OCCURRENCE_STATUS, {
    // TODO: In the future it might be better to just update the apollo cache
    // if the mutation was successful instead of refetching the data.
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_OCCURRENCES,
        variables: { status: selectedReviewStatusFilter },
      },
    ],
  });

  // TODO: In the future this can/should be updated to display/hide columns dynamically
  const headerRows = useMemo<TableHeaderRow[]>(
    () => [
      { fieldName: 'name', displayName: 'Name' },
      {
        fieldName: 'occurrenceStatus',
        displayName: 'Review Status',
        filterComp: (
          <select
            value={selectedReviewStatusFilter}
            onChange={(e) =>
              setSelectedReviewStatusFilter(e.target.value as OccurrenceStatus)
            }
          >
            {approvalStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        ),
      },
      { fieldName: 'date', displayName: 'Date' },
    ],
    [selectedReviewStatusFilter],
  );

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
              {approvalStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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
