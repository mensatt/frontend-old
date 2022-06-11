import { useTranslation } from 'next-i18next';
import React, { ReactNode, useMemo, useState } from 'react';

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

export type ReactNodeWithValue = {
  node: ReactNode;
  value: string | number;
};

export type StrOrNumWithOptVal = {
  node: string | number;
  value?: string | number;
};

export type TableDataRow = {
  [key: string]: string | number | ReactNodeWithValue;
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

    const sortedAsc = dataCopy.sort((rowA, rowB) => {
      const cellA = rowA[sortState.sortKey];
      const cellAIsStrOrNum =
        typeof cellA === 'string' || typeof cellA === 'number';
      const cellAIsNodeWithVal =
        typeof (cellA as ReactNodeWithValue).value !== 'undefined';

      const cellB = rowB[sortState.sortKey];
      const cellBIsStrOrNum =
        typeof cellB === 'string' || typeof cellB === 'number';
      const cellBIsNodeWithVal =
        typeof (cellB as ReactNodeWithValue).value !== 'undefined';

      // If both cells have a value property use that to compare
      if (cellAIsNodeWithVal && cellBIsNodeWithVal)
        return (cellA as ReactNodeWithValue).value >
          (cellB as ReactNodeWithValue).value
          ? 1
          : -1;

      // If both cells are strings or numbers compare them "normally"
      if (cellAIsStrOrNum && cellBIsStrOrNum) return cellA > cellB ? 1 : -1;

      // If one cell has a value property and the other is a string or number compare
      // the value prop to the value of the other cell
      if (cellAIsStrOrNum && cellBIsNodeWithVal)
        return cellA > (cellB as ReactNodeWithValue).value ? 1 : -1;
      if (cellAIsNodeWithVal && cellBIsStrOrNum)
        return (cellA as ReactNodeWithValue).value > cellB ? 1 : -1;

      // If none of the cases mentioned above is true no useful comparison can be made
      // => Consider both cells equal
      return 0;
    });

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
          {headerRow.map((col) => {
            const cell = row[col.fieldName];
            const isStrOrNum =
              typeof cell === 'string' || typeof cell === 'number';

            if (isStrOrNum) return <div key={col.fieldName}>{cell}</div>;
            return <div key={col.fieldName}>{cell.node}</div>;
          })}
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
