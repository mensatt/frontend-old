import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.logo} />
      <div className={styles.links}>
        <span>Copyright &copy; 2022 Mensatt.</span>
        <Link href={'/admin'}>{t('admin-link-text')}</Link>
        <Link href={'/contact'}>{t('contact-link-text')}</Link>
        <Link href={'/privacy'}>{t('privacy-link-text')}</Link>
      </div>
      <p>{t('disclaimer')}</p>
    </footer>
  );
};

export default Footer;
