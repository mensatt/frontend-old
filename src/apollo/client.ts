import { createUploadLink } from 'apollo-upload-client';

import { ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { cache } from './cache';

const authMiddleware = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    uri:
      localStorage.getItem('backendURL') || 'https://api.mensatt.de/v1/graphql',
  };
});

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(createUploadLink()),
  cache: cache,
});

export default apolloClient;
