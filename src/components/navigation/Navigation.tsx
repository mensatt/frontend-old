import React from 'react';

import styles from './Navigation.module.scss';
import LanguageSwitcher from './language-switcher';
import MensaSelection from './mensa-selection';
import WeekdaySelection from './weekday-selection';

const Navigation = () => {
  return (
    <nav className={styles.content}>
      <WeekdaySelection />
      <h1>Mensatt</h1>
      <div className={styles.settings}>
        <MensaSelection />
        <div className={styles.divider} />
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
export default Navigation;
