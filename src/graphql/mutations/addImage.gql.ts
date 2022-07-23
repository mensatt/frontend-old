import { gql } from '@apollo/client';

export const ADD_IMAGE = gql`
  mutation addImage($reviewId: UUID!, $image: Upload!) {
    createImage(input: { review: $reviewId, image: $image }) {
      id
      imageUrl
    }
  }
`;
