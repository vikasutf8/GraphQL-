import express from "express";
import "dotenv/config";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import apolloServer from "./config/apolloServer.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
const startApolloServer = async () => {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
};
startApolloServer();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
