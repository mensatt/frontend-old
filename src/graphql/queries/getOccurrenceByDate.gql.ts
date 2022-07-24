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
        reviews {
          id
          displayName
          text
          acceptedAt
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
      images {
        id
        imageUrl
        review {
          displayName
          acceptedAt
        }
      }
    }
  }
`;
