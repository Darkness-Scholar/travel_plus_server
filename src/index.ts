import { ApolloServer } from "apollo-server-express"
import Schema from "./graphql/schemas"
import Resolvers from "./graphql/resolvers"
import express from "express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import http = require("http")
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

async function bootstrap(schema: any, resolvers: any) {

  mongoose
    .connect(process.env.DATABASE as string)
    .then(() => {
      console.log(`connected to database`)
    }).catch(() => {
      console.log(`cannot connect to database`)
    })

  const app = express()

  const httpServer = http.createServer(app)

  interface ServerContext {
    auth: String;
  }

  // GraphQL:
  const server = new ApolloServer<ServerContext>({
    context: ({ req }:any) => ({ req }),
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any

  await server.start()

  server.applyMiddleware({ app })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
//in the end, run the server and pass in our Schema and Resolver.
bootstrap(Schema, Resolvers)