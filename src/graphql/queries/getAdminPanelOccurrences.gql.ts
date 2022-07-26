import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_OCCURRENCES = gql`
  query getAdminPanelOccurrences($date: Date!) {
    occurrences(filter: { startDate: $date }) {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
