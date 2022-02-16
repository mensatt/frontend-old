import { gql } from '@apollo/client';

export const getDishInfo = gql`
  query GetDishInfo($id: UUID!) {
    dish(id: $id) {
      id
      name
      allergies {
        abbreviation
      }
    }
  }
`;
