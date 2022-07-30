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
        activeLocationId: {
          read() {
            return activeLocationIdVar();
          },
        },
        activeBackendIdx: {
          read() {
            return activeBackendIdxVar();
          },
        },
        backends: {
          read() {
            return backendsVar();
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

export const activeLocationIdVar = makeVar<Navigation['activeLocationId']>('');

export const activeBackendIdxVar = makeVar<Navigation['activeBackendIdx']>(0);
export const backendsVar = makeVar<Navigation['backends']>([
  { name: 'Prod', url: 'https://api.mensatt.de/v1/graphql' },
  { name: 'Dev', url: 'https://dev-api.mensatt.de/v1/graphql' },
  { name: 'Localhost', url: 'http://localhost:4000/v1/graphql' },
]);

export const isLoggedInVar = makeVar<Navigation['isLoggedIn']>(
  typeof window !== 'undefined' && !!localStorage.getItem('token'),
);
