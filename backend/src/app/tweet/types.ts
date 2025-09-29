export const types = `
#graphql

    input CreateTweetData{
        content: String!
        tweetImageUrl: String
    }

  type Tweet {
    id: ID!
    content: String!
    tweetImageUrl: String
    auther: User!
  }
`