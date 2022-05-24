import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Icon from '../../util/Icon';

import styles from './BackButton.module.scss';

const BackButton = () => {
  const { t } = useTranslation('contact');
  const { locale } = useRouter();

  return (
    <Link href={'/'} lang={locale}>
      <div className={styles.button}>
        <Icon name="arrow_left" />
        <p>{t('back')}</p>
      </div>
    </Link>
  );
};

export default BackButton;
