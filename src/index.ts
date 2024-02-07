import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const server = new ApolloServer({ typeDefs, resolvers });

if (process.env.MONGO_CONNECTION_STRING) {
    console.log("Connecting with database");
    mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
        server.listen().then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    }).catch(error => {
        console.error(error);
    })
} else {
    console.error("MONGO_CONNECTION_STRING variable not set!")
}
