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

import { useMutation } from '@apollo/client';

import OccurrenceRating from '../rating';

import styles from './ReviewModal.module.scss';

// Maximum allowed upload filesize (in Byte)
const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp'];

type Props = {
  occurrenceName:
    | GetOccurrencesByDateQuery['occurrences'][number]['dish']['nameDe']
    | GetOccurrencesByDateQuery['occurrences'][number]['dish']['nameEn'];
  occurrenceId: GetOccurrencesByDateQuery['occurrences'][number]['id'];
  onSuccessfulSubmit: () => void;
};

const ReviewModal = ({
  occurrenceName,
  occurrenceId,
  onSuccessfulSubmit,
}: Props) => {
  const { t } = useTranslation('common');

  // NOTE: Currently there is no need to refetch the occurrences as a review has to be approved first anyways
  const [
    addReview,
    { loading: addReviewLoading, data: addReviewData, error: addReviewError },
  ] = useMutation<AddReviewMutation, AddReviewMutationVariables>(ADD_REVIEW);

  const [showMissingStarValueError, setShowMissingStarValueError] =
    useState(true);
  const [showImageTooBigError, setShowImageTooBigError] = useState(false);
  const [showWrongExtensionError, setShowWrongExtensionError] = useState(false);

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

  const formIsInvalid = useMemo(
    () => showMissingStarValueError || showWrongExtensionError,
    [showMissingStarValueError, showWrongExtensionError],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!formIsInvalid) {
        addReview({
          variables: formState,
        });
      }
    },
    [formIsInvalid, addReview, formState],
  );

  const onFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        // `FileList` is not an array so we have to "convert" it
        const fileList = Array.from(event.target.files);

        // This function is from here: https://stackoverflow.com/a/12900504
        const getFileExt = (file: File) =>
          file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2);

        // Check filesize
        if (fileList.every((file) => file.size <= MAX_UPLOAD_FILE_SIZE)) {
          // Check file extension
          if (
            fileList.every((file) =>
              ALLOWED_EXTENSIONS.includes(getFileExt(file).toLowerCase()),
            )
          ) {
            setFormState({
              ...formState,
              images: fileList.map((file) => ({ image: file })),
            });
            setShowWrongExtensionError(false);
          } else {
            setShowWrongExtensionError(true);
          }
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
      {showMissingStarValueError && (
        <p>{t('reviewModalMissingStarValueError')}</p>
      )}
      {showImageTooBigError && (
        <p>
          {t('reviewModalImageTooBigError', {
            size: `${MAX_UPLOAD_FILE_SIZE / (1024 * 1024)}MB`,
          })}
        </p>
      )}
      {showWrongExtensionError && (
        <p>
          {t('reviewModalWrongExtensionError', {
            extensions: ALLOWED_EXTENSIONS.map(
              (ext) => '.' + ext.toLowerCase(),
            ).join(' '),
          })}
        </p>
      )}
      {formState.images && <p>{t('reviewModalImageDisclaimer')}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" onChange={onFileInputChange} multiple />
        <div className={styles.stars}>
          <OccurrenceRating
            onSetSelectedStars={(stars) => {
              setFormState({ ...formState, stars: stars });
              setShowMissingStarValueError(false);
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
            }}
          />
        </label>
        <button
          className={styles.button}
          disabled={addReviewLoading || formIsInvalid}
        >
          {addReviewLoading ? t('loading') : t('rate')}
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
