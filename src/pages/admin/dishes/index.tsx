import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useCallback, useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import {
  GetAdminPanelDishesQuery,
  MergeDishesMutation,
  MergeDishesMutationVariables,
} from 'src/graphql/graphql-types';
import { GET_ADMIN_PANEL_DISHES } from 'src/graphql/queries';

import { useMutation, useQuery } from '@apollo/client';

import DishNameInput from '../../../components/admin';
import Table, { TableDataRow, TableHeaderRow } from '../../../components/table';

import styles from './dishes.module.scss';
import { MERGE_DISHES } from 'src/graphql/mutations/mergeDishes.gql';

const MERGE_OPTIONS = ['Select', 'Keep', 'Merge'] as const;
type MergeOptions = (typeof MERGE_OPTIONS)[number];

const AdminDishesPage: NextPage = () => {
  const { t } = useTranslation('common');

  const [headerRows] = useState<TableHeaderRow[]>([
    { fieldName: 'id', displayName: 'ID' },
    { fieldName: 'nameDe', displayName: 'German name' },
    { fieldName: 'nameEn', displayName: 'English name' },
    { fieldName: 'aliases', displayName: 'Aliases', nonSortable: true },
    { fieldName: 'merging', displayName: 'Merge', nonSortable: true },
  ]);

  const { data, loading, error } = useQuery<GetAdminPanelDishesQuery>(
    GET_ADMIN_PANEL_DISHES,
  );

  const [mergeDishes, { loading: mutationLoading }] = useMutation<
    MergeDishesMutation,
    MergeDishesMutationVariables
  >(MERGE_DISHES, {
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_DISHES,
      },
    ],
  });

  const [mergeStatus, setMergeStatus] = useState<{
    keepId: string | undefined;
    mergeIds: Array<string>;
  }>({ keepId: undefined, mergeIds: [] });

  const getMergeStatusText = useCallback<(id: string) => MergeOptions>(
    (id) => {
      return mergeStatus.keepId === id
        ? 'Keep'
        : mergeStatus.mergeIds?.includes(id)
        ? 'Merge'
        : 'Select';
    },
    [mergeStatus.keepId, mergeStatus.mergeIds],
  );

  const mergeDishesCallback = useCallback(() => {
    // Extracting to const for type-safety
    const keepId = mergeStatus.keepId;

    if (keepId === undefined || mergeStatus.mergeIds.length === 0) {
      return;
    }

    // Since the mergeDishes query only accepts a pair of ids
    // we have to loop over all ids that need to be merged
    mergeStatus.mergeIds.forEach((mergeId) =>
      mergeDishes({
        variables: { keep: keepId, merge: mergeId },
      }),
    );

    // Reset merge status
    setMergeStatus({ keepId: undefined, mergeIds: [] });
  }, [mergeDishes, mergeStatus.keepId, mergeStatus.mergeIds]);

  const rows: TableDataRow[] = useMemo(() => {
    if (!data || data.dishes.length === 0) return [];

    return data.dishes.map((dish) => ({
      id: dish.id,
      nameDe: {
        node: <DishNameInput dish={dish} valueAttribute="nameDe" />,
        value: dish.nameDe,
      },
      nameEn: {
        node: <DishNameInput dish={dish} valueAttribute="nameEn" />,
        value: dish.nameEn ?? '<Null>',
      },
      merging: {
        node: (
          <>
            <select
              value={getMergeStatusText(dish.id)}
              onChange={(event) => {
                switch (event.target.value as MergeOptions) {
                  case 'Keep':
                    setMergeStatus({ ...mergeStatus, keepId: dish.id });
                    break;
                  case 'Merge':
                    setMergeStatus({
                      ...mergeStatus,
                      mergeIds: [dish.id, ...mergeStatus.mergeIds],
                    });
                    break;
                  default:
                    if (mergeStatus.keepId == dish.id) {
                      setMergeStatus({ ...mergeStatus, keepId: undefined });
                    }
                    if (mergeStatus.mergeIds.includes(dish.id)) {
                      setMergeStatus({
                        ...mergeStatus,
                        mergeIds: mergeStatus.mergeIds.filter(
                          (merge) => merge != dish.id,
                        ),
                      });
                    }
                    break;
                }
              }}
            >
              {MERGE_OPTIONS.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            {mergeStatus.keepId === dish.id && (
              <button
                className={styles.mergeButton}
                disabled={mutationLoading}
                onClick={() => mergeDishesCallback()}
              >
                Merge
              </button>
            )}
          </>
        ),
        value: '<Null>',
      },
      aliases:
        dish.aliases.length === 1
          ? dish.aliases[0]
          : {
              node: (
                <Popup
                  trigger={<button className="button">View all aliases</button>}
                >
                  {dish.aliases.map((alias) => (
                    <div key={alias}>
                      <p className={styles.popupText}>{alias}</p>
                      <hr className={styles.popupDivider} />
                    </div>
                  ))}
                </Popup>
              ),
              value: dish.aliases[0] ?? '<NULL>',
            },
    }));
  }, [
    data,
    getMergeStatusText,
    mergeDishesCallback,
    mergeStatus,
    mutationLoading,
  ]);

  return (
    <>
      {loading && t('loading')}
      {error && error.message}
      {data && (
        <div className={styles.main}>
          <Table headerRow={headerRows} dataRows={rows} />
        </div>
      )}
    </>
  );
};

export default AdminDishesPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
