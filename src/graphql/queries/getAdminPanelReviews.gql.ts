import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_REVIEWS = gql`
  query getAdminPanelReviews {
    reviews {
      id
      displayName
      occurrence {
        dish {
          nameDe
          nameEn
        }
      }
      text
      acceptedAt
      stars
      images {
        id
        imageUrl
      }
    }
  }
`;
