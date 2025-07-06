import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import Event from "./models/event.model.js";

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
        // return events;
       return Event.find().then(res=>{
                return res.map(event =>{
                    // return {...event._doc, _id : event._doc._id.toString()};
                    return {...event._doc, _id :event.id};
                })
            }
        ).catch(err=>{
            console.log(err);
            throw new Error(err);
        })
      },
      createEvent: args => {
        // const event ={
        //     _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        //     name: args.eventInput.name,
        //     description: args.eventInput.description,
        //     price: +args.eventInput.price,
        //     date: args.eventInput.date,
        // }
        const event =new Event({
            name: args.eventInput.name,
            description: args.eventInput.description,
            price: +args.eventInput.price,            
            date:new Date(args.eventInput.date),
        })
        // events.push(event);
        return event.save().then(res =>{
            console.log(res);
            return {...res._doc, _id : res._doc._id.toString()};
            // return {...res._doc, _id : res.id};
        }).catch(err =>{
            console.log(err);
            throw new Error(err);
        });
       
      },
    },
    graphiql: true,
  })
);

// app.get('/', (req, res,next) => {
//     res.send('Hello World!');
// });

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
}).catch((err) => {
console.log("Error connecting to MongoDB");

  console.log(err);
});

