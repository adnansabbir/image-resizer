import express, {Request, Response, NextFunction} from 'express';
import {body} from 'express-validator'
import {validateRequest} from "../middlewares/validate-request";

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
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Preparing url');
    })

export {router as PrepareUploadUrl};
