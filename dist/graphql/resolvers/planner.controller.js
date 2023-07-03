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
const authChecking_1 = __importDefault(require("../../helpers/authChecking"));
const planner_model_1 = __importDefault(require("../../models/planner.model"));
const apollo_server_1 = require("apollo-server");
class PlannerController {
}
PlannerController.Query = {
    getPlannerDetail(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let planner = yield planner_model_1.default.findById(id);
                console.log(`{Planner founded}`);
                return planner !== null && planner !== void 0 ? planner : null;
            }
            catch (err) {
                console.log(err);
            }
        });
    },
};
PlannerController.Mutation = {
    createPlanner(_, { values: { title, description } }, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Mutation: Create Planner`);
            const user = (0, authChecking_1.default)(context);
            if (!user) {
                throw new apollo_server_1.AuthenticationError("401");
            }
            let newPlanner = yield planner_model_1.default.create({
                owner: user.id,
                title: title,
                description: description
            });
            return {
                title: newPlanner.title,
                description: newPlanner.description,
                itinerary: (_a = newPlanner.itinerary) !== null && _a !== void 0 ? _a : []
            };
        });
    },
    updatePlanner(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (0, authChecking_1.default)(context);
            if (!user) {
                throw new apollo_server_1.AuthenticationError("401");
            }
            const plannerUpdator = yield planner_model_1.default.findByIdAndUpdate(args.values.id, Object.assign(Object.assign(Object.assign({}, (!!args.values.title && { title: args.values.title })), (!!args.values.description && { description: args.values.description })), (!!args.values.itinerary && { itinerary: args.values.itinerary })));
            return plannerUpdator !== null && plannerUpdator !== void 0 ? plannerUpdator : null;
        });
    }
};
exports.default = PlannerController;
