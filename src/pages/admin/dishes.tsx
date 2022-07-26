import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo, useState } from 'react';
import { GetAdminPanelDishesQuery } from 'src/graphql/graphql-types';
import { GET_ADMIN_PANEL_DISHES } from 'src/graphql/queries/';

import { useQuery } from '@apollo/client';

import Table, { TableDataRow, TableHeaderRow } from '../../components/table';

const AdminDishesPage: NextPage = () => {
  const { t } = useTranslation('common');

  const [headerRows] = useState<TableHeaderRow[]>([
    { fieldName: 'id', displayName: 'ID' },
    { fieldName: 'nameDe', displayName: 'German name' },
    { fieldName: 'nameEn', displayName: 'English name' },
    { fieldName: 'aliases', displayName: 'Aliases' },
  ]);

  const { data, loading, error } = useQuery<GetAdminPanelDishesQuery>(
    GET_ADMIN_PANEL_DISHES,
  );
  const rows: TableDataRow[] = useMemo(() => {
    if (!data || data.dishes.length === 0) return [];
    return data.dishes.map((elem) => ({
      id: elem.id,
      nameDe: elem.nameDe ?? '<NULL>',
      nameEn: elem.nameEn ?? '<NULL>',
      aliases: elem.aliases.join(','),
    }));
  }, [data]);

  return (
    <>
      {loading && t('loading')}
      {error && error.message}
      {data && <Table headerRow={headerRows} dataRows={rows} />}
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
