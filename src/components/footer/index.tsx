import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className={styles.footer}>
      <p>{t('disclaimer')}</p>
      <div className={styles.links}>
        <Link href={'/contact'}>{t('contact-link-text')}</Link>
        <Link href={'/privacy'}>{t('privacy-link-text')}</Link>
      </div>
    </footer>
  );
};

export default Footer;
