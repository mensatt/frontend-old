import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import styles from './WeekdaySelection.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  date: dayjs.Dayjs;
  selected?: boolean;
  onClick: () => void;
};

const Weekday = ({ date, selected, onClick }: Props) => {
  const { i18n } = useTranslation();

  const dayOfWeek = useMemo(
    () => date.locale(i18n.language).format('dd'),
    [date, i18n.language],
  );

  const twoCharDate = useMemo(
    () => date.locale(i18n.language).format('DD'),
    [date, i18n.language],
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
