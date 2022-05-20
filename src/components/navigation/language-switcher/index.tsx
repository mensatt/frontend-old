import React, { useState } from 'react';

import Icon from '../../util/Icon';

import styles from './LanguageSwitcher.module.scss';
import { useTranslation } from 'react-i18next';

const languages = [
  { id: 'de', name: 'Deutsch', icon: 'flag_de' },
  { id: 'en', name: 'English', icon: 'flag_us' },
] as const;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const selectLanguage = (name: string) => {
    i18n.changeLanguage(name);
    setActive(false);
  };

  const lang =
    languages.find((lang) => lang.id === i18n.language) ?? languages[0];

  const options = languages.map((lang) => (
    <div
      className={styles.dropdownOption}
      key={lang.id}
      onClick={() => selectLanguage(lang.id)}
    >
      <Icon name={lang.icon} />
      <span>{lang.name}</span>
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={toggleActive}>
        <Icon name={lang.icon} />
      </div>
      <div
        className={
          styles.dropdown + ' ' + (!active ? styles.dropdownHidden : '')
        }
      >
        {options}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
