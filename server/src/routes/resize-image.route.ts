import express from 'express';
import * as awsService from '../aws/s3-bucket';

const router = express.Router();

router.post('/resize-images', async (req, res, next) => {
    const {fileUrl, fileSize} = req.body;
    try {
        await awsService.sendResizeTaskToQueue(fileUrl, fileSize);
        res.status(201).send('Task started');
    } catch (err) {
        res.status(400).send('An error occurred');
    }
})

export {router as ResizeImageRoute};
