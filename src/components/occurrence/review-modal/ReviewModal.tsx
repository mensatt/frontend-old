import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import Modal from 'src/components/modal';
import { GetOccurrencesByDateQuery } from 'src/graphql/graphql-types';

import Form from './form';

type Props = {
  occurrenceName:
    | GetOccurrencesByDateQuery['occurrences'][number]['dish']['nameDe']
    | GetOccurrencesByDateQuery['occurrences'][number]['dish']['nameEn'];
  occurrenceId: GetOccurrencesByDateQuery['occurrences'][number]['id'];
  afterSuccessfulSubmit: () => void;
};

const ReviewModal = ({
  occurrenceName,
  occurrenceId,
  afterSuccessfulSubmit: onSuccessfulSubmit,
}: Props) => {
  const { t } = useTranslation('common');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Modal>
      {submitted ? (
        <>
          <p>{t('reviewModalSubmittedAwaitingApproval')}</p>
          <button onClick={onSuccessfulSubmit}>Okay</button>
        </>
      ) : (
        <Form
          {...{ occurrenceId, occurrenceName }}
          onSuccessfulSubmit={() => setSubmitted(true)}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
