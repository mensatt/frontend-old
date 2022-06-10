import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import styles from './Table.module.scss';

export enum SortOrder {
  NONE = 'None',
  ASC = 'Asc',
  DESC = 'Desc',
}

export const determineNextSortOrder = (curr: SortOrder) => {
  switch (curr) {
    case SortOrder.NONE:
      return SortOrder.ASC;
    case SortOrder.ASC:
      return SortOrder.DESC;
    case SortOrder.DESC:
      return SortOrder.NONE;
  }
};

export type TableHeaderRow = {
  fieldName: string;
  displayName: string;
  nonSortable?: boolean;
};

export type TableDataRow = {
  [key: string]: string;
};

export type TableProps = {
  headerRow: TableHeaderRow[];
  dataRows: TableDataRow[];
};

const Table = ({ headerRow, dataRows }: TableProps) => {
  const { t } = useTranslation('common');
  const columnAmount = headerRow.length;
  const [sortState, setSortState] = useState({
    sortKey: '',
    sortOrder: SortOrder.NONE,
  });

  const sortedData = useMemo(() => {
    if (sortState.sortOrder === SortOrder.NONE || sortState.sortKey === '')
      return dataRows;

    // We have to clone the array as sort and reverse operate in place
    const dataCopy = [...dataRows];

    const sortedAsc = dataCopy.sort((rowA, rowB) =>
      rowA[sortState.sortKey] > rowB[sortState.sortKey] ? 1 : -1,
    );

    return sortState.sortOrder === SortOrder.ASC
      ? sortedAsc
      : sortedAsc.reverse();
  }, [dataRows, sortState.sortKey, sortState.sortOrder]);

  const header = useMemo(
    () => (
      <div
        className={styles.row + ' ' + styles.header}
        // Dynamically set CSS based on amount of columns
        style={{ gridTemplateColumns: `repeat(${columnAmount}, 1fr)` }}
      >
        {headerRow.map((cell, cellIdx) => {
          const nextSortOrder =
            sortState.sortKey === cell.fieldName
              ? determineNextSortOrder(sortState.sortOrder)
              : SortOrder.ASC;

          const currColSortState =
            sortState.sortKey === cell.fieldName
              ? sortState.sortOrder
              : SortOrder.NONE;

          const sortOrderLocalized =
            currColSortState !== SortOrder.NONE
              ? t('sortOrder' + sortState.sortOrder + 'Short')
              : '';

          // Text indicating sort direction that is displayed next to the column name
          const sortOrderText = sortOrderLocalized
            ? ` (${sortOrderLocalized})`
            : '';

          return (
            <div
              key={cellIdx}
              onClick={
                !cell.nonSortable
                  ? () => {
                      setSortState({
                        sortKey: cell.fieldName,
                        sortOrder: nextSortOrder,
                      });
                    }
                  : undefined
              }
            >
              {cell.displayName + sortOrderText}
            </div>
          );
        })}
      </div>
    ),
    [columnAmount, headerRow, sortState.sortKey, sortState.sortOrder, t],
  );

  const rows = useMemo(
    () =>
      sortedData.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={styles.row}
          // Dynamically set CSS based on amount of columns
          style={{ gridTemplateColumns: `repeat(${columnAmount}, 1fr)` }}
        >
          {headerRow.map((col) => (
            <div key={col.fieldName}>{row[col.fieldName]}</div>
          ))}
        </div>
      )),
    [columnAmount, headerRow, sortedData],
  );

  return (
    <div className={styles.grid}>
      {header}
      {rows}
    </div>
  );
};

export default Table;
