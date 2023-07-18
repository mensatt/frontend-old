import React from 'react';

import styles from './OccurrenceComment.module.scss';

export type OccurrenceCommentProps = {
  author: string;
  text: string;
};

const OccurrenceComment = ({ author, text }: OccurrenceCommentProps) => {
  return (
    <p className={styles.comment}>
      <span className={styles.author}>{author}: </span>
      <span className={styles.text}>{text}</span>
    </p>
  );
};

export default OccurrenceComment;
