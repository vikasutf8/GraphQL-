import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

const graphQLClient = new GraphQLClient('http://localhost:8181/graphql',{
    headers:{
        Authorization: isClient ? `Bearer ${ window.localStorage.getItem('__twitterAccessToken')}` : ""
    }
});
// console.log(`${isClient} ${window.localStorage.getItem('__twitterAccessToken')}`, "graphQLClient")
// console.log(graphQLClient, "graphQLClient")
export default graphQLClient;