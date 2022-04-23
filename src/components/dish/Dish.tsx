import Image from 'next/image';
import React from 'react';

import styles from './Dish.module.scss';
import DishComment from './comment';
import { Props as CommentProps } from './comment/DishComment';

type Props = {
  name: string;
};

const dummyComments: Array<CommentProps> = [
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'ipsum', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'dolor', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'sit', text: 'Lorem ipsum dolor sit amet!' },
];

const Dish = ({ name }: Props) => {
  const comments = dummyComments.map((elem) => (
    <DishComment
      key={elem.author + elem.text}
      author={elem.author}
      text={elem.text}
    />
  ));
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
      <h2>{name}</h2>
      <h3>Kommentare</h3>
      {comments}
      <button className={styles['all-comments']}>
        Alle Kommentare Anzeigen
      </button>
    </div>
  );
};

export default Dish;
