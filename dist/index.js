"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schemas_1 = __importDefault(require("./graphql/schemas"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const express_1 = __importDefault(require("express"));
const apollo_server_core_1 = require("apollo-server-core");
const http = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function bootstrap(schema, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default
            .connect(process.env.DATABASE)
            .then(() => {
            console.log(`connected to database`);
        }).catch(() => {
            console.log(`cannot connect to database`);
        });
        const app = (0, express_1.default)();
        const httpServer = http.createServer(app);
        // GraphQL:
        const server = new apollo_server_express_1.ApolloServer({
            context: ({ req }) => ({ req }),
            typeDefs: schema,
            resolvers,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        server.applyMiddleware({ app });
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
//in the end, run the server and pass in our Schema and Resolver.
bootstrap(schemas_1.default, resolvers_1.default);
