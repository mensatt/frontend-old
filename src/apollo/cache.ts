import { Navigation } from 'src/graphql/queries';

import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  addTypename: false,
  resultCaching: false,
  typePolicies: {
    Query: {
      fields: {
        selectedWeekday: {
          read() {
            return selectedWeekdayVar();
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
      },
    },
  },
});

export const selectedWeekdayVar = makeVar<Navigation['selectedWeekday']>(-1);

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
