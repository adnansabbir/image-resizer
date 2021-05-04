import express, {Request, Response, NextFunction} from 'express';
import {body} from 'express-validator'
import {validateRequest} from "../middlewares/validate-request";
import * as awsService from '../aws/s3-bucket';

const router = express.Router();

router.post(
    '/prepareuploadurl',
    [
        body()
            .isArray({min: 1, max: 5})
            .withMessage('Please provide array of objects, min 1, max 5'),
        body('*.fileName', 'Provide a file name')
            .exists(),
        body('*.extension', 'png, jpg or jpeg supported only')
            .matches('^(png|jpg|jpeg)$')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const fileData = req.body;
        const urls = await awsService.getSignedUrls(fileData.map((fd: any) => fd.fileName));
        res.status(200).send(urls);
    })

export {router as PrepareUploadUrl};
