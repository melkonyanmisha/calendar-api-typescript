import {Router} from "express";

import EventController from "../controllers/event";
const eventController = new EventController();
const router = Router();

router.get('/:date', eventController.getEvents);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;