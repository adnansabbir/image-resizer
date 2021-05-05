import express, {Request, Response, NextFunction} from 'express';
import {body} from 'express-validator'
import {validateRequest} from "../middlewares/validate-request";
import * as awsService from '../aws/s3-bucket';

const router = express.Router();

router.post(
    '/getuploadurl',
    [
        body()
            .isArray({min: 1, max: 5})
            .withMessage('Please provide array of objects, min 1, max 5'),
        body('*.fileId', 'Provide a file id')
            .exists(),
        body('*.fileExtension', 'Provide a file id')
            .exists()
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const fileData = req.body;
        const urls = await awsService.getSignedUrls(fileData.map((fd: any) => `${fd.fileId}.${fd.fileExtension}`));
        res.status(200).send(urls);
    })

export {router as PrepareUploadUrl};