import React from 'react';
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
  afterSuccessfulSubmit,
}: Props) => {
  return (
    <Modal>
      <Form
        {...{ occurrenceId, occurrenceName }}
        onSuccessfulSubmit={() => afterSuccessfulSubmit()}
      />
    </Modal>
  );
};

export default ReviewModal;
