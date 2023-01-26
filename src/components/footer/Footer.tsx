import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

import Icon from '../icon';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className={styles.footer}>
      <Link href="/">
        <div className={styles.logo} />
      </Link>
      <span className={styles.copyright}>Copyright &copy; 2022 Mensatt.</span>
      <div className={styles.links}>
        <Link href={'/admin'}>{t('admin-link-text')}</Link>
        <Link href={'/contact'}>{t('contact-link-text')}</Link>
        <Link href={'/privacy'}>{t('privacy-link-text')}</Link>
      </div>
      <p>{t('disclaimer')}</p>
      <div className={styles.social}>
        <a href="https://github.com/mensatt">
          <Icon name="github" />
        </a>
        <a href="https://discord.gg/wjeYsQQQ3R">
          <Icon name="discord" />
        </a>
        <a href="mailto:hello@mensatt.de">
          <Icon name="mail" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
