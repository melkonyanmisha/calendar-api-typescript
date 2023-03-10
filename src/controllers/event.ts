import {Request, Response} from "express";
import EventModel, {IEvent} from '../models/event.js';
import moment from "moment";

class EventController {

    async createEvent(req: Request, res: Response): Promise<void> {
        try {
            const {title, date} = req.body;
            const newEvent: IEvent = new EventModel({title, date});
            const savedEvent: IEvent = await newEvent.save();

            res.status(201).json(savedEvent);
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }

    async getEvents(req: Request, res: Response): Promise<void> {
        try {
            const {date} = req.params;
            const startOfDay = moment(date).startOf('day');
            const endOfDay = moment(date).endOf('day');

            const event: IEvent[] = await EventModel.find({
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            });

            if (!event) {
                res.status(404).json({message: 'Event not found'});
            }

            res.json(event);

        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }

    async updateEvent(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const {title, date} = req.body;
            const updatedEvent: IEvent | null = await EventModel.findByIdAndUpdate(
                id,
                {title, date},
                {new: true}
            );

            res.json(updatedEvent);
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            await EventModel.findByIdAndDelete(id);
            res.json({message: 'Event deleted'});
        } catch (err: any) {
            res.status(500).json({message: err.message});
        }
    }
}

export default EventController;