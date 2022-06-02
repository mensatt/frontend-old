import { gql } from '@apollo/client';

export const setReviewStatus = gql`
  mutation setReviewStatus(
    $occurrenceUUID: UUID!
    $dishUUID: UUID!
    $editDate: Time!
    $status: ReviewStatus!
  ) {
    updateOccurrence(
      input: {
        id: $occurrenceUUID
        date: $editDate
        reviewStatus: $status
        dish: $dishUUID
      }
    ) {
      reviewStatus
    }
  }
`;
