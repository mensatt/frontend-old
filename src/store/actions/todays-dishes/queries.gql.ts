import { gql } from '@apollo/client';

export const getOccurrenceByDate = gql`
  query getOccurrenceByDate($date: Time!) {
    getOccurrencesByDate(date: $date) {
      id
      dish {
        id
        name
        reviews {
          id
          displayName
          text
          createdAt
        }
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
