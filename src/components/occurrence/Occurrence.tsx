import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './Occurrence.module.scss';
import OccurrenceComment from './comment';
import OccurrencePrices from './prices';
import OccurrenceRating from './rating';
import OccurrenceTags from './tags';

type Props = {
  occurrence: GetOccurrencesByDateQuery['occurrencesByDate'][number];
};

const Occurrence = ({ occurrence }: Props) => {
  const { t } = useTranslation('common');
  const { locale: routerLocale } = useRouter();
  const locale = useMemo(
    () => (routerLocale ? routerLocale : 'de'),
    [routerLocale],
  );

  const filteredReviews = useMemo(
    () =>
      occurrence.reviews.filter((review) => review.acceptedAt && review.text),
    [occurrence.reviews],
  );

  const comments = useMemo(
    () =>
      filteredReviews.length > 0 ? (
        filteredReviews
          .filter((review) => review.text)
          .map((review) => (
            <OccurrenceComment
              key={review.id}
              author={review.displayName || t('noAuthorName')}
              // NOTE: We can safely cast to string here as
              // undefined or null are filtered out above
              text={review.text as string}
            />
          ))
      ) : (
        <div>{t('noCommentMsg')}</div>
      ),
    [filteredReviews, t],
  );

  const occurrenceName = useMemo(
    () =>
      // Fallback to german value if no english value is present
      locale === 'en'
        ? occurrence.dish.nameEn ?? occurrence.dish.nameDe
        : occurrence.dish.nameDe,
    [locale, occurrence.dish.nameDe, occurrence.dish.nameEn],
  );

  const prices = useMemo(
    () => (
      <div className={styles.priceWrapper}>
        <OccurrencePrices
          labelPrimary={t('priceLabelStudent')}
          pricePrimary={occurrence.priceStudent}
          labelSecondary={t('priceLabelStaff')}
          priceSecondary={occurrence.priceStaff}
          labelTertiary={t('priceLabelGuest')}
          priceTertiary={occurrence.priceGuest}
        />
      </div>
    ),
    [occurrence.priceGuest, occurrence.priceStaff, occurrence.priceStudent, t],
  );

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Image
          src={'https://picsum.photos/1400/600'}
          alt={t('imageDescription', {
            name: occurrenceName,
            author: 'John Doe',
          })}
          // width={100}
          // height={600}
          layout={'fill'}
        />
      </div>
      <h2>{occurrenceName}</h2>
      <div className={styles.priceAndRatingWrapper}>
        <div className={styles.pillsWrapper}>
          <OccurrenceRating reviewMetadata={occurrence.dish.reviewMetadata} />
          <OccurrenceTags tags={occurrence.tags} />
        </div>
        {prices}
      </div>
      <h3>{t('commentHeading')}</h3>
      {comments}
      <button className={styles.allComments}>{t('showAllComments')}</button>
    </div>
  );
};

export default Occurrence;
