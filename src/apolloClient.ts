import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  // TODO: Should have sth like an environment variable here
  uri: 'http://localhost:4000/v1/graphql',
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
});

export default apolloClient;
