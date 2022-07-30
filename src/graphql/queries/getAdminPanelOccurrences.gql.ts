import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_OCCURRENCES = gql`
  query getAdminPanelOccurrences(
    $status: OccurrenceStatus
    $locationId: UUID!
  ) {
    occurrences(filter: { status: $status, location: $locationId }) {
      id
      dish {
        nameDe
      }
      status
      date
    }
  }
`;
