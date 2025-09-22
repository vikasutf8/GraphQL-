import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

const graphQLClient = new GraphQLClient('http://localhost:8181/graphql',{
    headers:{
        Authorization: isClient ? `Bearer ${ window.localStorage.getItem('__twitterAccessToken')}` : ""
    }
});

export default graphQLClient;