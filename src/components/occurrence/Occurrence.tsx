import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { currentDate } from 'src/util';

import { useQuery } from '@apollo/client';

import styles from './Occurrence.module.scss';
import OccurrenceComment from './comment';
import OccurrencePrices from './prices';
import OccurrenceRating from './rating';
import ReviewModal from './review-modal/ReviewModal';
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

  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);

  const backendURLBase = useMemo(() => {
    const { protocol, hostname } = new URL(
      navData
        ? navData.mensas[navData.activeMensaIdx].url
        : 'https://api.mensatt.de/v1/graphql',
    );
    return `${protocol}//${hostname}`;
  }, [navData]);

  const filteredReviews = useMemo(
    () =>
      occurrence.reviews.filter((review) => review.acceptedAt && review.text),
    [occurrence.reviews],
  );

  const filteredImages = useMemo(
    () => occurrence.images.filter((image) => image.review.acceptedAt),
    [occurrence.images],
  );

  // TODO: Replace with something more advanced (carousel mby?) in the future
  const randomImage =
    filteredImages[Math.floor(Math.random() * filteredImages.length)];

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

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        {filteredImages.length > 0 ? (
          <Image
            key={randomImage.id}
            src={backendURLBase + randomImage.imageUrl}
            alt={t('imageDescription', {
              name: occurrenceName,
              author: randomImage.review.displayName || t('noAuthorName'),
            })}
            // width={100}
            // height={600}
            layout={'fill'}
          />
        ) : (
          t('noImagesMsg')
        )}
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
      <div className={styles.buttonContainer}>
        <button className={styles.occDetails}>
          {t('showOccurrenceDetails')}
        </button>
        {/* NOTE: At the time of writing reduxjs-popup did not support using `open => ReactNode` as children (even though it was documented). So I had to work around it.
            This involved:
              - not using the rate button as the `trigger` value for the Popup
              - using `useState` to manage the open state of the popup ourself
            TODO: Investigate if this is still needed in the future or perhaps
                  even replace popups with own implementation
         */}
        <button
          disabled={dayjs(occurrence.date) > currentDate}
          className={styles.rate}
          onClick={() => setPopupOpen(true)}
        >
          {t('rate')}
        </button>
        <Popup
          closeOnDocumentClick
          on="click"
          modal
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
        >
          <ReviewModal
            occurrenceName={occurrenceName}
            occurrenceId={occurrence.id}
            onSuccessfulSubmit={() => setPopupOpen(false)}
          />
        </Popup>
      </div>
    </div>
  );
};

export default Occurrence;
