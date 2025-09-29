import { PrismaClient, Tweet } from "../../../generated/prisma";
import { GraphqlContext } from "../../interface";
import prisma from "../../clients/db";
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

export const resolvers = {
    mutations,
    extraResolvers,
}; 