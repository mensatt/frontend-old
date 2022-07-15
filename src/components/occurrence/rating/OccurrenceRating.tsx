import React, { useMemo } from 'react';
import Icon from 'src/components/icon';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './OccurrenceRating.module.scss';

type Props = {
  reviewMetadata: GetOccurrencesByDateQuery['occurrencesByDate'][number]['dish']['reviewMetadata'];
};

const OccurrenceRating = ({ reviewMetadata }: Props) => {
  const stars = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((_, idx) => {
        const average = reviewMetadata.averageStars
          ? reviewMetadata.averageStars
          : 0;
        const currStarVal = average - idx;
        const percentage =
          currStarVal <= 0
            ? 0
            : currStarVal >= 1
            ? 100
            : Math.round(currStarVal * 100);

        return (
          <div className={styles.iconWrapper} key={idx}>
            <Icon name="star" percentage={percentage} />
          </div>
        );
      }),
    [reviewMetadata.averageStars],
  );

  return (
    <div>
      {stars}
      {`${reviewMetadata.reviewCount > 0 ? reviewMetadata.averageStars : ''} (${
        reviewMetadata.reviewCount
      })`}
    </div>
  );
};

export default OccurrenceRating;
