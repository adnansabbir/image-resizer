import express, {NextFunction, Request, Response} from "express";
import {publishToQueue} from "../message-broker/message-broker";

const router = express.Router();

router.post(
    '/api/broadcastmessage',
    async (req: Request, res: Response, next: NextFunction) => {
        const {queueName, message} = req.body;
        try {
            await publishToQueue(queueName, message);
            res.status(200).send('Message broadcast successful');
        }catch (err){
            res.status(400).send('Error broadcasting message');
        }

    })

export {router as BroadcastMessage};
