import { ApolloServer, PubSub } from 'apollo-server';
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import{ PrismaClient } from "@prisma/client";
import {getUserId} from "./utils.js";

const prisma = new PrismaClient()
const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
})

server
  .listen(3000)
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );