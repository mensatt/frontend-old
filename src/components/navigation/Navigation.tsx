import React from 'react';

import styles from './Navigation.module.scss';
import BackButton from './back-button';
import LanguageSwitcher from './language-switcher';
import MensaSelection from './mensa-selection';
import WeekdaySelection from './weekday-selection';

export type NavigaitonDisplayOptions = {
  action: 'weekday-selection' | 'back-button';
  brand: boolean;
  mensa: boolean;
  language: boolean;
};

type Props = {
  opts: NavigaitonDisplayOptions;
};

const Navigation = ({ opts }: Props) => {
  const settingsItems = [
    opts.mensa ? <MensaSelection /> : null,
    opts.language ? <LanguageSwitcher /> : null,
  ].filter((i) => !!i) as JSX.Element[];

  // insert divider divs between each item in the list
  const settingsRendered = settingsItems
    .flatMap((item, index) => [
      item,
      <div className={styles.divider} key={index} />,
    ])
    .flat()
    .slice(0, -1);

  return (
    <nav className={styles.content}>
      <div className={styles.navaction}>
        {opts.action === 'weekday-selection' ? <WeekdaySelection /> : ''}
        {opts.action === 'back-button' ? <BackButton /> : ''}
      </div>
      {opts.brand ? <h1>Mensatt</h1> : ''}
      <div className={styles.settings}>{settingsRendered}</div>
    </nav>
  );
};
export default Navigation;
