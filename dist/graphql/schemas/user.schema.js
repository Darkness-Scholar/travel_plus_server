"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
exports.userSchema = `
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
    }
`;
