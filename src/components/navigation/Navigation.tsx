import Link from 'next/link';
import React, { ReactNode, useMemo } from 'react';
import Popup from 'reactjs-popup';

import Icon from '../icon';
import Modal from '../modal';

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
    const settingElements = [];
    // Add "normal" menu options
    if (opts.showMensa)
      settingElements.push(<MensaSelection key={'showMensa'} />);
    if (opts.showLanguage)
      settingElements.push(<LanguageSwitcher key={'showLanguage'} />);
    if (opts.showProfile)
      settingElements.push(<ProfileButton key={'logout'} />);

    // insert divider div between each item in the list
    const settingElementsWithDiv = settingElements
      .flatMap((item, index) => [
        item,
        <div className={styles.divider} key={index} />,
      ])
      .slice(0, -1);

    // Insert mobile menu
    if (settingElementsWithDiv.length) {
      settingElementsWithDiv.push(
        <div className={styles.mobileMenu}>
          {
            <Popup
              trigger={
                <button>
                  <Icon name="menu" />
                </button>
              }
              closeOnDocumentClick
              nested
              modal
              on="click"
            >
              <Modal>
                <MensaSelection key={'showMensa'} />
                <LanguageSwitcher key={'showLanguage'} />
                <ProfileButton key={'logout'} />
              </Modal>
            </Popup>
          }
        </div>,
      );
    }

    return settingElementsWithDiv;
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
