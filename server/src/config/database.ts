import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient({
    log:["query","error"],
    errorFormat: "pretty",
});

export default prisma;
