import { gql } from '@apollo/client';

export const getOccurrenceForAdminPanel = gql`
  query getOccurrenceForAdminPanel($date: Time!) {
    getOccurrencesByDate(date: $date) {
      id
      dish {
        id
        name
      }
      date
      reviewStatus
    }
  }
`;
