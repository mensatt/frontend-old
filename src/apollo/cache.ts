import { Navigation } from 'src/graphql/queries';
import { API_URLS } from 'src/lib/config';

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
  { name: 'Prod', url: API_URLS.PROD },
  { name: 'Dev', url: API_URLS.DEV },
  { name: 'Localhost', url: API_URLS.LOCAL },
]);

export const isLoggedInVar = makeVar<Navigation['isLoggedIn']>(
  typeof window !== 'undefined' && !!localStorage.getItem('token'),
);
