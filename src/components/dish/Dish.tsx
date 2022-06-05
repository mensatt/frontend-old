import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';

import styles from './Dish.module.scss';
import DishComment from './comment';

type Props = {
  dish: {
    name: string;
    id: string;
    reviews: Array<{
      id: string;
      displayName: string;
      text: string;
      date: string;
    }>;
  };
};

const Dish = ({ dish }: Props) => {
  const { t } = useTranslation('common');

  let comments = dish.reviews.map((elem) => (
    <DishComment key={elem.id} author={elem.displayName} text={elem.text} />
  ));
  if (comments.length < 1) {
    comments = t('noCommentMsg');
  }
  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Image
          src={'https://picsum.photos/1400/600'}
          alt={'placeholder'}
          // width={100}
          // height={600}
          layout={'fill'}
        />
      </div>
      <h2>{dish.name}</h2>
      <h3>{t('commentTitle')}</h3>
      <div>{comments}</div>
      <button className={styles['all-comments']}>
        {t('allCommentsButton')}
      </button>
    </div>
  );
};

export default Dish;
