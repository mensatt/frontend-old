import { gql } from '@apollo/client';

export const GET_OCCURRENCES_BY_DATE = gql`
  query getOccurrencesByDate($date: Date!) {
    occurrencesByDate(date: $date) {
      id
      dish {
        id
        nameDe
        nameEn
        reviewData {
          reviews {
            id
            displayName
            text
            acceptedAt
            createdAt
            images {
              id
              imageUrl
            }
          }
          metadata {
            averageStars
            reviewCount
          }
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
