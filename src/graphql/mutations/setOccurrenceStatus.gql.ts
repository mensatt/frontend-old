import { gql } from '@apollo/client';

export const SET_OCCURRENCE_STATUS = gql`
  mutation setOccurrenceStatus($id: UUID!, $status: OccurrenceStatus!) {
    updateOccurrence(input: { id: $id, status: $status }) {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
