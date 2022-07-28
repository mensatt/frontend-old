import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import { GetAdminPanelDishesQuery } from 'src/graphql/graphql-types';
import { GET_ADMIN_PANEL_DISHES } from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

import DishInput from '../../../components/admin';
import Table, { TableDataRow, TableHeaderRow } from '../../../components/table';

import styles from './dishes.module.scss';

const AdminDishesPage: NextPage = () => {
  const { t } = useTranslation('common');

  const [headerRows] = useState<TableHeaderRow[]>([
    { fieldName: 'id', displayName: 'ID' },
    { fieldName: 'nameDe', displayName: 'German name' },
    { fieldName: 'nameEn', displayName: 'English name' },
    { fieldName: 'aliases', displayName: 'Aliases', nonSortable: true },
  ]);

  const { data, loading, error } = useQuery<GetAdminPanelDishesQuery>(
    GET_ADMIN_PANEL_DISHES,
  );

  const rows: TableDataRow[] = useMemo(() => {
    if (!data || data.dishes.length === 0) return [];

    return data.dishes.map((dish) => ({
      id: dish.id,
      nameDe: {
        node: <DishInput dish={dish} valueAttribute="nameDe" />,
        value: dish.nameDe,
      },
      nameEn: {
        node: <DishInput dish={dish} valueAttribute="nameEn" />,
        value: dish.nameEn ?? '<Null>',
      },
      aliases: {
        node:
          dish.aliases.length == 1 ? (
            <>{dish.aliases[0]}</>
          ) : (
            <Popup
              trigger={<button className="button">View all aliases</button>}
            >
              {dish.aliases.map((x) => (
                <>
                  <p className={styles.popupText} key={x}>
                    {x}
                  </p>
                  <hr className={styles.popupDivider} />
                </>
              ))}
            </Popup>
          ),
        value: dish.aliases[0] ?? '<NULL>',
      },
    }));
  }, [data]);

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
