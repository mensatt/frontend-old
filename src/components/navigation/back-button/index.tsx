import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Icon from '../../util/Icon';

import styles from './BackButton.module.scss';

type Props = {
  url?: string;
};

const BackButton = ({ url }: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return (
    <Link href={url ?? '/'} lang={locale}>
      <div className={styles.button}>
        <Icon name="arrow_left" />
        <p>{t('back')}</p>
      </div>
    </Link>
  );
};

export default BackButton;
