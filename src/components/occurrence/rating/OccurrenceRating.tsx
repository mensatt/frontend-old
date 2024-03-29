import React, { useCallback, useMemo, useState } from 'react';
import Icon from 'src/components/icon';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './OccurrenceRating.module.scss';

type Props = {
  hideAmount?: boolean;
  metadata?: GetOccurrencesByDateQuery['occurrences'][number]['dish']['reviewData']['metadata'];
  onSetSelectedStars?: (stars: number) => void;
  className?: string;
  onClick?: () => void;
};

const OccurrenceRating = ({
  metadata,
  onSetSelectedStars,
  className,
  hideAmount = false,
  onClick,
}: Props) => {
  const [hoverStarAmount, setHoverStarAmount] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);

  // This component is interactive if reviewMetadata is NOT passed
  const isInteractive = !metadata;

  const determineStarPercentage = useCallback(
    (idx: number) => {
      const baseValue = metadata ? metadata.averageStars || 0 : selectedStars;
      const currStarVal = baseValue - idx;
      const normalizedStarVal =
        currStarVal <= 0
          ? 0
          : currStarVal >= 1
          ? 100
          : Math.round(currStarVal * 100);

      if (!isInteractive) {
        return normalizedStarVal;
      } else {
        const isHoveredOn = hoverStarAmount > 0;
        const hoverPercentage = idx < hoverStarAmount ? 100 : 0;
        return isHoveredOn ? hoverPercentage : normalizedStarVal;
      }
    },
    [hoverStarAmount, isInteractive, metadata, selectedStars],
  );

  const stars = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((_, idx) => (
        <div
          className={styles.iconWrapper}
          key={idx}
          onMouseEnter={() => isInteractive && setHoverStarAmount(idx + 1)}
          onMouseLeave={() => isInteractive && setHoverStarAmount(0)}
          onClick={() => {
            if (!isInteractive) {
              onClick?.();
              return;
            }
            setSelectedStars(idx + 1);
            if (onSetSelectedStars) {
              onSetSelectedStars(idx + 1);
            }
          }}
        >
          <Icon name="star" percentage={determineStarPercentage(idx)} />
        </div>
      )),
    [determineStarPercentage, isInteractive, onClick, onSetSelectedStars],
  );

  return (
    <div className={styles.ratingWrapper + ' ' + className}>
      {stars}
      {metadata && !hideAmount && <span>({metadata.reviewCount})</span>}
    </div>
  );
};

export default OccurrenceRating;
