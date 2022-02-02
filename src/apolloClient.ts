import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const apolloClient = new ApolloClient({
  // TODO: Should have sth like an environment variable here
  uri: "http://localhost:5858/graphql",
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
});

export default apolloClient;
