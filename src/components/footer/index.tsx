import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer>
      <Link href={'/contact'}>{t('contact-link-text')}</Link>
      <Link href={'/privacy'}>{t('privacy-link-text')}</Link>
      <p>{t('disclaimer')}</p>
    </footer>
  );
};

export default Footer;
