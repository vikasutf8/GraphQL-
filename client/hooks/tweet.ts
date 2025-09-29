import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import graphQLClient from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
    const query  = useQuery({
        queryKey: ["all-tweets"],
        queryFn: () => graphQLClient.request(getAllTweetsQuery),
    });
    return {...query,tweets: query.data?.getAllTweets}
};



export const useCreateTweet = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphQLClient.request(createTweetMutation, { payload }),
        onMutate: (payload) => {
            toast.loading("Creating tweet...",{id: 
                '1'
            });
        },
        onSuccess: async(payload) => {
            await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });//refetch
            toast.success("Tweet created successfully",{id: 
                '1'
            });
        },
    });
    return mutation;
};