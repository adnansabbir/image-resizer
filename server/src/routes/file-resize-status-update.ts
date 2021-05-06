import express from 'express';
import {UpdateFileStatus, UpdateFileUrl} from "../temporary-db/file-data";

const router = express.Router();

router.post('/api/file-resize-status-update', async (req, res, next) => {
    try {
        const {fileData: {fileId}, status, awsResponse: {Location, Key}} = req.body;
        UpdateFileStatus(fileId, status);
        if (status === 'Success') {
            UpdateFileUrl(fileId, Location);
        }
        res.status(200).send('');
    } catch (err) {
        res.status(400).send('An error occurred');
    }
})

export {router as FileResizeStatusUpdate};
