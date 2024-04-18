import mongoose from 'mongoose';

export interface Event {
    name: string,
    date: Date,
}

export const EventSchema = new mongoose.Schema<Event>({
    name: String,
    date: Date,
})

export const EventModel = mongoose.model<Event>('Event', EventSchema)
