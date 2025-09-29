import { useQuery } from "@tanstack/react-query";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import graphQLClient from "@/clients/api";

export const useGetAllTweets = () => {
    const query  = useQuery({
        queryKey: ["all- tweets"],
        queryFn: () => graphQLClient.request(getAllTweetsQuery),
    });
    return {...query,tweets: query.data?.getAllTweets}
};