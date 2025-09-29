import { graphql } from "@/gql";
import { gql } from "graphql-request";


export const getAllTweetsQuery = graphql(`
    #graphql
    query GetAllTweetsQuery { 
      getAllTweets {
        id
        content
        tweetImageUrl
        auther {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  `)