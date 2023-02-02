import { createUploadLink } from 'apollo-upload-client';
import { API_URLS } from 'src/lib/config';
import { isDev } from 'src/util';

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
    uri: isDev
      ? localStorage.getItem('backendURL') || API_URLS.PROD
      : API_URLS.PROD,
  };
});

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(createUploadLink()),
  cache: cache,
});

export default apolloClient;
