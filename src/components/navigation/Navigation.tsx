import React from "react";
import WeekdaySelection from "../weekday-selection/";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <WeekdaySelection className={styles.content} />
      <h1 className={styles.content}>MENSATT</h1>
      <p className={styles.content}>Südmensa</p>
    </>
  );
};
export default Navigation;
