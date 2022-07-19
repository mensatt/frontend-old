import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import styles from './OccurrencePrices.module.scss';

type Cents =
  GetOccurrencesByDateQuery['occurrencesByDate'][number]['priceStudent'];

type Props = {
  // Note: Assuming all prices have the same type
  pricePrimary: Cents;
  labelPrimary: string;
  priceSecondary: Cents;
  labelSecondary: string;
  priceTertiary: Cents;
  labelTertiary: string;
};

const OccurrencePrices = (prices: Props) => {
  const { locale } = useRouter();

  const decimalSeparator = (1.1).toLocaleString(locale).substring(1, 2);

  const out = useMemo(() => {
    const renderPrice = (cents: Cents) =>
      (cents ? cents / 100 : `-${decimalSeparator}--`).toLocaleString(locale, {
        minimumFractionDigits: 2,
      });

    //   return (
    //     <div className={styles.wrapper}>
    //       <div className={styles.price + ' ' + styles.pricePrimary}>
    //         <span className={styles.value}>
    //           {renderPrice(prices.pricePrimary)}€
    //         </span>
    //         <span className={styles.label}>{prices.labelPrimary}</span>
    //       </div>
    //       <div className={styles.price + ' ' + styles.priceSecondary}>
    //         <span className={styles.value}>
    //           {renderPrice(prices.priceSecondary)}€
    //         </span>
    //         <span className={styles.label}>{prices.labelSecondary}</span>
    //       </div>
    //       <div className={styles.price + ' ' + styles.priceTertiary}>
    //         <span className={styles.value}>
    //           {renderPrice(prices.priceTertiary)}€
    //         </span>
    //         <span className={styles.label}>{prices.labelTertiary}</span>
    //       </div>
    //     </div>
    //   );
    // }, [prices, locale, decimalSeparator]);

    return (
      <div className={styles.wrapper}>
        <div className={styles.price + ' ' + styles.pricePrimary}>
          <span className={styles.value}>
            {renderPrice(prices.pricePrimary)}
          </span>
        </div>
        <div className={styles.price + ' ' + styles.priceSecondary}>
          <span className={styles.value}>
            {renderPrice(prices.priceSecondary)}€&nbsp;/&nbsp;
            {renderPrice(prices.priceTertiary)}€
          </span>
        </div>
      </div>
    );
  }, [prices, locale, decimalSeparator]);

  return out;
};

export default OccurrencePrices;
