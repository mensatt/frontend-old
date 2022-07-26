import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

import styles from './Occurrence.module.scss';
import OccurrenceComment from './comment';
import OccurrencePrices from './prices';
import OccurrenceRating from './rating';
import OccurrenceTags from './tags';

type Occurrence = GetOccurrencesByDateQuery['occurrences'][number];
type Review = Occurrence['dish']['reviewData']['reviews'][number];

type Props = {
  occurrence: Occurrence;
};

const commentFilterFunction = (review: Review) => review.text;
const imagesFilterFunction = (review: Review) => review.images.length > 0;
const imagesMapFunction = (review: Review) =>
  review.images.map((image) => ({
    displayName: review.displayName,
    createdAt: review.createdAt,
    ...image,
  }));

const reviewSortFunction = (a: Review, b: Review) => {
  if (a.createdAt > b.createdAt) return 1;
  if (a.createdAt < b.createdAt) return -1;
  return 0;
};

const Occurrence = ({ occurrence }: Props) => {
  const { t } = useTranslation('common');
  const { locale: routerLocale } = useRouter();
  const locale = useMemo(
    () => (routerLocale ? routerLocale : 'de'),
    [routerLocale],
  );

  // Get "URL-Base" from currently active backend
  // Example: https://api.mensatt.de/v1/graphql => https://api.mensatt.de
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const backendURLBase = useMemo(() => {
    const { protocol, hostname } = new URL(
      navData
        ? navData.mensas[navData.activeMensaIdx].url
        : 'https://api.mensatt.de/v1/graphql',
    );
    return `${protocol}//${hostname}`;
  }, [navData]);

  const filteredDishReviews = useMemo(
    () =>
      occurrence.dish.reviewData.reviews
        .filter(commentFilterFunction)
        .sort(reviewSortFunction),
    [occurrence.dish.reviewData.reviews],
  );

  const filteredDishImages = useMemo(
    () =>
      occurrence.dish.reviewData.reviews
        .filter(imagesFilterFunction)
        .sort(reviewSortFunction)
        .flatMap(imagesMapFunction),
    [occurrence.dish.reviewData.reviews],
  );

  // TODO: Replace with something more advanced (carousel maybe?) in the future
  const randomImage =
    filteredDishImages[Math.floor(Math.random() * filteredDishImages.length)];

  const comments = useMemo(
    () =>
      filteredDishReviews.length > 0 ? (
        filteredDishReviews.map((review) => (
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
    [filteredDishReviews, t],
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
        {filteredDishImages.length > 0 ? (
          <Image
            key={randomImage.id}
            src={backendURLBase + randomImage.imageUrl}
            alt={t('imageDescription', {
              name: occurrenceName,
              author: randomImage.displayName || t('noAuthorName'),
            })}
            layout={'fill'}
          />
        ) : (
          <div>{t('noImagesMsg')}</div>
        )}
      </div>
      <h2>{occurrenceName}</h2>
      <div className={styles.priceAndRatingWrapper}>
        <div className={styles.pillsWrapper}>
          <OccurrenceRating metadata={occurrence.dish.reviewData.metadata} />
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
