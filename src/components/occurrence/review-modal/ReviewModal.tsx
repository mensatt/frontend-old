import { useTranslation } from 'next-i18next';
import React, {
  ChangeEvent,
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

// Maximum allowed upload filesize (in Byte)
const MAX_UPLOAD_FILE_SIZE = 20 * 1024 * 1024;

type Props = {
  occurrenceName:
    | GetOccurrencesByDateQuery['occurrencesByDate'][number]['dish']['nameDe']
    | GetOccurrencesByDateQuery['occurrencesByDate'][number]['dish']['nameEn'];
  occurrenceId: GetOccurrencesByDateQuery['occurrencesByDate'][number]['id'];
  onSuccessfulSubmit: () => void;
};

const ReviewModal = ({
  occurrenceName,
  occurrenceId,
  onSuccessfulSubmit,
}: Props) => {
  const { t } = useTranslation('common');

  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const [
    addReview,
    { loading: addReviewLoading, data: addReviewData, error: addReviewError },
  ] = useMutation<AddReviewMutation, AddReviewMutationVariables>(ADD_REVIEW, {
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

  const [showMissingFieldsError, setShowMissingFieldsError] = useState(false);
  const [showImageTooBigError, setShowImageTooBigError] = useState(false);

  useEffect(() => {
    if (addReviewData) {
      onSuccessfulSubmit();
    }
  }, [addReviewData, onSuccessfulSubmit]);

  const [formState, setFormState] = useState<AddReviewMutationVariables>({
    author: '',
    stars: 0,
    comment: null,
    images: null,
    occId: occurrenceId,
  });

  const hasMissingFields = useMemo(
    () => formState.stars === 0,
    [formState.stars],
  );

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

  const onFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        // `FileList` is not an array so we have to "convert" it
        const fileList = Array.from(event.target.files);

        if (!fileList.some((file) => file.size > MAX_UPLOAD_FILE_SIZE)) {
          setFormState({
            ...formState,
            images: fileList.map((file) => ({ image: file })),
          });
          setShowImageTooBigError(false);
        } else {
          setShowImageTooBigError(true);
        }
      }
    },
    [formState],
  );

  return (
    <Modal>
      <h1 className={styles.header}>
        {t('reviewModalHeading', { name: occurrenceName })}
      </h1>
      {addReviewError && <p>{t('reviewModalSubmitError')}</p>}
      {showMissingFieldsError && <p>{t('reviewModalMissingFieldsError')}</p>}
      {showImageTooBigError && (
        <p>
          {t('reviewModalImageTooBigError', {
            size: `${MAX_UPLOAD_FILE_SIZE / (1024 * 1024)}MB`,
          })}
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" onChange={onFileInputChange} multiple />
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
        <button className={styles.button} disabled={addReviewLoading}>
          {addReviewLoading ? t('loading') : t('rate')}
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
