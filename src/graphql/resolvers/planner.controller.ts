import authChecking from "../../helpers/authChecking"
import Planner from "../../models/planner.model"
import { AuthenticationError } from "apollo-server"

interface CreatePlannerPayload {
    values: {
        title: string
        description: string
    }
}


export default class PlannerController {
    static Query = {
        async getPlannerDetail(_: any, { id }: { id: string }) {
            try {
                let planner = await Planner.findById(id)

                return planner ?? null
            } catch (err) {
                console.log(err)
            }
        },
    }

    static Mutation = {

        async createPlanner(_: any,
            { values: { title, description } }: CreatePlannerPayload,
            context: any)
        {
            const user = authChecking(context) as { id: string, }
            if (!user) {
                throw new AuthenticationError("401")
            } 

            let newPlanner = await Planner.create({
                owner: user.id,
                title: title,
                description: description
            })

            return {
                title: newPlanner.title,
                description: newPlanner.description,
                itinerary: newPlanner.itinerary ?? []
            }
        },

        async updatePlanner(_:any, args: UpdatePlannerPayLoad, context: any)
        {
            const user = authChecking(context) as { id: string, }
            if (!user) {
                throw new AuthenticationError("401")
            } 
            const plannerUpdator = await Planner.findByIdAndUpdate(args.values.id, {
                ...(!!args.values.title && { title: args.values.title }),
                ...(!!args.values.description && { description: args.values.description }),
                ...(!!args.values.itinerary && { itinerary: args.values.itinerary })
            })

            return plannerUpdator ?? null
        }
    }
}