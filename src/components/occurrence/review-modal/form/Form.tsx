import { useTranslation } from 'next-i18next';
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AddReviewMutation,
  AddReviewMutationVariables,
  GetOccurrencesByDateQuery,
} from 'src/graphql/graphql-types';
import { ADD_REVIEW } from 'src/graphql/mutations';

import { useMutation } from '@apollo/client';

import OccurrenceRating from '../../rating';

import styles from './Form.module.scss';

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

const Form = ({ occurrenceName, occurrenceId, onSuccessfulSubmit }: Props) => {
  const { t } = useTranslation('common');
  // NOTE: Currently there is no need to refetch the occurrences as a review has to be approved first anyways
  const [
    addReview,
    { loading: addReviewLoading, data: addReviewData, error: addReviewError },
  ] = useMutation<AddReviewMutation, AddReviewMutationVariables>(ADD_REVIEW);

  const [fileInputIsDraggedOver, setFileInputIsDraggedOver] = useState(false);
  const [showMissingStarValueError, setShowMissingStarValueError] =
    useState(true);
  const [showImageTooBigError, setShowImageTooBigError] = useState(false);
  const [showWrongExtensionError, setShowWrongExtensionError] = useState(false);

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

  useEffect(() => {
    if (addReviewData) onSuccessfulSubmit();
  }, [addReviewData, onSuccessfulSubmit]);

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

  const errors = useMemo(
    () => (
      <>
        {addReviewError && (
          <p className={styles.error}>{t('reviewModalSubmitError')}</p>
        )}
        {showMissingStarValueError && (
          <p className={styles.error}>
            {t('reviewModalMissingStarValueError')}
          </p>
        )}
        {showImageTooBigError && (
          <p className={styles.error}>
            {t('reviewModalImageTooBigError', {
              size: `${MAX_UPLOAD_FILE_SIZE / (1024 * 1024)}MB`,
            })}
          </p>
        )}
        {showWrongExtensionError && (
          <p className={styles.error}>
            {t('reviewModalWrongExtensionError', {
              extensions: ALLOWED_EXTENSIONS.map(
                (ext) => '.' + ext.toLowerCase(),
              ).join(' '),
            })}
          </p>
        )}
      </>
    ),
    [
      addReviewError,
      showImageTooBigError,
      showMissingStarValueError,
      showWrongExtensionError,
      t,
    ],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{t('reviewModalHeading', { name: occurrenceName })}</h1>
      <label>{t('reviewModalRatingLabel')}</label>
      <div className={styles.stars}>
        <OccurrenceRating
          onSetSelectedStars={(stars) => {
            setFormState({ ...formState, stars: stars });
            setShowMissingStarValueError(false);
          }}
          className={styles.rating}
        />
      </div>
      <label>{t('reviewModalImageLabel')}</label>
      <div
        className={
          styles.fileUpload +
          (fileInputIsDraggedOver ? ' ' + styles.draggedOver : '')
        }
      >
        <input
          type="file"
          onChange={onFileInputChange}
          multiple
          onDragEnter={() => setFileInputIsDraggedOver(true)}
          onDragLeave={() => setFileInputIsDraggedOver(false)}
        />
        {/* TODO put this into lang file */}
        <span>Click or drop an image to upload.</span>
        {/* TODO show a preview of the selected image file here, just add an <img> tag or something i can style if there is a file selected */}
      </div>
      {formState.images && <p>{t('reviewModalImageDisclaimer')}</p>}
      <label htmlFor="reviewModalCommentInput">
        {t('reviewModalCommentLabel')}
      </label>
      <input
        id="reviewModalCommentInput"
        type="text"
        value={formState.comment || ''}
        onChange={(event) => {
          setFormState({
            ...formState,
            comment: event.target.value || '',
          });
        }}
      />
      <label htmlFor="reviewModalNameInput">{t('reviewModalNameLabel')}</label>
      <input
        id="reviewModalNameInput"
        type="text"
        value={formState.author}
        onChange={(event) => {
          setFormState({
            ...formState,
            author: event.target.value || '',
          });
        }}
      />
      <div className={styles.divider} />
      {errors}
      <button
        className={styles.button}
        disabled={addReviewLoading || formIsInvalid}
      >
        {/* TODO can we change the text here to something like "send review"? */}
        {addReviewLoading ? t('loading') : t('rate')}
      </button>
    </form>
  );
};

export default Form;
