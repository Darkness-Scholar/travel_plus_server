"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const plannerSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    itinerary: [{
            time: Date,
            status: Number,
            title: String
        }],
    tags: [{ type: String }],
    owner: { type: mongodb_1.ObjectId, ref: "User", required: true }
});
const Planner = (0, mongoose_1.model)('Planner', plannerSchema);
exports.default = Planner;
