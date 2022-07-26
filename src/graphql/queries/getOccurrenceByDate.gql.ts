import { gql } from '@apollo/client';

export const GET_OCCURRENCES_BY_DATE = gql`
  query getOccurrencesByDate($date: Date!) {
    occurrences(filter: { startDate: $date, endDate: $date }) {
      id
      dish {
        id
        nameDe
        nameEn
        reviewData(filter: { approved: true }) {
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
