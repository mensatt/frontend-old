import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_OCCURRENCES = gql`
  query getAdminPanelOccurrences {
    occurrences {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
