import { PrismaClient, Tweet } from "../../../generated/prisma";
import { GraphqlContext } from "../../interface";
import prisma from "../../clients/db";
import redis from "../../clients/redis";
interface CreateTweetData {
    content: string;
    tweetImageUrl?: string;
}
const mutations = {
    createTweet: async (parent:any ,{payload}:{payload:CreateTweetData}, context:GraphqlContext) => {
        if(!context.user){
            throw new Error("Login to tweet");
        }
        const {content, tweetImageUrl} = payload;
        const tweet =await prisma.tweet.create({
            data: {
                content,
                tweetImageUrl,
                auther: {
                    connect: {
                        id: context.user.id,
                    },
                },
            },
        });
        await redis.del(`ALL_TWEETS`);
        return tweet;
    },
}; 

const extraResolvers={
    Tweet:{
        auther: (parent:Tweet) => {
            return prisma.user.findUnique({
                where: {
                    id: parent.autherId,
                },
            });
        },
    },
}

const queries={
    getAllTweets: async (parent:any, args:any, context:GraphqlContext) => {
        const cachedTweets = await redis.get(`ALL_TWEETS`);
        if(cachedTweets){
            return JSON.parse(cachedTweets);
        }
        const tweets = await prisma.tweet.findMany({
           orderBy: {
            createdAt: "desc",
           },
        });
        await redis.set(`ALL_TWEETS`, JSON.stringify(tweets));
        return tweets;
    },
}

export const resolvers = {
    mutations,
    extraResolvers,
    queries,
}; 