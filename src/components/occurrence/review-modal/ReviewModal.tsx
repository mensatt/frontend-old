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
  AddImageMutation,
  AddImageMutationVariables,
  AddReviewMutation,
  AddReviewMutationVariables,
  GetOccurrencesByDateQuery,
} from 'src/graphql/graphql-types';
import { ADD_IMAGE, ADD_REVIEW } from 'src/graphql/mutations';
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

  const [
    addImage,
    { loading: addImageLoading, data: addImageData, error: addImageError },
  ] = useMutation<AddImageMutation, AddImageMutationVariables>(ADD_IMAGE, {
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMissingFieldsError, setShowMissingFieldsError] = useState(false);
  const [showImageTooBigError, setShowImageTooBigError] = useState(false);

  useEffect(() => {
    if (addReviewData) {
      if (selectedFile && !addImageData) return;
      onSuccessfulSubmit();
    }
  }, [addImageData, addReviewData, onSuccessfulSubmit, selectedFile]);

  // Using useEffect here to trigger image upload (if necessary) once review was submitted successfully
  useEffect(() => {
    if (selectedFile && addReviewData) {
      addImage({
        variables: {
          image: selectedFile,
          reviewId: addReviewData.createReview.id,
        },
      });
    }
  }, [addImage, addReviewData, selectedFile]);

  const [formState, setFormState] = useState<AddReviewMutationVariables>({
    author: '',
    stars: 0,
    comment: null,
    occId: occurrenceId,
  });

  const hasMissingFields = useMemo(
    () => formState.author.length === 0 || formState.stars === 0,
    [formState.author.length, formState.stars],
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
        const file = event.target.files[0];
        if (file.size <= MAX_UPLOAD_FILE_SIZE) {
          setSelectedFile(file);
          setShowImageTooBigError(false);
        } else {
          setShowImageTooBigError(true);
        }
      }
    },
    [],
  );

  return (
    <Modal>
      <h1 className={styles.header}>
        {t('reviewModalHeading', { name: occurrenceName })}
      </h1>
      {(addReviewError || addImageError) && (
        <p>{t('reviewModalSubmitError')}</p>
      )}
      {showMissingFieldsError && <p>{t('reviewModalMissingFieldsError')}</p>}
      {showImageTooBigError && (
        <p>
          {t('reviewModalImageTooBigError', {
            size: `${MAX_UPLOAD_FILE_SIZE / (1024 * 1024)}MB`,
          })}
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" onChange={onFileInputChange} />
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
        <button
          className={styles.button}
          disabled={addReviewLoading || addImageLoading}
        >
          {addReviewLoading || addImageLoading ? t('loading') : t('rate')}
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
