import React from 'react';
import MensaSelection from '../mensa-selection';
import WeekdaySelection from '../weekday-selection/';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.content}>
      <WeekdaySelection />
      <h1>Mensatt</h1>
      <MensaSelection />
    </nav>
  );
};
export default Navigation;
