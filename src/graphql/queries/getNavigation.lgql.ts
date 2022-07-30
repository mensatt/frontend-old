import { gql } from '@apollo/client';

export type Backend = {
  name: string;
  url: string;
};

export type Navigation = {
  selectedDate: string;
  activeLocationId: string;
  activeBackendIdx: number;
  backends: Backend[];
  isLoggedIn: boolean;
};

export const GET_NAVIGATION = gql`
  query GetNavigation {
    selectedDate @client
    activeLocationId @client
    activeBackendIdx @client
    backends @client
    isLoggedIn @client
  }
`;
