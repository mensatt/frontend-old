import { useTranslation } from 'next-i18next';
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Modal from 'src/components/modal';
import {
  AddReviewMutation,
  AddReviewMutationVariables,
  GetOccurrencesByDateQuery,
} from 'src/graphql/graphql-types';
import { ADD_REVIEW } from 'src/graphql/mutations';
import {
  GET_NAVIGATION,
  GET_OCCURRENCES_BY_DATE,
  Navigation,
} from 'src/graphql/queries';

import { useMutation, useQuery } from '@apollo/client';

import OccurrenceRating from '../rating';

import styles from './ReviewModal.module.scss';

type Props = {
  occurrenceName:
    | GetOccurrencesByDateQuery['occurrencesByDate'][number]['dish']['nameDe']
    | GetOccurrencesByDateQuery['occurrencesByDate'][number]['dish']['nameEn'];
  occurrenceID: GetOccurrencesByDateQuery['occurrencesByDate'][number]['id'];
  onSuccessfulSubmit: () => void;
};

const ReviewModal = ({
  occurrenceName,
  occurrenceID,
  onSuccessfulSubmit,
}: Props) => {
  const { t } = useTranslation('common');

  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const [addReview, { loading: mutationLoading, data, error }] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW, {
    // TODO: In the future it might be better to just update the apollo cache
    // if the mutation was successful instead of refetching the data.
    refetchQueries: [
      {
        query: GET_OCCURRENCES_BY_DATE,
        variables: {
          date: (navData && navData.selectedDate) as string,
        },
      },
    ],
  });

  useEffect(() => {
    if (data) onSuccessfulSubmit();
  }, [data, onSuccessfulSubmit]);

  const [formState, setFormState] = useState<AddReviewMutationVariables>({
    author: '',
    stars: 0,
    comment: null,
    occID: occurrenceID,
  });

  const hasMissingFields = useMemo(
    () => formState.author.length === 0 || formState.stars === 0,
    [formState.author.length, formState.stars],
  );

  const [showMissingFieldsError, setShowMissingFieldsError] = useState(false);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!hasMissingFields) {
        addReview({
          variables: formState,
        });
      } else {
        setShowMissingFieldsError(true);
      }
    },
    [addReview, formState, hasMissingFields],
  );

  return (
    <Modal>
      <h1 className={styles.header}>
        {t('reviewModalHeading', { name: occurrenceName })}
      </h1>
      {error && <p>{t('reviewModalSubmitError')}</p>}
      {showMissingFieldsError && <p>{t('reviewModalMissingFieldsError')}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.stars}>
          <OccurrenceRating
            onSetSelectedStars={(stars) => {
              setFormState({ ...formState, stars: stars });
              setShowMissingFieldsError(false);
            }}
          />
        </div>
        <label className={styles.name}>
          {t('reviewModalNameLabel')}
          <input
            type="text"
            value={formState.author}
            onChange={(event) => {
              setFormState({
                ...formState,
                author: event.target.value || '',
              });
              setShowMissingFieldsError(false);
            }}
          />
        </label>
        <label className={styles.comment}>
          {t('reviewModalCommentLabel')}
          <input
            type="text"
            value={formState.comment || ''}
            onChange={(event) => {
              setFormState({
                ...formState,
                comment: event.target.value || '',
              });
              setShowMissingFieldsError(false);
            }}
          />
        </label>
        <button className={styles.button} disabled={mutationLoading}>
          {mutationLoading ? t('loading') : t('rate')}
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
