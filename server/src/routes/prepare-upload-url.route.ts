import express, {Request, Response, NextFunction} from 'express';
import {body} from 'express-validator'
import {validateRequest} from "../middlewares/validate-request";
import * as awsService from '../aws/aws';
import {GetFileDateFromDB} from "../temporary-db/file-data";

const router = express.Router();

router.post(
    '/api/getuploadurl',
    [
        body()
            .isArray({min: 1, max: 5})
            .withMessage('Please provide array of objects, min 1, max 5'),
        body('*.fileId', 'Provide a file id')
            .exists(),
        body('*.fileName', 'Provide a file id')
            .exists(),
        body('*.type', 'Provide a file type')
            .exists()
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const fileData = req.body;
        const payload = fileData.map((file: any) => ({
            type: file.type,
            fileName: `${file.fileId}.${file.fileName}`,
            fileId: file.fileId
        }))
        const urls = await awsService.getPreSignedUrlsForUpload(payload);
        res.status(200).send(urls);
    })

router.post(
    '/api/getFilesProgress',
    async (req: Request, res: Response, next: NextFunction) => {
        const fileIds = req.body;
        const fileData = GetFileDateFromDB(fileIds);
        console.log(fileData);
        res.status(200).send(fileData);
    })

export {router as PrepareUploadUrl};
