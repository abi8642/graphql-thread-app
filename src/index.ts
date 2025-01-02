import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

interface Book {
    id: string;
    title: string;
    author: string;
}

const books: Book[] = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
    },
    {
        id: '2',
        title: '1984',
        author: 'George Orwell'
    }
];

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;

const resolvers = {
    Query: {
        books: () => books,
        book: (_: any, { id }: { id: string }) => books.find(book => book.id === id)
    },
    Mutation: {
        addBook: (_: any, { title, author }: { title: string, author: string }) => {
            const newBook: Book = {
                id: String(books.length + 1),
                title,
                author
            };
            books.push(newBook);
            return newBook;
        }
    }
};

async function startServer() {
    const app = express();

    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    // Start Apollo Server
    await server.start();

    // Apply middleware
    app.use('/graphql', json(), expressMiddleware(server));

    // Start Express server
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
}

startServer().catch(console.error);