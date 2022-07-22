import { gql } from '@apollo/client';

export const SET_OCCURRENCE_REVIEW_STATUS = gql`
  mutation setOccurrenceReviewStatus($id: UUID!, $status: ReviewStatus!) {
    updateOccurrence(input: { id: $id, reviewStatus: $status }) {
      id
      dish {
        nameDe
      }
      reviewStatus
      date
    }
  }
`;
