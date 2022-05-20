import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import styles from './WeekdaySelection.module.scss';

type Props = {
  date: dayjs.Dayjs;
  selected?: boolean;
  onClick: () => void;
};

const Weekday = ({ date, selected, onClick }: Props) => {
  const { locale: routerLocale } = useRouter();

  // Use `de` if no language is set by router
  const locale = useMemo(
    () => (routerLocale ? routerLocale : 'de'),
    [routerLocale],
  );

  const dayOfWeek = useMemo(
    () => date.locale(locale).format('dd'),
    [date, locale],
  );

  const twoCharDate = useMemo(
    () => date.locale(locale).format('DD'),
    [date, locale],
  );

  return (
    <button
      className={selected ? styles.selected : undefined}
      onClick={onClick}
    >
      <span className={styles.dow}> {dayOfWeek} </span>
      <span className={styles.date}> {twoCharDate} </span>
    </button>
  );
};

export default Weekday;
