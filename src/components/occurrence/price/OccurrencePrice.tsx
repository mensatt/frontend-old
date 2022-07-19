import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './OccurrencePrice.module.scss';

type Props = {
  // Note: Assuming all prices have the same type
  priceCents: GetOccurrencesByDateQuery['occurrencesByDate'][number]['priceStudent'];
  size?: 'sm' | 'md';
  label: string;
};

const OccurrencePrice = ({ priceCents, size = 'sm', label }: Props) => {
  const { locale } = useRouter();

  const decimalSeparator = (1.1).toLocaleString(locale).substring(1, 2);

  const price = useMemo(
    () => (priceCents ? priceCents / 100 : `-${decimalSeparator}--`),
    [decimalSeparator, priceCents],
  );
  return (
    <div>
      <h3
        className={
          styles.price +
          ' ' +
          (size === 'md' ? styles.priceMediumFont : styles.priceSmallFont)
        }
      >
        {/* TODO: Add padding (with css) before unit */}
        {price.toLocaleString(locale, { minimumFractionDigits: 2 })}€
      </h3>
      <p
        className={
          styles.label +
          ' ' +
          (size === 'md' ? styles.labelMediumFont : styles.labelSmallFont)
        }
      >
        {label}
      </p>
    </div>
  );
};

export default OccurrencePrice;
