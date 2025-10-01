import axios from "axios";
import prisma from "../../clients/db";
import JwtService from "../../services/jwt";
import { GraphqlContext } from "../../interface";
import { User } from "../../../generated/prisma";

export interface GoogleTokenResult {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  nbf?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOAuthUrl.searchParams.set("id_token", googleToken);
    const response = await axios.get<GoogleTokenResult>(
      googleOAuthUrl.toString(),
      {
        responseType: "json",
      }
    );

    const checkForUser = await prisma.user.findUnique({
      where: {
        email: response.data.email,
      },
    });

    if (!checkForUser) {
      await prisma.user.create({
        data: {
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          email: response.data.email,
          profileImageUrl: response.data.picture,
        },
      });
    }
    const userInDb = await prisma.user.findUnique({
      where: {
        email: response.data.email,
      },
    });

    const userToken = await JwtService.generateTokenForUser(userInDb!);
    return userToken;
  },

    getCurrentUser: async (parent: any, args: any, context: GraphqlContext) => {
        
        const id = context.user?.id;
        console.log(id)
        if (!id) return null;
        // return context.user;
        const user = await prisma.user.findUnique({
        where: {
            id,
        },
        });
        return user;
    },

    getUserById: async (parent: any, { id }: { id: string }, context: GraphqlContext) => {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    },
};

const extraResolvers={
    User:{
        tweets: (parent:User) => {
            return prisma.tweet.findMany({
                where: {
                    autherId: parent.id,
                },
            });
        },
    },
}



export const resolvers = {
  queries,
  extraResolvers,
};
