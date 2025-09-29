import { GraphQLClient } from "graphql-request";

const token = typeof window !== 'undefined' ? window.localStorage.getItem('__twitterAccessToken') : null;

const graphQLClient = new GraphQLClient('http://localhost:8181/graphql', {
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default graphQLClient;