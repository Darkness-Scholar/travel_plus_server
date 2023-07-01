import { gql } from "apollo-server-express"
import { userSchema } from "./user.schema";

const Schema = gql`

    ${userSchema}

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
export default Schema; 