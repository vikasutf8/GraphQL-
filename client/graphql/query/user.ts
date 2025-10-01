import { graphql } from "../../gql";

export const verifyGoogleToken = graphql(
  `
    #graphql
    query VerifyUserGoogleToken($token: String!) {
      verifyGoogleToken(token: $token)
    }
  `
);

export const getCurrentUser = graphql(
  `
    #graphql
    query GetCurrentUserQuery {
      getCurrentUser {
        id
        firstName
        lastName
        email
        profileImageUrl
        tweets {
          id
          content
          auther {
            id
            firstName
            lastName
            profileImageUrl
          }
        }
      }
    }
  `
);

export const getUserByIdQuery = graphql(
  `
    #graphql

    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        lastName
        firstName
        profileImageUrl
        tweets {
          id
          content
          auther {
            firstName
            email
            lastName
            profileImageUrl
          }
        }
      }
    }
  `
);
