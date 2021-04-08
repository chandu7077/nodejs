import { ApolloServer, PubSub } from 'apollo-server';
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import{ PrismaClient } from "@prisma/client";
import {getUserId} from "./utils.js";
import Link from "./models/link.js"
import User from "./models/user.js"
import Vote from "./models/vote.js"
import sequelize from './dbconnection.js';
const prisma = new PrismaClient()
const pubsub = new PubSub()

User.hasMany(Link);
User.hasMany(Vote);
Link.belongsTo(User);
Link.hasMany(Vote);
Vote.belongsTo(Link);
Vote.belongsTo(User);

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

sequelize
.sync()
// .sync({force:true})
//  .sync({alter:true})
.then(result => {
    server
    .listen(3000)
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );
})
