import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import Event from "./models/event.model.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

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

        type User{
            _id:ID!
            email:String!
            password:String
            
        }
        
        input EventInput{
            name:String!
            description:String!
            price:Float!
            date:String!
        }

        input UserInput{
            email:String!
            password:String
        }

        type RootQuery{
            events:[Event!]!
        }

        type RootMutation{
            createEvent(eventInput:EventInput):Event
            createUser(userInput:UserInput):User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        // return events;
        return Event.find()
          .then((res) => {
            return res.map((event) => {
              // return {...event._doc, _id : event._doc._id.toString()};
              return { ...event._doc, _id: event.id };
            });
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      },
      createEvent: (args) => {
        const event = new Event({
          name: args.eventInput.name,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          //   creator: args.eventInput.creator,
          creator: "686a22a094572b0d0b1d29f5",
        });
        let createdEvent;
        return event
          .save()
          .then((res) => {
            createdEvent = { ...res._doc, _id: res._doc._id.toString() };
            return User.findById("686a22a094572b0d0b1d29f5");
          })
            .then((user) => {
                if (!user) {
                throw new Error("User not found");
                }
                user.createdEvents.push(event);
                return user.save();
            })
          .then((res) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User already exists");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then((hashPass) => {
            const user = new User({
              email: args.userInput.email,
              password: hashPass,
            });
            return user
              .save()
              .then((res) => {
                console.log(res);
                return {
                  ...res._doc,
                  password: null,
                  _id: res._doc._id.toString(),
                };
              })
              .catch((err) => {
                console.log(err);
                throw new Error(err);
              });
          })
          .catch((err) => {
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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");

    console.log(err);
  });
