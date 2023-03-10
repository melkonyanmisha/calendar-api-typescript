import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    date: Date;
}

const eventSchema: Schema<IEvent> = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
});

const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema);

export default EventModel;