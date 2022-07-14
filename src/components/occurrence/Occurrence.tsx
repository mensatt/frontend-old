import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './Occurrence.module.scss';
import OccurrenceComment, { OccurrenceCommentProps } from './comment';
import OccurrencePrice from './price';
import OccurrenceRating from './rating';

type Props = {
  occurrence: GetOccurrencesByDateQuery['occurrencesByDate'][number];
};

const dummyComments: Array<OccurrenceCommentProps> = [
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'ipsum', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'dolor', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'sit', text: 'Lorem ipsum dolor sit amet!' },
];

// Generate 10 random reviews
// TODO: Remove once values from backend are available
const dummyReviews = Array.from(Array(10).keys()).map((elem) => ({
  id: elem.toString(),
  stars: Math.floor(Math.random() * 6),
}));

const Occurrence = ({ occurrence }: Props) => {
  const { t } = useTranslation('common');
  const { locale: routerLocale } = useRouter();
  const locale = useMemo(
    () => (routerLocale ? routerLocale : 'de'),
    [routerLocale],
  );

  const comments = dummyComments.map((elem) => (
    <OccurrenceComment
      key={elem.author + elem.text}
      author={elem.author}
      text={elem.text}
    />
  ));

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
        <OccurrencePrice
          priceCents={occurrence.priceStudent}
          size="md"
          label={t('priceLabelStudent')}
          key="priceStud"
        />
        <OccurrencePrice
          priceCents={occurrence.priceStaff}
          key="priceStaff"
          label={t('priceLabelStaff')}
        />
        <OccurrencePrice
          priceCents={occurrence.priceGuest}
          key="priceGuest"
          label={t('priceLabelGuest')}
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
        {/* TODO: Replace with values from api once available */}
        <OccurrenceRating
          average={
            dummyReviews
              .map((review) => review.stars)
              .reduce((a, b) => a + b, 0) / dummyReviews.length
          }
          amount={dummyReviews.length}
        />
        {prices}
      </div>
      <h3>{t('commentHeading')}</h3>
      {comments}
      <button className={styles.allComments}>{t('showAllComments')}</button>
    </div>
  );
};

export default Occurrence;
