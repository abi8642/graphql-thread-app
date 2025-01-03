import express from 'express';
import {expressMiddleware} from "@apollo/server/express4";
import graphqlServer from "./graphql/index";

async function startServer() {
    const app = express();
    const PORT = 8000;
    const gqlServer = await graphqlServer();

    app.use('/graphql', express.json(), expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
}

startServer().catch(console.error);