import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

const AdminNavigation = () => {
  const { t } = useTranslation('admin');
  return (
    <div>
      <Link href={'/admin/'}>{t('indexLink')}</Link>
      <Link href={'/admin/occurrences'}>{t('occurrencesLink')}</Link>
      <Link href={'/admin/dishes'}>{t('dishesLink')}</Link>
      <Link href={'/admin/reviews'}>{t('reviewsLink')}</Link>
    </div>
  );
};

export default AdminNavigation;
