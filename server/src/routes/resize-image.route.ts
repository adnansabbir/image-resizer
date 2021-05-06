import express from 'express';
import * as awsService from '../aws/aws';
import {SQSMessageBody} from "../aws/models";

const router = express.Router();

router.post('/resize-images', async (req, res, next) => {
    try {
        const filesDataToResize = req.body;
        if (filesDataToResize.length > 5) {
            res.status(400).send('Maximum 5 images can be converted');
            return;
        }
        const fileDataWithUrls: SQSMessageBody[] = [];
        for (let fd of filesDataToResize) {
            const preSignedUrl = await awsService.getSignedUrl(fd.fileName);
            fileDataWithUrls.push({
                fileUrl: preSignedUrl,
                fileSize: fd.fileSize,
                fileName: fd.fileName,
                fileId: fd.fileId,
            })
        }
        await awsService.sendResizeTaskToQueue(fileDataWithUrls);
        res.status(200).send(fileDataWithUrls);
    } catch (err) {
        res.status(400).send('An error occurred');
    }
})

export {router as ResizeImageRoute};
