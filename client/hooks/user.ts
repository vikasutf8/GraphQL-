import graphQLClient from "@/clients/api";
import { getCurrentUser } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
     const query = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => graphQLClient.request(getCurrentUser)
    });


    return {...query,user: query.data?.getCurrentUser}
}
