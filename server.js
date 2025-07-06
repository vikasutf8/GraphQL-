import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery{
            events:[String!]!
        }

        type RootMutation{
            createEvent(name:String!):String!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ["event1", "event2", "event3"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
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
