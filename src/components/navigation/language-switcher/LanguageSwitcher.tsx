import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Popup from 'reactjs-popup';
import Icon from 'src/components/icon/Icon';

import styles from './LanguageSwitcher.module.scss';

const languages = [
  { id: 'de', name: 'Deutsch', icon: 'flag_de' },
  { id: 'en', name: 'English', icon: 'flag_us' },
] as const;

const LanguageSwitcher = () => {
  const { locale, asPath } = useRouter();
  const lang = languages.find((lang) => lang.id === locale) ?? languages[0];

  const setLanguage = (id: string) => {
    document.cookie = `NEXT_LOCALE=${id};max-age=${315360000};path=/;SameSite=Strict`;
  };

  const display = (
    <button className={styles.button} tabIndex={0}>
      <Icon name={lang.icon} />
    </button>
  );

  const options = languages.map((lang) => (
    <Link href={asPath} locale={lang.id} key={lang.id} tabIndex={0}>
      <button onClick={() => setLanguage(lang.id)}>
        <Icon name={lang.icon} />
        <span>{lang.name}</span>
      </button>
    </Link>
  ));

  return (
    <Popup
      trigger={display}
      position={['bottom center', 'bottom right']}
      closeOnDocumentClick
      on="click"
      arrow={false}
    >
      {options}
    </Popup>
  );
};

export default LanguageSwitcher;
