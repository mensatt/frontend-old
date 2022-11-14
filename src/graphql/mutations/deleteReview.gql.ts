import { gql } from '@apollo/client';

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: UUID!) {
    deleteReview(input: { id: $id }) {
      id
    }
  }
`;
