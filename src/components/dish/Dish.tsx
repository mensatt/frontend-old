import React from 'react';
import Image from 'next/image';
import styles from './Dish.module.scss';
import { Props as CommentProps } from './comment/DishComment';
import DishComment from './comment';

type Props = {
  name: string;
};

const dummyComments: Array<CommentProps> = [
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src={'https://picsum.photos/1400/600'}
          alt={'placeholder'}
          width={1400}
          height={600}
        />
      </div>
      <h2>{name}</h2>
      <h2>Kommentare:</h2>
      {comments}
    </div>
  );
};

export default Dish;
