import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Contact: NextPage = () => {
  const { t } = useTranslation('contact');
  return (
    <>
      <h2>{t('heading')}</h2>
      <p>{t('contact-text')}</p>
    </>
  );
};

export default Contact;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'contact',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  };
}
