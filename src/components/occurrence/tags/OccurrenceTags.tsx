import React, { useMemo } from 'react';
import { GetOccurrencesByDateQuery, Priority } from 'src/graphql/graphql-types';

import Tooltip from '../../tooltip';

import styles from './OccurrenceTags.module.scss';

const TAG_LIMIT = 3;

type Tag = GetOccurrencesByDateQuery['occurrences'][number]['tags'][number];

type Props = {
  tags: Array<Tag>;
};

const sortTags = (a: Tag, b: Tag) => {
  // If...
  // ... a and b are equal they are considered equal
  if (a.priority === b.priority) return 0;
  // ... a is high then a is greater
  if (a.priority === Priority.High) return 1;
  // ... a is medium then it's only greater if b is low
  if (a.priority === Priority.Medium)
    return b.priority === Priority.Low ? 1 : -1;
  // ... a is low then b is greater
  if (a.priority === Priority.Low) return -1;
  // ... nothing else they are considered equal
  return 0;
};

const OccurrenceTags = ({ tags }: Props) => {
  const tagsClone = useMemo(() => [...tags], [tags]);
  const sortedByPriority = useMemo(
    () =>
      // We have to clone the tags-array as sort and reverse operate in place
      tagsClone
        .filter((tag) => tag.priority !== Priority.Hide)
        .sort(sortTags)
        .reverse(),
    [tagsClone],
  );

  const tagComponents = useMemo(
    () =>
      sortedByPriority.slice(0, TAG_LIMIT).map((tag) => (
        <Tooltip key={tag.key} text={tag.description}>
          <div className={styles.tag} key={tag.key}>
            {tag.shortName ? tag.shortName : tag.name}
          </div>
        </Tooltip>
      )),
    [sortedByPriority],
  );
  return (
    <>
      {tagComponents}
      {sortedByPriority.length > TAG_LIMIT && (
        // TODO: Enable once feature is implemented
        <button className={styles.showMore} disabled>
          +{sortedByPriority.length - TAG_LIMIT}
        </button>
      )}
    </>
  );
};

export default OccurrenceTags;
