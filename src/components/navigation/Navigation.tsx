import React, { ReactNode, useMemo } from 'react';

import styles from './Navigation.module.scss';
import LanguageSwitcher from './language-switcher';
import MensaSelection from './mensa-selection';

export type NavigationDisplayOptions = {
  topLeftComp: ReactNode;
  showBrand: boolean;
  showMensa: boolean;
  showLanguage: boolean;
};

type Props = {
  opts: NavigationDisplayOptions;
};

const Navigation = ({ opts }: Props) => {
  const settingsRendered = useMemo(() => {
    const array = [];
    if (opts.showMensa) array.push(<MensaSelection key={'showMensa'} />);
    if (opts.showLanguage)
      array.push(<LanguageSwitcher key={'showLanguage'} />);
    // insert divider divs between each item in the list
    array
      .flatMap((item, index) => [
        item,
        <div className={styles.divider} key={index} />,
      ])
      .slice(0, -1);
    return array;
  }, [opts.showLanguage, opts.showMensa]);

  return (
    <nav className={styles.content}>
      <div className={styles.navaction}>{opts.topLeftComp}</div>
      {opts.showBrand && <h1>Mensatt</h1>}
      <div className={styles.settings}>{settingsRendered}</div>
    </nav>
  );
};
export default Navigation;
