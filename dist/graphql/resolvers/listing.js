"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.listingResolvers = {
    Query: {
        listings: async (_root, _args, { db }) => {
            return await db.listings.find({}).toArray();
        },
    },
    Mutation: {
        deleteListing: async (_root, { id }, { db }) => {
            const deleteRes = await db.listings.findOneAndDelete({
                _id: new mongodb_1.ObjectId(id),
            });
            if (!deleteRes.value) {
                throw new Error('failed to delete listing!!!');
            }
            return deleteRes.value;
        },
    },
    Listing: {
        id: (listing) => listing._id.toString(),
    },
};
