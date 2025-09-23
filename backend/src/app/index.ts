import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import { expressMiddleware } from "@as-integrations/express5";
import { User } from "./user";
import cors from "cors";
import { GraphqlContext } from "../interface";
import JwtService from "../services/jwt";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `${User.types}
        type Query {
            ${User.queries}
        }`,
    resolvers: {
      Query: {
        ...User.resolvers.Query,
      },
    },
  });

  await graphqlServer.start();
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => {
        return {
          user: req.headers.authorization
            ? JwtService.decodeToken(req.headers.authorization.split(" ")[1])
            : undefined,
        };
      },
    })
  );

  return app; 
}

export default startServer;
