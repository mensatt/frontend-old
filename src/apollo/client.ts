import { ApolloClient, ApolloLink, HttpLink, concat } from '@apollo/client';

import { cache } from './cache';

const authMiddleware = new ApolloLink((operation, forward) => {
  // TODO: Add Auth
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  operation.setContext(({ headers = {} }) => ({
    // headers: {
    //   ...headers,
    //   authorization: localStorage.getItem('token') || null,
    // },
    uri:
      localStorage.getItem('backendURL') || 'https://api.mensatt.de/v1/graphql',
  }));

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, new HttpLink()),
  cache: cache,
});

export default apolloClient;
