import express from 'express';
import * as awsService from '../aws/aws';
import {SQSMessageBody} from "../aws/models";

const router = express.Router();

router.post('/resize-images', async (req, res, next) => {
    try {
        const filesDataToResize = req.body;
        const fileDataWithUrls: SQSMessageBody[] = [];
        for (let fd of filesDataToResize) {
            const preSignedUrl = await awsService.getSignedUrl(fd.fileName);
            fileDataWithUrls.push({
                fileUrl: preSignedUrl,
                fileSize: fd.fileSize,
                fileName: fd.fileName
            })
        }
        await awsService.sendResizeTaskToQueue(fileDataWithUrls);
        res.status(200).send('Task started');
    } catch (err) {
        res.status(400).send('An error occurred');
    }
})

export {router as ResizeImageRoute};
