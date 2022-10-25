import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview(
    $occId: UUID!
    $author: String
    $images: [ImageInput!]
    $stars: Int!
    $comment: String
  ) {
    createReview(
      input: {
        occurrence: $occId
        displayName: $author
        images: $images
        stars: $stars
        text: $comment
      }
    ) {
      id
    }
  }
`;
