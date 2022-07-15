import { gql } from '@apollo/client';

export const GET_OCCURRENCES_BY_DATE = gql`
  query getOccurrencesByDate($date: Date!) {
    occurrencesByDate(date: $date) {
      id
      dish {
        id
        nameDe
        nameEn
        reviewMetadata {
          averageStars
          reviewCount
        }
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
        key
        name
        description
        shortName
        priority
        isAllergy
      }
    }
  }
`;
