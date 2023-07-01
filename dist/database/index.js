"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const url = `${process.env.DATABASE}`;
const connectDatabase = async () => {
    const client = await mongodb_1.MongoClient.connect(url);
    const db = client.db('main');
    return {
        listings: db.collection('test_listings'),
    };
};
exports.connectDatabase = connectDatabase;
