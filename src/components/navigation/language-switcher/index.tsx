import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Icon from '../../util/Icon';

import styles from './LanguageSwitcher.module.scss';

const languages = [
  { id: 'de', name: 'Deutsch', icon: 'flag_de' },
  { id: 'en', name: 'English', icon: 'flag_us' },
] as const;

const LanguageSwitcher = () => {
  const { locale, pathname } = useRouter();
  const lang = languages.find((lang) => lang.id === locale) ?? languages[0];

  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const setLanguage = (id: string) => {
    document.cookie = `NEXT_LOCALE=${id};max-age=${315360000};path=/;SameSite=Strict`;
    setActive(false);
  };

  const options = languages.map((lang) => (
    <Link href={pathname} locale={lang.id} key={lang.id}>
      <div
        className={styles.dropdownOption}
        onClick={() => setLanguage(lang.id)}
      >
        <Icon name={lang.icon} />
        <span>{lang.name}</span>
      </div>
    </Link>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={toggleActive}>
        <Icon name={lang.icon} />
      </div>
      <div
        className={[styles.dropdown, active ? '' : styles.dropdownHidden].join(
          ' ',
        )}
      >
        {options}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
