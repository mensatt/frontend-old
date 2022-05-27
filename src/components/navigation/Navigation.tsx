import React from 'react';

import styles from './Navigation.module.scss';
import BackButton from './back-button';
import LanguageSwitcher from './language-switcher';
import MensaSelection from './mensa-selection';
import WeekdaySelection from './weekday-selection';

export type NavigationDisplayOptions = {
  action: 'weekday-selection' | 'back-button' | 'none';
  /** optional
   * if action is back-button: button url
   */
  actionData?: string;
  showBrand: boolean;
  showMensa: boolean;
  showLanguage: boolean;
};

type Props = {
  opts: NavigationDisplayOptions;
};

const Navigation = ({ opts }: Props) => {
  const settingsItems = [];
  if (opts.showMensa) settingsItems.push(<MensaSelection />);
  if (opts.showLanguage) settingsItems.push(<LanguageSwitcher />);

  // insert divider divs between each item in the list
  const settingsRendered = settingsItems
    .flatMap((item, index) => [
      item,
      <div className={styles.divider} key={index} />,
    ])
    .slice(0, -1);

  return (
    <nav className={styles.content}>
      <div className={styles.navaction}>
        {opts.action === 'weekday-selection' ? <WeekdaySelection /> : ''}
        {opts.action === 'back-button' ? (
          <BackButton url={opts.actionData} />
        ) : (
          ''
        )}
      </div>
      {opts.showBrand && <h1>Mensatt</h1>}
      <div className={styles.settings}>{settingsRendered}</div>
    </nav>
  );
};
export default Navigation;
