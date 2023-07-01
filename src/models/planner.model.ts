import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

interface IPlanner {
  title: string
  description: string
  itinerary: Array<{
    time: Date,
    status: 0 | 1
    title: string
  }>
  tags: String[]
  owner: any
}

const plannerSchema = new Schema<IPlanner>({
  title: { type: String, required: true },
  description: String,
  itinerary: [{
    time: Date,
    status: Number,
    title: String
  }],
  tags: [{type: String}],
  owner: { type: ObjectId, ref: "User", required: true }
});

const Planner = model<IPlanner>('Planner', plannerSchema);

export default Planner