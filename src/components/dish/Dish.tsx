import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import styles from './Dish.module.scss';
import DishComment from './comment';
import { Props as CommentProps } from './comment/DishComment';

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

const dummyComments: Array<CommentProps> = [
  { author: 'Lorem', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'ipsum', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'dolor', text: 'Lorem ipsum dolor sit amet!' },
  { author: 'sit', text: 'Lorem ipsum dolor sit amet!' },
];

const Dish = ({ dish }: Props) => {
  const { t } = useTranslation('common');
  dish.reviews.forEach(console.log);
  let comments = dish.reviews.map((elem) => (
    <DishComment key={elem.id} author={elem.displayName} text={elem.text} />
  ));
  if (comments.length < 1) {
    comments = dummyComments.map((elem) => (
      <DishComment
        key={elem.author + elem.text}
        author={elem.author}
        text={elem.text}
      />
    ));
  }
  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Image
          src={'https://picsum.photos/1400/600'}
          alt={t('imageDescription', { name: name, author: 'John Doe' })}
          // width={100}
          // height={600}
          layout={'fill'}
        />
      </div>
      <h2>{dish.name}</h2>
      <h3>{t('commentHeading')}</h3>
      {comments}
      <button className={styles['all-comments']}>{t('showAllComments')}</button>
    </div>
  );
};

export default Dish;
