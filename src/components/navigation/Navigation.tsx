import React from 'react';

import styles from './Navigation.module.scss';
import MensaSelection from './mensa-selection';
import WeekdaySelection from './weekday-selection';

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
