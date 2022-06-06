import { gql } from '@apollo/client';

export const GET_OCCURRENCES_BY_DATE = gql`
  query getOccurrenceByDate($date: Time!) {
    getOccurrencesByDate(date: $date) {
      id
      dish {
        id
        name
      }
      sideDishes {
        id
        name
      }
      date
      priceStudent
      priceStaff
      priceGuest
      tags {
        shortName
        priority
      }
    }
  }
`;
