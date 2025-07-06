import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import e from "express";


const app = express();
app.use(bodyParser.json());
app.use(cors());

const events=[];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event{
            _id:ID!
            name:String!
            description:String!
            price:Float!
            date:String!

        }
        
        input EventInput{
            name:String!
            description:String!
            price:Float!
            date:String!
        }

        type RootQuery{
            events:[Event!]!
        }

        type RootMutation{
            createEvent(eventInput:EventInput!):Event!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event ={
            _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            name: args.eventInput.name,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
        }
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

// app.get('/', (req, res,next) => {
//     res.send('Hello World!');
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
