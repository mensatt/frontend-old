import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
    }
  }
`;
