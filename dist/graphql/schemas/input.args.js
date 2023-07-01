"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlannerPayLoad = exports.ItineraryInput = exports.CreatePlannerPayload = exports.SignupProps = void 0;
exports.SignupProps = `input SignupProps {
    username: String
    password: String
    confirmPassword: String
    email: String
}`;
exports.CreatePlannerPayload = `input CreatePlannerPayload {
    title: String
    description: String
}`;
exports.ItineraryInput = `input ItineraryInput {
    time: String
    status: Int
    title: String
}`;
exports.UpdatePlannerPayLoad = `input UpdatePlannerPayLoad {
    id: String!
    title: String
    description: String
    itinerary: [ItineraryInput]
}`;
