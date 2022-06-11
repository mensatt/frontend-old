import { gql } from '@apollo/client';

export const SET_REVIEW_STATUS = gql`
  mutation setReviewStatus($id: UUID!, $status: ReviewStatus!) {
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
