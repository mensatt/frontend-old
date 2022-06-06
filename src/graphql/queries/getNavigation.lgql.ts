import { gql } from '@apollo/client';

// As of writing each mensa had its own backend-URL. This was done so you can switch to the dev-backend on the fly.
// TODO: In the future this should not be done this way, but rather by using a query parameter (where necessary)
export type Mensa = {
  name: string;
  url: string;
};

export type Navigation = {
  selectedWeekday: number;
  activeMensaIdx: number;
  mensas: Mensa[];
};

export const GET_NAVIGATION = gql`
  query GetNavigation {
    selectedWeekday @client
    activeMensaIdx @client
    mensas @client
  }
`;
