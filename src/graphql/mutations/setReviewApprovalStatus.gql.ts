import { gql } from '@apollo/client';

export const SET_REVIEW_APPROVAL_STATUS = gql`
  mutation setReviewApprovalStatus($id: UUID!, $approved: Boolean) {
    updateReview(input: { id: $id, approved: $approved }) {
      id
    }
  }
`;
