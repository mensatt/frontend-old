import Link from 'next/link';
import React, { ReactNode, useMemo } from 'react';

import Icon from '../icon';

import styles from './Navigation.module.scss';
import LanguageSwitcher from './language-switcher';
import MensaSelection from './mensa-selection';
import ProfileButton from './profile-button';

export type NavigationDisplayOptions = {
  topLeftComp: ReactNode;
  showBrand: boolean;
  showMensa: boolean;
  showLanguage: boolean;
  showProfile: boolean;
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
    if (opts.showProfile) array.push(<ProfileButton key={'logout'} />);

    // insert divider divs between each item in the list
    const out = array
      .flatMap((item, index) => [
        item,
        <div className={styles.divider} key={index} />,
      ])
      .slice(0, -1);

    if (out.length) {
      out.push(
        <div className={styles.mobileMenu}>
          <Icon name="menu" />
        </div>,
      );
    }

    return out;
  }, [opts.showLanguage, opts.showMensa, opts.showProfile]);

  return (
    <nav className={styles.content}>
      <div className={styles.navaction}>{opts.topLeftComp}</div>
      {opts.showBrand && (
        <Link href="/">
          <h1>Mensatt</h1>
        </Link>
      )}
      <div className={styles.settings}>{settingsRendered}</div>
    </nav>
  );
};
export default Navigation;
