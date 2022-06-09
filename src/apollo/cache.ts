import { Navigation } from 'src/graphql/queries';

import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  addTypename: false,
  resultCaching: false,
  typePolicies: {
    Query: {
      fields: {
        selectedDate: {
          read() {
            return selectedDateVar();
          },
        },
        activeMensaIdx: {
          read() {
            return activeMensaIdxVar();
          },
        },
        mensas: {
          read() {
            return mensasVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const selectedDateVar = makeVar<Navigation['selectedDate']>('');

export const mensasVar = makeVar<Navigation['mensas']>([
  {
    name: 'Südmensa',
    url: 'https://api.mensatt.de/v1/graphql',
  },
  {
    name: 'Devmensa',
    url: 'https://dev-api.mensatt.de/v1/graphql',
  },
]);

export const activeMensaIdxVar = makeVar<Navigation['activeMensaIdx']>(0);

export const isLoggedInVar = makeVar<Navigation['isLoggedIn']>(
  typeof window !== 'undefined' && !!localStorage.getItem('token'),
);
