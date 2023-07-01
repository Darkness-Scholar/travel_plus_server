import User from "../../models/user.model";
import UserController from "./user.controller";
import PlannerController from "./planner.controller";

const ping = {
    Query: {
        getPing (_:any, args: any): { msg: string, status: number } {

            return {
                msg: "test",
                status: 0
            }
        }
    }
}

const Resolvers = {
    Query: {
        ...ping.Query,
        ...PlannerController.Query
    }, Mutation: {
        ...UserController.Mutation,
        ...PlannerController.Mutation
    }
};
export default Resolvers;