import { graphqlHTTP } from 'express-graphql'; 
-  Using graphqlHTTP middleware used where express expects a middleware function to be passed in. and pass request to query parser and resolvers


app.use('/graphql', graphqlHTTP({
    schema:null,
    rootValue:{
        
    }
}))

- schema : is passing schema object to graphqlHTTP middleware
- rootValue : passing resolver endPoint 

import { buildSchema} from 'graphql';
- buildSchema : takes a string and takes the schema string and returns a schema object