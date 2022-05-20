import React, { useState } from 'react';

import styles from './LanguageSwitcher.module.scss';

import { useTranslation } from 'react-i18next';

const languages = [
  { id: 'de', name: 'Deutsch', flag: 'de' },
  { id: 'en', name: 'English', flag: 'us' }
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [ active, setActive ] = useState(false)
  const toggleActive = () => setActive(!active)

  const selectLanguage = (name: string) => {
    i18n.changeLanguage(name)
    setActive(false)
  }

  const lang = languages
    .find(lang => lang.id === i18n.language)
    ?? languages[0]

  const options = languages.map(lang => (
    <div
      className={styles.dropdownOption}
      key={lang.id}
      onClick={() => selectLanguage(lang.id)}
    >
      <span>{lang.name}</span>
    </div>
  ))

  return (
    <div className={styles.container}>
      {/* <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        { languages.map(l => (
          <option value={l.id} key={l.id}>
            {l.name}
          </option>
        )) }
      </select> */}
      <div className={styles.button} onClick={toggleActive}>
        { lang.name }
      </div>
      <div className={styles.dropdown + ' ' + (!active ? styles.dropdownHidden : '')}>
        { options }
      </div>
    </div>
  );
};

export default LanguageSwitcher;
