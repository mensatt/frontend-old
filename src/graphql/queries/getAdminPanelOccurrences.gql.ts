import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_OCCURRENCES = gql`
  query getAdminPanelOccurrences($date: Date!) {
    occurrencesAfterInclusiveDate(start: $date) {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
