

import {graphql} from '../../gql'

export const verifyGoogleToken = graphql(
    `#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`
)

export const getCurrentUser = graphql(
    `#graphql
    query GetCurrentUser {
        getCurrentUser{
            id
            firstName
            lastName
            email
            profileImageUrl
        }
    }
`
)