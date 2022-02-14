import React from "react";
import dayjs from "dayjs";
import styles from "./WeekdaySelection.module.scss";

type Props = {
  date: dayjs.Dayjs;
  selected?: boolean;
  onClick: () => void;
};

const getDisplayText = (date: dayjs.Dayjs) => {
  // TODO: Check if this is sth that dayjs can do
  switch (date.weekday()) {
    case 0:
      return "Mo";
    case 1:
      return "Di";
    case 2:
      return "Mi";
    case 3:
      return "Do";
    case 4:
      return "Fr";
  }
};

const getDisplayDate = (date: dayjs.Dayjs) => {
  return date.date() < 10 ? "0" + date.date() : date.date();
};

const Weekday = ({ date, selected, onClick }: Props) => {
  return (
    <button
      className={selected ? styles.selected : undefined}
      onClick={onClick}
    >
      <span className={styles.dow}> {getDisplayText(date)} </span>
      <span className={styles.date}> {getDisplayDate(date)} </span>
    </button>
  );
};

export default Weekday;
