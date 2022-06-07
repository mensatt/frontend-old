import { gql } from '@apollo/client';

export const GET_OCCURRENCES_BY_DATE = gql`
  query getOccurrencesByDate($date: Date!) {
    occurrencesByDate(date: $date) {
      id
      dish {
        id
        nameDe
      }
      sideDishes {
        id
        nameDe
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
