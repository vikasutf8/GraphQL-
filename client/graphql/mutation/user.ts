import { graphql } from "@/gql";

export const followUserMutation = graphql(`
    mutation FollowUser($to: ID!) {
  followUser(to: $to)
    }
`);

export const unfollowUserMutation = graphql(`
    mutation UnfollowUser($to: ID!) {
  unfollowUser(to: $to)
}
`);
  