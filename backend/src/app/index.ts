import express from 'express';
import { ApolloServer } from '@apollo/server';

import bodyParser from 'body-parser';
import { expressMiddleware } from '@as-integrations/express5';


async function startServer() {
    const app = express();
    app.use(bodyParser.json());

    

    const graphqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
        }
        `,
        resolvers: {
            Query: {
                hello: () => "Hello World"
            }
        
        }
    });


    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer));

    return app;
}


export default startServer;
