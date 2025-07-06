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
import schema from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// const events = [];


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
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
