import React from 'react';
import MensaSelection from '../mensa-selection';
import WeekdaySelection from '../weekday-selection/';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.content}>
      <div className={styles.FlexForCentering}>
        <WeekdaySelection />
      </div>
      <h1>Mensatt</h1>
      <div className={styles.FlexForCentering}>
        <MensaSelection />
      </div>
    </nav>
  );
};
export default Navigation;
