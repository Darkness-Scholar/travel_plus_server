"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_schema_1 = require("../user.schema");
const Schema = (0, apollo_server_express_1.gql) `

    ${user_schema_1.userSchema}

    input SignupProps {
        username: String
        password: String
        confirmPassword: String
        email: String
    }

    type Ping {
        msg: String
        status: Int
    }

    type Itinerary {
        time: String
        status: Int
        title: String
    }

    type Planner {
        title: String
        description: String
        itinerary: [Itinerary]
    }

    input CreatePlannerPayload {
        title: String
        description: String
    }

    input ItineraryInput {
        time: String
        status: Int
        title: String
    }

    input UpdatePlannerPayLoad {
        id: String!
        title: String
        description: String
        itinerary: [ItineraryInput]
    }
    
    type Query {
        getPing: Ping
        getPlannerDetail(id: ID): Planner
    }

    type Mutation {
        signup(values: SignupProps): User
        signin(email: String, password: String): User
        createPlanner(values: CreatePlannerPayload): Planner
        updatePlanner(values: UpdatePlannerPayLoad): Planner
    }
`;
exports.default = Schema;
