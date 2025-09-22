import express from 'express';
import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@as-integrations/express5';
import { User } from './user';
import cors from 'cors';

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    

    const graphqlServer = new ApolloServer({
        typeDefs: `${User.types}
        type Query {
            ${User.queries}
        }`,
        resolvers: {
            Query: {
                ...User.resolvers.Query
            }
        }
    });


    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer));

    return app;
}


export default startServer;
