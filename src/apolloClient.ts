import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  // TODO: Should have sth like an environment variable here
  uri: 'https://api.mensatt.de/v1/graphql',
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
});

export default apolloClient;
