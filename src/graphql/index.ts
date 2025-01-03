import { ApolloServer } from '@apollo/server';
import {prismaClient} from "../lib/db";
import { User } from "./user/index";

async function graphqlServer () {
    const typeDefs = `#graphql
        type Query {
            ${User.queries}
        }
    
        type Mutation {
            ${User.mutations}
        }
    `;

    const resolvers = {
        Query: {
            ...User.userResolvers.queries,
        },
        Mutation: {
            ...User.userResolvers.mutations,
        }
    };

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await gqlServer.start();

    return gqlServer;
}

export default graphqlServer;