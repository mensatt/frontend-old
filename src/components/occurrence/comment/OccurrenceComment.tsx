import React from 'react';

import styles from './OccurrenceComment.module.scss';

export type Props = {
  author: string;
  text: string;
};

const OccurrenceComment = ({ author, text }: Props) => {
  return (
    <p className={styles.comment}>
      <span className={styles.author}>{author}: </span>
      <span className={styles.text}>{text}</span>
    </p>
  );
};

export default OccurrenceComment;
