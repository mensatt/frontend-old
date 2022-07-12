import React, { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

type Props = {
  // Note: Assuming all prices have the same type
  priceCents: GetOccurrencesByDateQuery['occurrencesByDate'][number]['priceStudent'];
  size?: 'sm' | 'md';
  label: string;
};

const OccurrencePrice = ({ priceCents, size = 'sm', label }: Props) => {
  const price = useMemo(
    () => (priceCents ? priceCents / 100 : '-,--'),
    [priceCents],
  );
  return (
    <div style={{ marginRight: '2%' }}>
      <h3
        style={{
          marginBottom: 0,
          fontSize: size === 'md' ? 25 : 15,
          fontWeight: 'normal',
        }}
      >
        {/* TODO: Add padding (with css) before unit */}
        {price}€
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: size === 'md' ? 15 : 12,
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default OccurrencePrice;
