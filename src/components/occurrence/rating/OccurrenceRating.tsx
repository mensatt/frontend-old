import React, { useMemo } from 'react';
import Icon from 'src/components/icon';

import styles from './OccurrenceRating.module.scss';

type Props = {
  average: number;
  amount: number;
};

const OccurrenceRating = ({ average, amount }: Props) => {
  const stars = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((_, idx) => {
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
    [average],
  );

  return (
    <div>
      {stars}
      {`${amount > 0 ? average : ''} (${amount})`}
    </div>
  );
};

export default OccurrenceRating;
