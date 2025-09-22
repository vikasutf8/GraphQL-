

import {graphql} from '../../gql'

export const verifyGoogleToken = graphql(
    `#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`
)