import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview(
    $occId: UUID!
    $author: String!
    $stars: Int!
    $comment: String
  ) {
    createReview(
      input: {
        occurrence: $occId
        displayName: $author
        stars: $stars
        text: $comment
      }
    ) {
      id
    }
  }
`;
