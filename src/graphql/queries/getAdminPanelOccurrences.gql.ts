import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_OCCURRENCES = gql`
  query getAdminPanelOccurrences($status: OccurrenceStatus) {
    occurrences(filter: { status: $status }) {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
