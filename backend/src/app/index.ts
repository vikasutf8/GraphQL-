import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { User } from "./user";
import cors from "cors";
import { GraphqlContext } from "../interface";
import JwtService from "../services/jwt";
import { Tweet } from "./tweet";

async function startServer() {
  const app = express();
  app.use(cors(
    {
      origin: "http://localhost:3000",
      credentials: true,
    }
  ));
  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
            ${User.types}
            ${Tweet.types}
        type Query {
            ${User.queries}
            ${Tweet.queries}
        }
        
        type Mutation {
           ${Tweet.mutations}
        }
        `,
    resolvers: {
      Query: { 
        ...User.resolvers.queries,
        ...Tweet.resolvers.queries,
      },
      Mutation: {
        ...Tweet.resolvers.mutations
      },
      ...Tweet.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers,
    },
  });

  await graphqlServer.start();
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req ,res}) => {
        let user;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];
          try {
            user = JwtService.decodeToken(token);
          } catch (e) {
            user = undefined; // or log the error
          }
        } else {
          user = undefined;
        }
        return { user };
      },
    })
  );

  return app; 
}

export default startServer;
