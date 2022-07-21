import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview(
    $occID: UUID!
    $author: String!
    $stars: Int!
    $comment: String
  ) {
    createReview(
      input: {
        occurrence: $occID
        displayName: $author
        stars: $stars
        text: $comment
      }
    ) {
      id
    }
  }
`;
