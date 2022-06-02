import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
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
  link: authLink.concat(new HttpLink()),
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
});

export default apolloClient;
