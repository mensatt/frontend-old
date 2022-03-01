import React from 'react';
import styles from './DishComment.module.scss';

export type Props = {
  author: string;
  text: string;
};

const DishComment = ({ author, text }: Props) => {
  return (
    <p className={styles.comment}>
      <span className={styles.author}>{author}: </span>
      {text}
    </p>
  );
};

export default DishComment;
